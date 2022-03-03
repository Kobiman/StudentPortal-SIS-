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
export class ApproveRegistrationView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Approve Registration "),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-row-col-2-5" },
                        createElement("select", { id: "programs", binding: "SelectedCourse.program", value: this._vm.mountedCourse.program, filter: true },
                            createElement("option", { value: "" }, "Programs"),
                            this._vm.getPrograms().map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "level", binding: "Object.level", filter: true },
                            createElement("option", { value: "" }, "Please Select Level"),
                            this._vm.levels.map((x) => (createElement("option", { value: x.name }, x.name))),
                            " "),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default ", id: "view-list" }, "View"))),
                    createElement("div", { class: "horizontal" },
                        createElement("table", { id: "approveTable", class: "table table-hoverable" },
                            createElement("thead", { class: "table" },
                                createElement("th", null, "Index Number"),
                                createElement("th", null, "Level"),
                                createElement("th", null, "Total Courses "),
                                createElement("th", null, "Total Credit"),
                                createElement("th", null, "Pending Trails"),
                                createElement("th", null, "View Registration"),
                                createElement("th", null,
                                    createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px; width: 40%; display: inline-grid;" },
                                        createElement("input", { id: "checkme", type: "checkbox", name: "checkbox", onChange: (evt) => {
                                                evt.preventDefault();
                                                const checked = evt.target.checked;
                                                this._vm.unChecked(checked);
                                                this._vm.aproveAllRegistration();
                                            } }),
                                        "Approve All",
                                        createElement("span", { class: "checkmark" })))),
                            createElement("tbody", { id: "results", "data-repeat": "temporalRegistrationList" })))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        let getCourses = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const elements = document.querySelectorAll("[filter]");
            const program = elements[0].value;
            const level = elements[1].value;
            yield this._vm.getStudentRegistration(program, level);
        });
        document.getElementById("view-list").onclick = getCourses;
    }
}
//# sourceMappingURL=approveRegistrationView.js.map