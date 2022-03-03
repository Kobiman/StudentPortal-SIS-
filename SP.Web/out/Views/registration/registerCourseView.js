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
import { RegisterCourseRow } from "./registerCourseRow";
import { CustomRenderer } from "../../customRenderer";
import { RegistrationModal } from "./registrationModal";
export class RegisterCourseView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            this._vm.getSpecializations();
            yield this._vm.getMountedCourses();
            yield this._vm.getFeeStatement();
            this._vm.setTotalCreditCommand.add(() => {
                document.getElementById("totalCredit").innerHTML = "Total Credit: " + this._vm.selectedCourses.map(x => parseInt(x.credit)).reduce((a, b) => a + b, 0).toString();
            });
            this._vm.selectedCourseCommand.add(() => {
                CustomRenderer.renderElements("courseList", this._vm.courseList.map(x => new RegisterCourseRow(this._vm).create(x)));
            });
            this._vm.courseRegisteredCommand.add(() => {
                CustomRenderer.render("courseList", createElement("tr", null));
            });
        });
    }
    render(elementId) {
        let courseRow = this._vm.courseList.map(x => new RegisterCourseRow(this._vm).create(x));
        let courseTrailRow = this._vm.trailList.map(x => new RegisterCourseRow(this._vm).createTrail(x));
        let totalCredit = "Total Credit: " + this._vm.selectedCourses.map(x => parseInt(x.credit)).reduce((a, b) => a + b, 0).toString();
        var registerCourseView = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Register Courses"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row sp-row-col0-1-1-1" },
                        createElement("button", { class: "sp-btn sp-btn-primary btn-small", id: "submit" }, "Submit")),
                    createElement("div", { class: "horizontal" },
                        createElement("table", { class: "table table-hoverable" },
                            createElement("thead", null,
                                createElement("th", null, "Courses"),
                                createElement("th", null, "Lecturer"),
                                createElement("th", null, "Category"),
                                createElement("th", null, "Select")),
                            createElement("tbody", { id: "courseList" }, courseRow),
                            createElement("tr", null),
                            createElement("tr", { style: "color: #292121;font-weight: bold;font-size: 13px;font-family: emoji;" }, "TRAILS"),
                            createElement("tr", null),
                            createElement("tbody", { id: "courseTrailList" }, courseTrailRow)),
                        createElement("span", { id: "totalCredit" }, totalCredit))))));
        let submit = registerCourseView.getElementsByTagName("button")[0];
        submit.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            yield this._vm.register();
        }));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(registerCourseView);
        if (this._vm.courseList.length === 0) {
            new RegistrationModal(this._vm).render("route-outlet");
        }
    }
}
//# sourceMappingURL=registerCourseView.js.map