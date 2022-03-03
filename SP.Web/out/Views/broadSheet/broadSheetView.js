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
import { BroadSheetTableRow } from "./broadSheetTableRow";
export class BroadSheetView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    render(elementId) {
        let academicYear;
        let program;
        let level;
        let semester;
        let temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "BroadSheets "),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-row-col-5-5" },
                        createElement("select", { id: "academicYear", binding: "Object.academicYear", filter: true },
                            createElement("option", { value: "" }, "Academic Year"),
                            this._vm.academicYear.map((x) => (createElement("option", { value: x.name }, x.name))),
                            " "),
                        createElement("select", { id: "programs", binding: "", value: this._vm.mountedCourse.program, filter: true },
                            createElement("option", { value: "" }, "Programs"),
                            this._vm.getPrograms().map((x) => (createElement("option", { value: x.programId }, x.name)))),
                        createElement("select", { id: "level", binding: "Object.level", filter: true },
                            createElement("option", { value: "" }, "Please Select Level"),
                            this._vm.levels.map((x) => (createElement("option", { value: x.name }, x.name))),
                            " "),
                        createElement("select", { id: "semester", binding: "Object.semester", filter: true },
                            createElement("option", { value: "" }, "Please Select Semester"),
                            this._vm.semesters.map((x) => (createElement("option", { value: x.name }, x.name))),
                            " ")),
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { class: "sp-btn sp-btn-primary", id: "approvebtn", style: "visibility:hidden", onClick: () => {
                                this._vm.approveResultsByHoD();
                                document.getElementById("approvebtn").style.visibility =
                                    "hidden";
                            } }, "APPROVE"),
                        createElement("button", { class: "sp-btn sp-btn-default", id: "submit" }, "VIEW"),
                        createElement("button", { class: "sp-btn sp-btn-default ", id: "download", onClick: () => {
                                this._vm.generateBroadSheet(academicYear, program, level, semester);
                            } }, "DOWNLOAD")),
                    createElement("div", { class: "check" },
                        createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 10px; width:20%;" },
                            "Show Marks",
                            createElement("input", { id: "checkme", type: "checkbox", name: "checkbox", onChange: (evt) => {
                                    evt.preventDefault();
                                    const checked = evt.target.checked;
                                    this._vm.showMarks(checked);
                                    new BroadSheetTableRow(this._vm, checked).render();
                                } }),
                            createElement("span", { class: "checkmark" }))),
                    createElement("div", { class: "horizontal2" },
                        createElement("table", { id: "approveTable", class: "table", style: "font-weight: normal; font-size:10px;" },
                            createElement("thead", { id: "generateHead", class: "table" }),
                            createElement("tbody", { id: "results1", "data-repeat": "" })))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        let getCourses = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const elements = document.querySelectorAll("[filter]");
            academicYear = elements[0].value;
            program = elements[1].value;
            level = elements[2].value;
            semester = elements[3].value;
            // setFilters;
            this._vm.getStudentResults(program, academicYear, level, semester);
            debugger;
            document.getElementById("approvebtn").style.visibility = "visible";
        });
        document.getElementById("submit").onclick = getCourses;
    }
}
//# sourceMappingURL=broadSheetView.js.map