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
import * as Oidc from "oidc-client";

export class LoginVm {
  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
  }

  viewModelHelper: ViewModelHelper;
  departments: any[];
  mountedCourseRequest: {};
  studentResults: any[] = [];
  mountedCourse: any;
  courses: any[] = [];

  async signIn() {
    let config = {
      authority: "https://localhost:44345/",
      client_id: "js",
      redirect_uri: "http://127.0.0.1:55541/app/index.html",
      //silent_redirect_uri: `${environment.clientRoot}assets/silent-callback.html`,
      //post_logout_redirect_uri: `${environment.clientRoot}`,
      response_type: "token",
      scope: "api1",
    };
    let userManager = new Oidc.UserManager(config);
    userManager.signinRedirect();
    let user = await userManager.getUser();
    console.log(user);
    console.log("user");
  }
}
