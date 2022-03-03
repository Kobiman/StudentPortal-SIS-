var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createElement } from "tsx-create-element";
import { App } from "../app";
import { ViewModelHelper } from "../viewModelHelper";
export class HeaderView {
    constructor(user, permissions, commonService) {
        this.user = user;
        this.permissions = permissions;
        this.commonService = commonService;
        // menuItems = [];
        this.menuItems = [
            { header: "Students", class: "fas fa-user-graduate", children: [
                    //{route:"/app/#addStudent/stage1",title:"Add Student",roles:["Student","Lecturer"]},
                    { route: "/app/#studentList", title: "Student List", roles: ["Lecturer"] },
                    { route: "/app/#userProfile", roles: ["Student"] },
                    { route: "/app/#mountCourse", title: "Mount Course", roles: ["Lecturer"] },
                    { route: "/app/#mountedCourses", title: "Mounted Courses", roles: ["Lecturer"] },
                    //{route:"/app/#registerCourses",title:"Register Courses",roles:["Student"]},
                    //{route:"/app/#registeredCourses",title:"Registered Courses",roles:["Student"]},
                    { route: "/app/#courseRegistration", title: "Register Courses", roles: ["Student"] },
                    { route: "/app/#studentResults", title: "Check Result", roles: ["Student"] },
                    { route: "/app/#feesStatement", title: "Fees Status", roles: ["Student"] },
                ]
            },
            { header: "Setup", class: "fas fa-users-cog", children: [
                    { route: "/app/#institution", title: "Institution", roles: ["Lecturer"] },
                    { route: "/app/#school", title: "School", roles: ["Lecturer"] },
                    { route: "/app/#department", title: "Department", roles: ["Lecturer"] },
                    { route: "/app/#lecturer", title: "Lecturer", roles: ["Lecturer"] },
                    { route: "/app/#program", title: "Program", roles: ["Lecturer"] },
                    { route: "/app/#course", title: "Course", roles: ["Lecturer"] },
                    { route: "/app/#gradingSystem", title: "Grading System", roles: ["Lecturer"] },
                    { route: "/app/#lookup", title: "Lookup", roles: ["Lecturer"] },
                    { route: "/app/#permission", title: "Permissions", roles: ["Lecturer"] },
                    { route: "/app/#pages", title: "Configure Pages", roles: ["Lecturer"] },
                    { route: "/app/#controls", title: "Controls", roles: ["Lecturer"] }
                ]
            },
            { header: "USP", class: "fas fa-book-reader", children: [
                    { route: "/app/#uploadResults", title: "Upload Result", roles: ["Lecturer"] },
                    { route: "/app/#approveRegistration", title: "Approve Registration", roles: ["Lecturer"] },
                    { route: "/app/#broadSheet", title: "Broad Sheet", roles: ["Lecturer"] },
                    { route: "/app/#resultsSummary", title: "Results Summary", roles: ["Lecturer"] },
                    { route: "/app/#resultsAmmendment", title: "Results Ammendment", roles: ["Lecturer"] },
                    { route: "/app/#transcriptGeneration", title: "Transcript & St. of Result", roles: ["Lecturer"] },
                    { route: "/app/#examsList", title: "Exams List", roles: ["Lecturer"] },
                ]
            },
            { header: "User Profile", class: "fa fa-user-circle-o", children: [
                    { route: "/app/#userProfile", title: "Student Profile", roles: ["Student"] },
                    { route: "/app/#lecturerProfile", title: "Lecturer Profile", roles: ["Lecturer"] }
                ]
            }
        ];
        this.render = (elementId) => {
            let menus = [];
            if (this.user.profile.userType === "Student") {
                this.menuItems.forEach((item) => {
                    for (var c of item.children) {
                        if (c.roles.includes(this.user.profile.userType)) {
                            menus.push(item);
                            return;
                        }
                    }
                });
            }
            else {
                this.menuItems.forEach((item) => {
                    for (var c of item.children) {
                        if (this.permissions.map((x) => x.title).includes(c.title)) {
                            //if(c.roles.includes(this.user.profile.userType))
                            menus.push(item);
                            return;
                        }
                    }
                });
            }
            let temp = (createElement("div", null,
                createElement("input", { type: "checkbox", id: "check" }),
                createElement("label", { for: "check" },
                    createElement("i", { id: "open-slide" },
                        createElement("svg", { width: "30", height: "25" },
                            createElement("path", { d: "M0,5 30,5", stroke: "#59b379", "stroke-width": "5" }),
                            createElement("path", { d: "M0,14 30,14", stroke: "#59b379", "stroke-width": "5" }),
                            createElement("path", { d: "M0,23 30,23", stroke: "#59b379", "stroke-width": "5" }))),
                    createElement("i", { class: "fa fa-times", id: "cancel" })),
                createElement("div", { id: "side-menu", class: "sp-side-nav", style: "cursor:pointer;" },
                    createElement("header", { id: "btn-close" }, "USP "),
                    createElement("ul", null,
                        menus.map((xx) => (createElement("li", null,
                            createElement("a", null,
                                createElement("i", { class: xx.class, style: "cursor:pointer;" })),
                            createElement("div", { class: "sp-side-nav-2", style: "cursor:pointer;" },
                                createElement("header", null,
                                    xx.header,
                                    " "),
                                createElement("ul", null, xx.children.map((child) => (createElement("li", null, this.renderChild(child))))))))),
                        createElement("li", { id: "signOut-li" },
                            createElement("a", { id: "signOut" },
                                createElement("i", { class: "fa fa-sign-out" })))))));
            var doc = document.getElementById(elementId);
            doc.innerHTML = "";
            doc.innerHTML = temp.outerHTML;
            var btn = document.getElementById("open-slide");
            btn.addEventListener("click", (evt) => {
                evt.preventDefault();
                document.getElementById("side-menu").style.left = "0px";
                document.getElementById("route-outlet").style.marginLeft = "100px";
            });
            let signOut = document.getElementById("signOut");
            signOut.addEventListener("click", (evt) => {
                evt.preventDefault();
                App.signOut();
            });
            var btnclose = document.getElementById("btn-close");
            btnclose.addEventListener("click", (evt) => {
                evt.preventDefault();
                document.getElementById("side-menu").style.left = "-150px";
                document.getElementById("route-outlet").style.marginLeft = "0px";
            });
            new ViewModelHelper().addEventListener(this, "route");
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    renderChild(child) {
        let elem = "";
        if (this.user.profile.userType === "Student") {
            if (child.roles.includes(this.user.profile.userType)) {
                elem = createElement("a", { route: child.route }, child.title);
            }
        }
        else {
            if (this.permissions.map((x) => x.title).includes(child.title)) {
                elem = createElement("a", { route: child.route }, child.title);
            }
        }
        return elem;
    }
}
//<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
{
    /* <nav class="sp-navbar">
                       <span id="open-slide" class="open-slide">
                        <a href="#" class="svg">
                        <svg width="30" height="30">
                             <path d="M0,5 30,5" stroke="#fff"
                             stroke-width="5"/>
                             <path d="M0,14 30,14" stroke="#fff"
                             stroke-width="5"/>
                             <path d="M0,23 30,23" stroke="#fff"
                             stroke-width="5"/>
                         </svg>
                        </a>
                       </span>
                       
                       <ul class="sp-navbar-nav">
                           <li><a>USP <i> </i></a></li>
                           <li><a href="#"><i class="fa fa-home"></i> Home</a></li>
                           <li><a href="#"><i class="fa fa-home"></i> About</a></li>
                           <li><a href="#"><i class="fa fa-home"></i> Services</a></li>
                       </ul>
                     </nav> */
}
//# sourceMappingURL=header.js.map