d"use strict";
exports.__esModule = true;
exports.App = void 0;
var frontpage_1 = require("./views/frontpage");
var addStudent_1 = require("./views/student/addStudent");
var AddStudentVm_1 = require("./viewModels/AddStudentVm");
var stage1_1 = require("./views/student/stage1");
var stage2_1 = require("./views/student/stage2");
var stage3_1 = require("./views/student/stage3");
var studentList_1 = require("./views/student/studentList");
var StudentListVm_1 = require("./viewModels/StudentListVm");
var header_1 = require("./views/header");
var mountCourse_1 = require("./views/mountCourse/mountCourse");
var mountCourseVm_1 = require("./viewModels/mountCourseVm");
var institutionView_1 = require("./views/institutionView");
var InstitutionVm_1 = require("./viewModels/InstitutionVm");
var schoolView_1 = require("./views/schoolView");
var schoolVm_1 = require("./viewModels/schoolVm");
var departmentView_1 = require("./views/departmentView");
var departmentVm_1 = require("./viewModels/departmentVm");
var programView_1 = require("./views/programView");
var programVm_1 = require("./viewModels/programVm");
var courseVm_1 = require("./viewModels/courseVm");
var courseView_1 = require("./views/courseView");
var lookupView_1 = require("./views/lookupView");
var lookupVm_1 = require("./viewModels/lookupVm");
var lecturerView_1 = require("./views/lecturerView");
var lecturerVm_1 = require("./viewModels/lecturerVm");
var mountedCourseVm_1 = require("./viewModels/mountedCourseVm");
var mountedCoursesView_1 = require("./views/mountCourse/mountedCoursesView");
var commonService_1 = require("./services/commonService");
require("./css/style.css");
var registeredCoursesView_1 = require("./views/registration/registeredCoursesView");
var courseRegistrationService_1 = require("./services/courseRegistrationService");
var registeredCoursesVm_1 = require("./viewModels/registeredCoursesVm");
var registerCourseView_1 = require("./views/registration/registerCourseView");
var registerCourseVm_1 = require("./viewModels/registerCourseVm");
var uploadResultView_1 = require("./views/uploadResultView");
var uploadResultVm_1 = require("./viewModels/uploadResultVm");
var App = /** @class */ (function () {
    function App() {
    }
    App.render = function (view, domlocation) {
        view.render(domlocation);
    };
    App.navigate = function (pathName) {
        if (this.currentPath !== pathName) {
            window.history.pushState({}, pathName, window.location.origin + pathName);
            var view = this.routes[pathName]();
            this.render(view, "route-outlet");
            this.currentPath = pathName;
        }
    };
    App.register = function () {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker
                    .register("/app/sw.js")
                    .then(function (reg) {
                    console.log("Registered", reg);
                })["catch"](function (err) {
                    console.log("Registration failed", err);
                });
            });
            var deferredPrompt_1;
            window.addEventListener("beforeinstallprompt", function (e) {
                e.preventDefault();
                deferredPrompt_1 = e;
                //btnAdd.style.display = 'block';
                var btn = <button id="btnAdd">Add</button>;
                btn.addEventListenner("click", function (e) {
                    deferredPrompt_1.userChoice.then(function (choice) {
                        console.log("User accepted the A2HS prompt");
                    });
                    deferredPrompt_1 = null;
                });
                document.appendChild(btn);
            });
        }
    };
    App.navigateChild = function (pathName) {
        if (this.currentPath !== pathName) {
            window.history.pushState({}, pathName, window.location.origin + pathName);
            this.currentPath = pathName;
        }
    };
    App.baseUri = "https://localhost:44319";
    App.currentPath = "";
    App.commonService = new commonService_1.CommonService();
    App.courseRegistrationService = new courseRegistrationService_1.CourseRegistrationService();
    App.addStudentVm = new AddStudentVm_1.AddStudentVm();
    //private static mountCourseViewModel = new MountCourseViewModel(App.commonService);
    App.routes = {
        "": function () { return new frontpage_1.FrontPageView(); },
        "/app/#addStudent": function () { return new addStudent_1.AddStudentView(App.addStudentVm); },
        "/app/#frontPage": function () { return new frontpage_1.FrontPageView(); },
        "/app/#studentList": function () { return new studentList_1.StudentListView(new StudentListVm_1.StudentListVm()); },
        "/app/#mountCourse": function () {
            return new mountCourse_1.MountCourseView(new mountCourseVm_1.MountCourseViewModel(App.commonService));
        },
        "/app/#addStudent/stage1": function () { return new stage1_1.Stage1(App.addStudentVm); },
        "/app/#addStudent/stage2": function () { return new stage2_1.Stage2(App.addStudentVm); },
        "/app/#addStudent/stage3": function () { return new stage3_1.Stage3(App.addStudentVm); },
        "/app/#institution": function () { return new institutionView_1.InstitutionView(new InstitutionVm_1.InstitutionVm()); },
        "/app/#school": function () { return new schoolView_1.SchoolView(new schoolVm_1.SchoolVm(App.commonService)); },
        "/app/#department": function () { return new departmentView_1.DepartmentView(new departmentVm_1.DepartmentVm()); },
        "/app/#program": function () { return new programView_1.ProgramView(new programVm_1.ProgramViewModel()); },
        "/app/#course": function () { return new courseView_1.CourseView(new courseVm_1.CourseVm()); },
        "/app/#lookup": function () { return new lookupView_1.LookupView(new lookupVm_1.LookupVm()); },
        "/app/#lecturer": function () { return new lecturerView_1.LecturerView(new lecturerVm_1.LecturerVm()); },
        "/app/#mountedCourses": function () {
            return new mountedCoursesView_1.MountedCoursesView(new mountedCourseVm_1.MountedCourseVm(App.commonService));
        },
        //"/app/#courseRegistration": () => new CourseRegistrationView(new CourseRegistrationVm()),
        "/app/#registeredCourses": function () {
            return new registeredCoursesView_1.RegisteredCoursesView(new registeredCoursesVm_1.RegisteredCoursesVm(App.courseRegistrationService));
        },
        "/app/#registerCourses": function () {
            return new registerCourseView_1.RegisterCourseView(new registerCourseVm_1.RegisterCourseVm(App.courseRegistrationService));
        },
        "/app/#uploadResults": function () {
            return new uploadResultView_1.UploadResultView(new uploadResultVm_1.UploadResultViewModel(App.commonService));
        }
    };
    return App;
}());
exports.App = App;
App.register();
App.navigate("/app/#frontPage");
new header_1.HeaderView().render("header");
window.onpopstate = function () {
    App.navigate(window.location.pathname);
};
