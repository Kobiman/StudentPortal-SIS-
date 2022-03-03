import { Toast } from "../toast/toast";
import { CourseRegistrationService } from "../services/courseRegistrationService";
import { HttpService } from "../services/httpService";
import { CommonService } from "../services/commonService";
import { Command } from "../Command";
import { App } from "../app";
import { BallLoader } from "../loader/ballLoader";

export class RegisterCourseVm {
  courseList: any[];
  selectedCourses: any[] = [];
  totalCredit: string;
  specializationId = this._courseRegistrationService.student.specialization;
  selectedCourseCommand: Command = new Command();
  courseRegisteredCommand: Command = new Command();
  setTotalCreditCommand: Command = new Command();
  specializations = [];
  trailList = [];
  httpService = new HttpService();
  canRegister = false;

  constructor(private _courseRegistrationService: CourseRegistrationService, private commonService: CommonService) {}

  async getMountedCourses() {
    this.courseList = this._courseRegistrationService.mountedCourses.filter(
      (x) => x.specialization === this._courseRegistrationService.student.specialization
    );
    this.selectedCourses = [];

    if (this.trailList.length > 0) {
      this.trailList = this._courseRegistrationService.trailCourses;
    }

    for (var c of this.courseList) {
      c.lecturer = this.commonService.lecturers.find((x) => x.lecturerId === c.assignedTo).name;
      if (c.category !== "ELECTIVE") {
        let selectedCourse = {
          courseCode: c.courseCode,
          credit: c.credit,
          studentId: this._courseRegistrationService.student.studentId,
          mountedCourseId: c.mountedCourseId,
          indexNumber: this._courseRegistrationService.student.indexNumber,
          programId: this._courseRegistrationService.student.programId,
          semester: c.semester.toUpperCase(),
          academicYear: c.academicYear,
          approved: false,
        };
        this.selectedCourses.push(selectedCourse);
      }
    }
    for (var c of this.trailList) {
      c.lecturer = this.commonService.lecturers.find((x) => x.lecturerId === c.assignedTo).name;
    }
    //this._courseRegistrationService.student.specialization = specializationId;
    this.selectedCourseCommand.execute();
    // await new HttpService().get(
    //   `Student/UpdateSpecialization/${this._courseRegistrationService.student.indexNumber}/${this._courseRegistrationService.student.specialization}`
    // );
  }

  getSpecializations() {
    let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
    return program.specializations;
  }

  addCourse = (c: any) => {
    let selectedCourse = {
      courseCode: c.courseCode,
      credit: c.credit,
      studentId: this._courseRegistrationService.student.studentId,
      mountedCourseId: c.mountedCourseId,
      indexNumber: this._courseRegistrationService.student.indexNumber,
      programId: this._courseRegistrationService.student.programId,
      semester: c.semester,
      academicYear: c.academicYear,
      approved: false,
    };
    this.selectedCourses.push(selectedCourse);
    this.setTotalCreditCommand.execute();
  };

  removeCourse = (c: any) => {
    let selectedCourse = this.selectedCourses.find((x) => x.courseCode === c.courseCode);
    if (selectedCourse) {
      let index = this.selectedCourses.indexOf(selectedCourse);
      this.selectedCourses.splice(index, 1);
      this.setTotalCreditCommand.execute();
    }
  };

  register = async () => {
    if (await this.getControlStatus()) {
      if (this._courseRegistrationService.hasRegisterd) {
        await this.update();
      } else {
        await this.save();
      }
    } else {
      Toast.warning("Registration is closed");
    }
  };

  save = async () => {
    if (this.selectedCourses.length === 0) {
      Toast.warning("No course selected");
    } else if (!this.canRegister) {
      Toast.warning("You can't register because you have not fulfilled minimum fees requirement");
    } else {
      let courses = this.selectedCourses.map(
        (x) =>
          new Object({
            studentId: x.studentId,
            programId: x.programId,
            mountedCourseId: x.mountedCourseId,
            indexNumber: x.indexNumber,
            semester: x.semester.toUpperCase(),
            academicYear: x.academicYear,
            approved: x.approved,
          })
      );

      let totalCredit = this.selectedCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0);
      let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
      let maxCreditLimit = program.creditLimits.find((x) => x.level === this._courseRegistrationService.student.level).maxCredit;
      if (totalCredit > parseInt(maxCreditLimit)) {
        Toast.warning("Maximum credit limit exceeded");
      } else {
        const result = await new HttpService().post("Department/RegisterCourse", courses);
        if (result.isSucessful) {
          this.selectedCourses = [];
          this.courseList = [];
          Toast.success(result.message);
          this.courseRegisteredCommand.execute();
          await this._courseRegistrationService.getSchoolByProgram(this._courseRegistrationService.student.programId);
          App.navigate("/app/#registeredCourses");
        }
      }
    }
  };

  update = async () => {
    if (this.selectedCourses.length === 0) {
      Toast.warning("No course selected");
    } else {
      let courses = this.selectedCourses.map(
        (x) =>
          new Object({
            studentId: x.studentId,
            programId: x.programId,
            mountedCourseId: x.mountedCourseId,
            indexNumber: x.indexNumber,
            semester: x.semester.toUpperCase(),
            academicYear: x.academicYear,
            //registeredCourseId: x.registeredCourseId,
            approved: x.approved,
          })
      );

      let totalCredit = this.selectedCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0);
      let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
      let maxCreditLimit = program.creditLimits.find((x) => x.level === this._courseRegistrationService.student.level).maxCredit;
      if (totalCredit > parseInt(maxCreditLimit)) {
        Toast.warning("Maximum credit limit exceeded");
      } else {
        const result = await this.httpService.post("Department/UpdateRegisterCourse", courses);
        if (result.isSucessful) {
          this.selectedCourses = [];
          this.courseList = [];
          Toast.success(result.message);
          this.courseRegisteredCommand.execute();
          await this._courseRegistrationService.getSchoolByProgram(this._courseRegistrationService.student.programId);
          App.navigate("/app/#registeredCourses");
        }
      }
    }
  };

  async getFeeStatement() {
    BallLoader.show();
    let url = `Student/CanRegisterStudent/?indexNumber=${this._courseRegistrationService.student.indexNumber}&academicYear=${this.selectedCourses[0].academicYear}`;
    let data = await this.httpService.get(url);
    this.canRegister = data.value;
    BallLoader.hide();
  }

  async getControlStatus() {
    let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
    let school = this.commonService.schools.find((x) => x.schoolId === program.schoolId);
    BallLoader.show();
    let res = await this.httpService.get(
      `StatusControl/GetStatusControl/?academicYear=${school.academicYear}&programId=${program.programId}`
    );
    if (res.isSucessful) {
      BallLoader.hide();
      return res.value.active ?? false;
    }
    BallLoader.hide();
    return false;
  }
}
