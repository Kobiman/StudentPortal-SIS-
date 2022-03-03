import { ViewModelHelper } from "../viewModelHelper";
import { CommonService } from "../services/commonService";
import { _ } from "../group";
import { SelectedCourse } from "../models/SelectedCourse";
import { RegisteredCourseRow } from "../views/registrationApproval/RegisteredCourseRow";
import { HttpService } from "../services/httpService";
import { BallLoader } from "../loader/ballLoader";
import { App } from "../app";

export class ApproveRegistrationVm {
  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.getPrograms();
    this.getLookups();
  }

  originalRegistrationList: any[] = [];
  temporalRegistrationList: any[] = [];
  request: any;
  lookups: any[] = [];
  indexNumber: any;
  studentName: any;
  programs: any[] = [];
  levels: any[] = [];
  pendingTrails: any[];
  selectedCourses: SelectedCourse[] = [];
  checked: boolean;
  validator: any;
  level: string;
  mountedCourses: any[] = [];
  trailList: any[] = [];
  viewModelHelper: ViewModelHelper;
  mountedCourse: SelectedCourse = new SelectedCourse();
  maximunCredit = 0;
  academicyear: string;
  semester: string;

  getMountedCourses = async () => {
    if (this.mountedCourses.length === 0) {
      let request = [
        { propertyName: "AcademicYear", parameter: this.academicyear },
        { propertyName: "Level", parameter: this.level },
      ];
      const data = await new HttpService().post("Department/GetMountedCourses", request);
      this.mountedCourses = data.value;
    }
  };

  // getTrailList = async () => {
  //   debugger;
  //    let request = { indexNumber: this.indexNumber, semester: this.semester, academicYear: this.academicyear };
  //   const data = await new HttpService().post("Department/GetTrailList",request);
  //   this.trailList = data.value
  // }

  getStudentRegistration = async (programName, level) => {
    BallLoader.show();
    let program = this.commonService.programs.find((x) => x.name === programName);
    this.maximunCredit = program.creditLimits.find((x) => x.level === level).maxCredit;
    let request = { academicYear: "2020/2021", programId: program.programId, level: level };
    const res = await new HttpService().post("Department/GetRegisteredCoursesForApproval", request);
    if (res.isSucessful) {
      this.originalRegistrationList = res.value.map((r) => ({
        indexNumber: r.indexNumber,
        name: r.surname + " " + r.othernames,
        program: programName,
        level: r.level,
        pendingTrails: r.pendingTrails,
        totalCourses: r.registeredCourses.length,
        totalCredit: r.registeredCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0),
        status: this.setStatus(r.registeredCourses),
        registeredCourses: r.registeredCourses,
        trailCourses: r.trailCourses,
      }));
      this.temporalRegistrationList = this.originalRegistrationList;
    }
    BallLoader.hide();
    new RegisteredCourseRow(this).render();
    this.originalRegistrationList = this.temporalRegistrationList;
  };

  unChecked(checked: boolean) {
    this.checked = checked;
  }

  getRegisteredCourses(indexNumber) {
    return this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber).registeredCourses;
  }

  async aproveRegistration(indexNumber: string) {
    const registration2 = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
    registration2.status = true;
  }

  setStatus(registeredCourses: any[]) {
    let approved = registeredCourses.filter((x) => x.approved);
    let deffered = registeredCourses.filter((x) => !x.approved);
    let status = {};
    if (approved.length > 0 && deffered.length === 0) {
      return (status = { value: true, colour: "" });
    }
    if (approved.length === 0 && deffered.length > 0) {
      return (status = { value: false, colour: "" });
    } else {
      return (status = { value: true, colour: "" });
    }
  }

  async aproveAllRegistration() {
    for (let r of this.temporalRegistrationList) {
      if (this.checked) {
        r.status = { value: true, colour: "" };
      } else if (!this.checked) {
        r.status = { value: false, colour: "" };
      }
    }
    var request = this.temporalRegistrationList.map((x) => ({
      indexNumber: x.indexNumber,
      approveCourses: x.registeredCourses.map((y) => ({ status: x.status.value, registeredCourseId: y.registeredCourseId })),
    }));
    
    const res = await new HttpService().post("Department/ApproveRegisteredCourses", request);
    if (res.isSucessful) {
      new RegisteredCourseRow(this).render();
    }
  }

  rejectRegistration(indexNumber: string) {
    const registration1 = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
    registration1.status = "Deffered";
    new RegisteredCourseRow(this).render();
  }

  addMountedCourse(courseCode: string, indexNumber: string) {
    const course = this.mountedCourses.find((x) => x.courseCode === courseCode);
    const registration = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
    registration.registeredCourses.push(course);
  }

  addTrailCourse(courseCode: string, indexNumber: string) {
    const course = this.temporalRegistrationList.find((x) => x.courseCode === courseCode);
    const registration = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
    registration.registeredCourses.push(course);
  }

  removeCourse(courseCode: string, indexNumber: string) {
    const registration1 = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
    const courseIndex1 = registration1.registeredCourses.findIndex((x) => x.courseCode === courseCode);
    registration1.registeredCourses.splice(courseIndex1, 1);
  }

  getPrograms = () => {
    return this.commonService.getProgramsByUserType();
  };

  getAcademicYear = () => {
    const registration1 = this.temporalRegistrationList[0].registeredCourses[0].academicYear;
    this.semester = this.temporalRegistrationList[0].registeredCourses[0].semester;
    this.academicyear = registration1;
  };

  getLookups = () => {
    this.programs = this.commonService.lookups.filter((x) => x.type === "PROGRAMS");
    this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
  };
}
