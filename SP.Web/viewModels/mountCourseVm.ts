import { Course } from "../models/Course";
import { SelectedCourse } from "../models/SelectedCourse";
import { ViewModelHelper } from "../viewModelHelper";
import { BindingList2 } from "../BindingList2";
import { Rules, Required, Validator } from "../validator";
import { Lookup } from "../models/lookup";
import { _ } from "../group";
import { CommonService } from "../services/commonService";
import { Toast } from "../toast/toast";
import { App } from "../app";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";

export class MountCourseViewModel {
  validator: Validator;
  viewModelHelper: ViewModelHelper;
  allCourses: any[];
  mountedCourses: any[] = [];
  mountedCourse: SelectedCourse = new SelectedCourse();
  programUpdatedCommand: Command;
  specializationUpdatedCommand: Command;
  courseAddedCommand: Command;

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
    this.programUpdatedCommand = new Command();
    this.specializationUpdatedCommand = new Command();
    this.courseAddedCommand = new Command();
    this.mountedCourse.scoring = true;
  }
  enrollmentOptions: any[] = [];
  levels: any[] = [];
  //lecturers: any[] = [];
  courses: Course[] = [];
  selectedCourses: SelectedCourse[] = [];
  categories: any[] = [];
  programs: any[] = [];
  lookups: Lookup[] = [];
  specializations: any[] = [];
  departments: any[] = [];
  muntedCourseList: any[] = [];

  getEnrollmentOption() {
    this.enrollmentOptions = this.commonService.lookups.filter((x) => x.type === "ENROLLMENT OPTION");
    return this.enrollmentOptions;
  }

  getLecturers(value) {
    return this.commonService.lecturers.filter((x) => x.name.toUpperCase().includes(value.toUpperCase()));
  }

  getLevels() {
    return this.commonService.lookups.filter((x) => x.type === "LEVEL");
  }

  getDepartments() {
    this.departments = this.commonService.getDepartmentsWithCoursesUserType();
    this.allCourses = [];
    for (var department of this.departments) {
      this.allCourses.push(...department.courses);
    }
    return this.departments;
  }

  getAllCourses = async (value) => {
    return this.allCourses.filter((x) => x.courseName.toUpperCase().includes(value.toUpperCase()));
  };

  getProgramsByDepartment = (departmentId: string) => {
    this.mountedCourse.department = departmentId;
    this.programs = this.commonService.programs.filter((x) => x.departmentId === departmentId);
    this.programUpdatedCommand.execute();
  };

  getSpecializations(level: string) {
    this.mountedCourse.level = level;
    let program = this.commonService.programs.find((x) => x.name === this.mountedCourse.program);
    this.specializations = program.specializations.filter((x) => x.level === level);
    this.specializationUpdatedCommand.execute();
  }

  getSpecialization(specializationId: string) {
    let program = this.commonService.programs.find((x) => x.name === this.mountedCourse.program);
    return program.specializations.find((x) => x.specializationId === specializationId);
  }

  getCourseTypes() {
    return this.commonService.lookups.filter((x) => x.type === "SPECIALIZATION");
  }

  addCourse = () => {
    let rules = this.setupRules();
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      let course = this.allCourses.find((x) => x.courseName === this.mountedCourse.course);
      let specialization = "";
      if (this.mountedCourse.specialization) {
        let result = this.specializations.find((x) => x.specializationId === this.mountedCourse.specialization);
        if (result) {
          specialization = result.name;
        }
      }

      let selectedCourse: SelectedCourse = {
        enrollmentOption: this.mountedCourse.enrollmentOption,
        course: course.courseName,
        courseCode: course.code,
        credit: course.credit,
        specialization: this.mountedCourse.specialization,
        specializationName: specialization,
        category: this.mountedCourse.category,
        level: this.mountedCourse.level,
        scoring: this.mountedCourse.scoring,
        assignedTo: this.mountedCourse.assignedTo,
        department: this.mountedCourse.department,
        program: this.mountedCourse.program,
      };

      let c = this.selectedCourses.find(
        (x) =>
          x.level === selectedCourse.level &&
          x.enrollmentOption === selectedCourse.enrollmentOption &&
          x.courseCode === selectedCourse.courseCode &&
          x.course === selectedCourse.course
      );
      if (!c) {
        this.selectedCourses.push(selectedCourse);
        let groups = _.groupBy(this.selectedCourses, function (course) {
          return {
            enrollmentOption: course.enrollmentOption,
            category: course.category,
            program: course.program,
            level: course.level,
            specialization: course.specializationName,
          };
        });

        this.mountedCourses = Object.keys(groups).map(function (group) {
          let j = JSON.parse(group);
          let g = groups[group];
          return {
            enrollmentOption: j.enrollmentOption,
            level: j.level,
            program: j.program,
            category: j.category,
            specialization: j.specialization,
            mountedCourses: g,
          };
        });
        this.courseAddedCommand.execute();
      } else {
        Toast.warning("Course Already Exist");
      }
      return null;
    }
  };

  setupRules() {
    return [
      new Rules("enrollmentOption", [new Required(this.mountedCourse.enrollmentOption)]),
      //new Rules("specialization", [new Required(this.mountedCourse.specialization)]),
      new Rules("level", [new Required(this.mountedCourse.level)]),
      new Rules("assignedTo", [new Required(this.mountedCourse.assignedTo)]),
      new Rules("department", [new Required(this.mountedCourse.department)]),
      new Rules("program", [new Required(this.mountedCourse.program)]),
      new Rules("course", [new Required(this.mountedCourse.course)]),
    ];
  }

  removeCourse(rowIndex: number) {
    this.selectedCourses.splice(rowIndex, 1);
  }

  bind() {
    this.mountedCourse = this.viewModelHelper.addPropertyChangeNotification(this.mountedCourse);
  }

  async save() {
    if (this.selectedCourses.length === 0) {
      Toast.warning("No Course Mounted");
    } else {
      let courses = this.selectedCourses.map((x) => this.mapCourses(x));
      let res = await new HttpService().post("Department/MountCourse", courses);
      if (res.isSucessful) {
        this.mountedCourses = [];
        this.selectedCourses = [];
        Toast.success(res.message);
        this.courseAddedCommand.execute();
      } else {
        Toast.error(res.message);
      }
    }
  }

  private mapCourses(x: SelectedCourse): Object {
    let department = this.departments.find((d) => d.departmentId === x.department);
    return new Object({
      EnrollmentOption: x.enrollmentOption.toUpperCase(),
      Category: x.category,
      Specialization: x.specialization,
      Level: x.level,
      Scoring: x.scoring,
      CourseName: x.course,
      CourseCode: x.courseCode,
      Credit: x.credit,
      ProgramId: this.commonService.programs.find((p) => p.name === x.program).programId,
      Semester: department.semester.toUpperCase(),
      AssignedTo: this.commonService.lecturers.find((l) => l.name === x.assignedTo).lecturerId,
      AcademicYear: department.academicYear,
      AssignedBy: App.user.profile.userId,
    });
  }

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }
}
