import { CourseRegistrationVm } from "./courseRegistrationVm";
import { RegisteredCoursesRow } from "../views/registration/registeredCoursesRow";
import { CourseRegistrationService } from "../services/courseRegistrationService";
import { CommonService } from "../services/commonService";

export class RegisteredCoursesVm {
  constructor(private _courseRegistrationService: CourseRegistrationService, private commonService: CommonService) {}

  registeredCourses = [];
  totalCredit = 0;
  getRegisteredCourses() {
    // let r = new RegisteredCoursesRow();
    // this._mainvm.registeredCourses.map((x) => r.render(x));
    debugger
    this.totalCredit = this._courseRegistrationService.registeredCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0);
    return this._courseRegistrationService.registeredCourses ?? [];
  }
}
