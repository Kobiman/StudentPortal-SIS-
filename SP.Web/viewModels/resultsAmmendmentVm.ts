import { CommonService } from "../services/commonService";
import { Validator } from "../validator";
import { LookupVm } from "./lookupVm";
import { ViewModelHelper } from "../viewModelHelper";
import { BindingList2 } from "../BindingList2";
import { Courses, ResultRow } from "../views/uploadResult/uploadResultView";
import { App } from "../app";
import { _ } from "../group";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { HttpService } from "../services/httpService";
import { School } from "../models/school";
import { SelectedCourse } from "../models/SelectedCourse";
import { Command } from "../Command";

export class ResultsAmmendmentVm {
  save(
    cDate: string,
    type: string,
    uLimit: string,
    lLimit: string,
    grade: string,
    gradePoint: string,
    remarks: string
  ) {
    throw new Error("Method not implemented.");
  }

  schools: any[];
  allCourses: any[];
  mountedCourses: any[] = [];
  mountedCourse: SelectedCourse = new SelectedCourse();
  programs: any[];
  programUpdatedCommand: Command;
  result: any;
  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.programUpdatedCommand = new Command();
  }

  viewModelHelper: ViewModelHelper;
  departments: any;
  mountedCourseRequest: {};
  studentResults: any[] = [];

  courses: any[] = [];
  levels: any;

  getPrograms = () => {
    return this.commonService.programs;
  };
  getProgramsByDepartment = (departmentId: string) => {
    this.mountedCourse.department = departmentId;
    this.programs = this.commonService.programs.filter(
      (x) => x.departmentId === departmentId
    );
    this.programUpdatedCommand.execute();
  };
  getSemester = () => {
    return this.commonService.lookups.filter((x) => x.type === "SEMESTER");
  };

  getLevels() {
    return this.commonService.lookups.filter((x) => x.type === "LEVEL");
  }
  getAcademicYear() {
    return this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");
  }
  getDepartments() {
    this.departments = this.commonService.departments;

    return this.departments;
  }

  getAllCourses = async (value) => {
    return this.allCourses.filter((x) =>
      x.courseName.toUpperCase().includes(value.toUpperCase())
    );
  };
  getSchools = async () => {
    try {
      const data = await new HttpService().get("School/GetSchools");
      this.schools = data.value as School[];
      return this.schools;
    } catch (error) {}
  };
}
