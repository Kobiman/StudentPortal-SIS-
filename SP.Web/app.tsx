import { FrontPageView } from "./views/frontpage";
import { AddStudentView } from "./views/student/addStudent";
import { IView } from "./IView";
import { AddStudentVm } from "./viewModels/AddStudentVm";
import { Stage1 } from "./views/student/stage1";
import { Stage2 } from "./views/student/stage2";
import { Stage3 } from "./views/student/stage3";
import { StudentListView } from "./views/student/studentList";
import { StudentListVm } from "./viewModels/StudentListVm";
import { HeaderView } from "./views/header";
import { MountCourseView } from "./views/mountCourse/mountCourse";
import { MountCourseViewModel } from "./viewModels/mountCourseVm";
import { InstitutionView } from "./views/institution/institutionView";
import { InstitutionVm } from "./viewModels/InstitutionVm";
import { SchoolView } from "./views/school/schoolView";
import { SchoolVm } from "./viewModels/schoolVm";
import { DepartmentView } from "./views/department/departmentView";
import { DepartmentVm } from "./viewModels/departmentVm";
import { ProgramView } from "./views/program/programView";
import { ProgramViewModel } from "./viewModels/programVm";
import { CourseVm } from "./viewModels/courseVm";
import { CourseView } from "./views/course/courseView";
import { LookupView } from "./views/lookUp/lookupView";
import { LookupVm } from "./viewModels/lookupVm";
import { LecturerView } from "./views/lecturer/lecturerView";
import { LecturerVm } from "./viewModels/lecturerVm";
import { MountedCourseVm } from "./viewModels/mountedCourseVm";
import { MountedCoursesView } from "./views/mountCourse/mountedCoursesView";
import { CommonService } from "./services/commonService";
import "./css/style.css";
import { createElement } from "tsx-create-element";
import { RegisteredCoursesView } from "./views/registration/registeredCoursesView";
import { CourseRegistrationService } from "./services/courseRegistrationService";
import { RegisteredCoursesVm } from "./viewModels/registeredCoursesVm";
import { RegisterCourseView } from "./views/registration/registerCourseView";
import { RegisterCourseVm } from "./viewModels/registerCourseVm";
import { UploadResultView } from "./views/uploadResult/uploadResultView";
import { UploadResultViewModel } from "./viewModels/uploadResultVm";
import { StudentResultsVm } from "./viewModels/StudentResultsVm";
import { ApproveRegistrationVm } from "./viewModels/approveRegistrationVm";
import { ApproveRegistrationView } from "./views/registrationApproval/approveRegistrationView";
import { ResultsAmmendmentView } from "./views/ResultAmmendment/resultsAmmendmentView";
import { ResultsAmmendmentVm } from "./viewModels/resultsAmmendmentVm";
import { transcriptGenerationView } from "./views/transcript/transcriptGenerationView";
import { TranscriptGenerationVm } from "./viewModels/transcriptGenerationVm";
import { BroadSheetView } from "./views/broadSheet/broadSheetView";
import { BroadSheetVm } from "./viewModels/broadSheetVm";
import { LoginVm } from "./viewModels/loginVm";
import { loginView } from "./views/loginView";
import { FrontPageVm } from "./viewModels/frontpageVm";
import * as Oidc from "oidc-client";
import { userProfileView } from "./views/studentProfile/userProfileView";
import { UserProfileVm } from "./viewModels/userProfileVm";
import { lecturerProfileView } from "./views/lecturer/lecturerProfileView";
import { LecturerProfileVm } from "./viewModels/lecturerProfileVm";
import { examsListView } from "./views/examsList/examsList";
import { ExamsListVm } from "./viewModels/examsListVm";
import { ResultsSummaryView } from "./views/resultsSummary/resultsSummary";
import { ResultsSummaryVm } from "./viewModels/resultsSummaryVm";
import { CourseRegistrationView } from "./views/registration/courseRegistrationView";
import { CourseRegistrationVm } from "./viewModels/courseRegistrationVm";
import { PermissionVm } from "./viewModels/permissionsVm";
import { PermissionView } from "./views/permissions/permissions";
import { PagesView } from "./views/Pages/pages";
import { PagesVm } from "./viewModels/pagesVm";
import { HttpService } from "./services/httpService";
import { StudentResultsView } from "./views/student/studentResults";
import { GradingSystemView } from "./views/grading/gradingSystemView";
import { GradingSystemVm } from "./viewModels/gradingSystemVm";
import { BallLoader } from "./loader/ballLoader";
import { FeesStatementView } from "./views/student/feesStatement";
import { FeesStatementVm } from "./viewModels/FeesStatementVm";
import { UserAccountVm } from "./viewModels/userAccountVm";
import { UserAccountView } from "./views/userAccount/userAccountView";
import { ControlsView } from "./views/Controls/controlsView";
import { ControlsVm } from "./viewModels/controlsVm";

export class App {
  static baseUri = "https://localhost:44359"; ////"https://localhost:5001"; "http://10.212.2.247:81";
  static currentPath = "";
  static commonService = new CommonService();
  static courseRegistrationService = new CourseRegistrationService();
  private static addStudentVm = new AddStudentVm();
  //private static mountCourseViewModel = new MountCourseViewModel(App.commonService);

  private static config = {
    authority: "https://auth.uenr.edu.gh/",
    client_id: "js",
    redirect_uri: "http://127.0.0.1:55541/app/index.html",
    //silent_redirect_uri: `${environment.clientRoot}assets/silent-callback.html`,
    post_logout_redirect_uri: "http://127.0.0.1:55541/app/index.html",
    response_type: "id_token token",
    loadUserInfo: true,
    scope: "openid profile api1 email phone",
  };
  
  // private static config = {
  //   authority: "https://auth.uenr.edu.gh/",
  //   //https://auth.uenr.edu.gh/
  //   client_id: "js",
  //   redirect_uri: "http://127.0.0.1:55541/app/index.html",
  //   //redirect_uri: "http://127.0.0.1:55541/app/index.html",
  //   //silent_redirect_uri: `${environment.clientRoot}assets/silent-callback.html`,
  //   post_logout_redirect_uri: "http://127.0.0.1:55541/app/index.html",
  //   response_type: "id_token token",
  //   loadUserInfo: true,
  //   scope: "openid profile api1 email phone",
  // };

  // private static config = {
  //   authority: "https://auth.uenr.edu.gh/",
  //   client_id: "SIS Client",
  //   redirect_uri: "http://10.212.2.247:82/app/index.html",
  //   post_logout_redirect_uri: "http://10.212.2.247:82/app/index.html",
  //   response_type: "id_token token",
  //   loadUserInfo: true,
  //   scope: "openid profile api1 email phone"
  // };

  static userManager: Oidc.UserManager = new Oidc.UserManager(App.config);
  static user: Oidc.User;

  static routes = {
    "": () => new FrontPageView(new FrontPageVm()),
    "/app/#addStudent": () => new AddStudentView(App.addStudentVm),
    "/app/#frontPage": () => new FrontPageView(new FrontPageVm()),
    "/app/#studentList": () =>
      new StudentListView(new StudentListVm(App.commonService)),
    "/app/#mountCourse": () =>
      new MountCourseView(new MountCourseViewModel(App.commonService)),
    "/app/#addStudent/stage1": () => new Stage1(App.addStudentVm),
    "/app/#addStudent/stage2": () => new Stage2(App.addStudentVm),
    "/app/#addStudent/stage3": () => new Stage3(App.addStudentVm),
    "/app/#institution": () => new InstitutionView(new InstitutionVm()),
    "/app/#school": () => new SchoolView(new SchoolVm(App.commonService)),
    "/app/#department": () =>
      new DepartmentView(new DepartmentVm(App.commonService)),
    "/app/#program": () =>
      new ProgramView(new ProgramViewModel(App.commonService)),
    "/app/#course": () => new CourseView(new CourseVm(App.commonService)),
    "/app/#lookup": () => new LookupView(new LookupVm(App.commonService)),
    "/app/#lecturer": () => new LecturerView(new LecturerVm(App.commonService)),
    "/app/#mountedCourses": () =>
      new MountedCoursesView(new MountedCourseVm(App.commonService)),
    "/app/#studentResults": () =>
      new StudentResultsView(new StudentResultsVm(App.commonService)),

    "/app/#courseRegistration": () =>
      new CourseRegistrationView(
        new CourseRegistrationVm(App.courseRegistrationService)
      ),
    "/app/#registeredCourses": () =>
      new RegisteredCoursesView(
        new RegisteredCoursesVm(
          App.courseRegistrationService,
          App.commonService
        )
      ),
    "/app/#registerCourses": () =>
      new RegisterCourseView(
        new RegisterCourseVm(App.courseRegistrationService, App.commonService)
      ),
    "/app/#uploadResults": () =>
      new UploadResultView(new UploadResultViewModel(App.commonService)),
    "/app/#approveRegistration": () =>
      new ApproveRegistrationView(new ApproveRegistrationVm(App.commonService)),
    "/app/#resultsAmmendment": () =>
      new ResultsAmmendmentView(new ResultsAmmendmentVm(App.commonService)),
    "/app/#userProfile": () =>
      new userProfileView(new UserProfileVm(App.commonService)),
    "/app/#lecturerProfile": () =>
      new lecturerProfileView(new LecturerProfileVm(App.commonService)),
    "/app/#transcriptGeneration": () =>
      new transcriptGenerationView(
        new TranscriptGenerationVm(App.commonService)
      ),
    "/app/#login": () => new loginView(new LoginVm(App.commonService)),
    "/app/#examsList": () =>
      new examsListView(new ExamsListVm(App.commonService)),
    "/app/#broadSheet": () =>
      new BroadSheetView(new BroadSheetVm(App.commonService)),
    "/app/#resultsSummary": () =>
      new ResultsSummaryView(new ResultsSummaryVm(App.commonService)),
    "/app/#permission": () =>
      new PermissionView(new PermissionVm(App.commonService)),
    "/app/#pages": () => new PagesView(new PagesVm(App.commonService)),
    "/app/#gradingSystem": () =>
      new GradingSystemView(new GradingSystemVm(App.commonService)),
    "/app/#feesStatement": () =>
      new FeesStatementView(new FeesStatementVm(App.commonService)),
    "/app/#userAccount": () =>
      new UserAccountView(new UserAccountVm(App.commonService)),
    "/app/#controls": () =>
      new ControlsView(new ControlsVm(App.commonService)),
  };

  static async render(view: IView, domlocation: string) {
    await view.oninitialized();
    await view.render(domlocation);
  }

  public static async navigate(pathName: string) {
    if (window.location.href.includes("access_token")) {
      if (App.user.profile.userType === "Student") {
        await App.courseRegistrationService.getStudent();
        window.history.pushState(
          {},
          "/app/#userProfile",
          window.location.origin + "/app/#userProfile"
        );
        localStorage.setItem("currentPath", "/app/#userProfile");
        let view = this.routes["/app/#userProfile"]();
        this.render(view, "route-outlet");
      } else {
        window.history.pushState(
          {},
          "/app/#lecturerProfile",
          window.location.origin + "/app/#lecturerProfile"
        );
        localStorage.setItem("currentPath", "/app/#lecturerProfile");
        let view = this.routes["/app/#lecturerProfile"]();
        this.render(view, "route-outlet");
      }
    } else if (this.currentPath !== pathName) {
      window.history.pushState({}, pathName, window.location.origin + pathName);
      var view = this.routes[pathName]();
      await this.render(view, "route-outlet");
      this.currentPath = pathName;
      localStorage.setItem("currentPath", pathName);
    }
  }

  static async signIn() {
    App.userManager.signinRedirect();
  }

  static async signOut() {
    //localStorage.setItem("user", null);
    //localStorage.setItem("currentPath", "/app/#frontPage");
    await App.userManager.signoutRedirect();
  }

  public static register() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/app/sw.js")
          .then((reg) => {
            console.log("Registered", reg);
          })
          .catch((err) => {
            console.log("Registration failed", err);
          });
      });

      let deferredPrompt;
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        //btnAdd.style.display = 'block';
        let btn = <button id="btnAdd">Add</button>;
        btn.addEventListenner("click", (e) => {
          deferredPrompt.userChoice.then((choice) => {
            console.log("User accepted the A2HS prompt");
          });
          deferredPrompt = null;
        });
        document.appendChild(btn);
      });
    }
  }

  public static navigateChild(pathName: string) {
    if (this.currentPath !== pathName) {
      window.history.pushState({}, pathName, window.location.origin + pathName);
      this.currentPath = pathName;
    }
  }
}

window.onload = async (evt: Event) => {
  if (window.location.href.includes("access_token")) {
    await App.userManager.signinRedirectCallback();
    App.user = await App.userManager.getUser();
    //localStorage.setItem("user", JSON.stringify(App.user));
  }

  //App.user = App.user ?? JSON.parse(localStorage.getItem("user"));
  if (App.user) {
    await App.commonService.getLecturers();
    if (App.user.profile.userType === "Lecturer") {
      let lecturer = App.commonService.lecturers.find(
        (x) => x.staffId === App.user.profile.userId
      );
      let permissions = await new HttpService().get(
        "UserPermission/GetUserPermissions/" + lecturer.staffId
      );
      new HeaderView(App.user, permissions.value, App.commonService).render(
        "header"
      );
    } else {
      let permissions: any[] = [];
      new HeaderView(App.user, permissions, App.commonService).render("header");
    }
  }
  await App.commonService.getLookups();
  await App.commonService.getPrograms();
  await App.commonService.getDepartmentsWithCourses();
  await App.commonService.getSchools();
  // let pathname = localStorage.getItem("currentPath");
  // if (window.location.href.includes("access_token")) {
  //   await App.navigate(pathname);
  // } else {
    await App.navigate("/app/#frontPage");
  //}

  if(App.user.profile.userType === "Lecturer"){
    await App.commonService.getStudents();
  }
  //App.register();
};

window.onpopstate = () => {
  App.navigate(window.location.pathname + location.hash);
};
