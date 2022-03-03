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
import { CustomRenderer } from "../customRenderer";
import { HtmlSelect } from "./HtmlSelect";
//import { AssignedCoursesVm } from "../views/authorizeResultVm";
export class authorizeResultView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => __awaiter(this, void 0, void 0, function* () {
            let temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "mc-row" },
                    createElement("h1", null, "Authorize Result"),
                    createElement("div", { class: "mountcourses-form" },
                        createElement("div", { class: "sp-row-col-5-7" },
                            createElement("select", { id: "schools" },
                                createElement("option", { binding: "name" }, "Please Select School"),
                                (yield this._vm.getSchools()).map((x) => (createElement("option", { value: x.name }, x.name)))),
                            createElement("select", { value: this._vm.mountedCourse.department, onChange: (evt) => {
                                    this._vm.getProgramsByDepartment(evt.target.value);
                                } },
                                createElement("option", null, "Please Select Department"),
                                this._vm.getDepartments().map((x) => (createElement("option", { value: x.departmentId }, x.name)))),
                            createElement("span", { id: "program" }, HtmlSelect.create(this._vm.mountedCourse.program, createElement("option", null, "Please Select Program"), "")),
                            createElement("select", null,
                                createElement("option", null, "Please Select Level"),
                                this._vm.getLevels().map((x) => (createElement("option", { value: x.name }, x.name)))),
                            createElement("select", null,
                                createElement("option", { value: "" }, "Please Select Academic Year"),
                                this._vm.getAcademicYear().map((x) => (createElement("option", { value: x.name }, x.name)))),
                            createElement("select", null,
                                createElement("option", { value: "" }, "Please Select Semeter "),
                                this._vm.getSemester().map((x) => (createElement("option", { value: x.name }, x.name)))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-default ", id: "submit" }, "Submit")),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-primary ", id: "download", onClick: () => {
                                    } }, "Approve")))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
        });
        this._vm.programUpdatedCommand.add(() => {
            let elem = HtmlSelect.create(this._vm.mountedCourse.program, this._vm.programs.map(x => createElement("option", { value: x.name }, x.name)), "", "Please Select Program");
            elem.onchange = (evt) => {
                evt.preventDefault();
                this._vm.mountedCourse.program = evt.target.value;
            };
            CustomRenderer.render("program", elem);
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=authorizeResultView.js.map