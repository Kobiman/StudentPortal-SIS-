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
import { App } from "../../app";
export class RegisteredCoursesView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        var registeredCoursesView = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Registered Courses"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row sp-row-col0-1-1-1" },
                        createElement("button", { class: "sp-btn sp-btn-primary btn-small", id: "submit", onClick: (evt) => {
                                App.navigate("/app/#registerCourses");
                            } }, "Register")),
                    createElement("div", { class: "horizontal" },
                        createElement("table", { class: "table" },
                            createElement("thead", null,
                                createElement("th", null, "Date"),
                                createElement("th", null, "Academic Year"),
                                createElement("th", null, "Course Code"),
                                createElement("th", null, "Course"),
                                createElement("th", null, "Credit"),
                                createElement("th", null, "Status")),
                            createElement("tbody", { id: "courseList" }, this._vm.getRegisteredCourses().map(x => createElement("tr", null,
                                createElement("td", { binding: "registrationDate" }, x.registrationDate),
                                createElement("td", { binding: "approved" }, x.academicYear),
                                createElement("td", { binding: "courseCode" }, x.courseCode),
                                createElement("td", { binding: "courseName" }, x.courseName),
                                createElement("td", { binding: "credit" }, x.credit),
                                createElement("td", null,
                                    createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                                        this.setStatus(x.approved),
                                        createElement("span", { class: "checkmark" }))))))),
                        createElement("span", { id: "totalCredit" }, "Total Credit: "),
                        " ",
                        this._vm.totalCredit)))));
        // let submit = registerCourseView.getElementsByTagName("button")[0] as HTMLButtonElement;
        // submit.addEventListener("click", (e) => {
        //   e.preventDefault();
        // });
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(registeredCoursesView);
        this._vm.getRegisteredCourses();
    }
    setStatus(approved) {
        let status = "";
        if (approved) {
            status = createElement("input", { type: "checkbox", binding: "selected", checked: true, disabled: true });
        }
        else {
            status = createElement("input", { type: "checkbox", binding: "selected", disabled: true });
        }
        return status;
    }
}
//# sourceMappingURL=registeredCoursesView.js.map