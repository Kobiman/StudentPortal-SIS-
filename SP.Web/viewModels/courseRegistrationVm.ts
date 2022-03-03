import { BallLoader } from "../loader/ballLoader";
import { App } from "../app";
import { RegisteredCoursesRow } from "../views/registration/registeredCoursesRow";
import { RegisteredCoursesView } from "../views/registration/registeredCoursesView";
import { RegisterCourseView } from "../views/registration/registerCourseView";
import { RegisteredCoursesVm } from "./registeredCoursesVm";
import { RegisterCourseVm } from "./registerCourseVm";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
import { CourseRegistrationService } from "../services/courseRegistrationService";

export class CourseRegistrationVm {
  registeredCourses: any[];
  hasRegisterd: boolean = false;
  student: any;
  school: any;
  mountedCourses: any[] = [];
  elementId: string;
  event:Command = new Command();
  _courseRegistrationService:CourseRegistrationService;

  constructor(private courseRegistrationService:CourseRegistrationService) {
    this._courseRegistrationService = courseRegistrationService;
  }

  setElementId(elementId: string) {
    this.elementId = elementId;
  }

}
