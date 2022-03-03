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
export class ResultsSummaryView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    render(elementId) {
        let temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "ACADEMIC BOARD FORMAT "),
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
                        createElement("button", { class: "sp-btn sp-btn-default ", id: "submit" }, "VIEW"),
                        createElement("button", { class: "sp-btn sp-btn-default ", id: "download", onClick: () => {
                                const elements = document.querySelectorAll("[filter]");
                                const academicYear = elements[0].value;
                                const program = elements[1].value;
                                const level = elements[2].value;
                                const semester = elements[3].value;
                                this._vm.generateSummarySheet(academicYear, program, level, semester);
                            } }, "GET SHEET"),
                        createElement("button", { class: "sp-btn sp-btn-primary" }, "APPROVE")),
                    createElement("p", { id: "summaryCaption" }, "Summary"),
                    createElement("table", { id: "summmaryTable", class: "table", style: "font-weight: normal; font-size:10px;" },
                        createElement("thead", { id: "stableHead", class: "table" },
                            createElement("tr", null,
                                createElement("th", null, "PASS"),
                                createElement("th", null, "TRAIL"),
                                createElement("th", null, "PROBATION"),
                                createElement("th", null, "WITHDRAWN"),
                                createElement("th", null, "DEFERED"),
                                createElement("th", null, "SUSPENDED"),
                                createElement("th", null, "TOTAL"))),
                        createElement("tbody", { id: "stableBody" }, this._vm.summary.map((x) => (createElement("tr", null,
                            createElement("td", null, x.pass),
                            createElement("td", null, x.trail),
                            createElement("td", null, x.probation),
                            createElement("td", null, x.withdrawn),
                            createElement("td", null, x.defered),
                            createElement("td", null, x.suspended),
                            createElement("td", null, x.total)))))),
                    createElement("div", { class: "abf-horizontal" },
                        createElement("table", { id: "summmaryDetailsTable", class: "table", style: "font-weight: normal; font-size:10px;" },
                            createElement("thead", { id: "tableHead", class: "table" }),
                            createElement("tbody", { id: "tableBody" })))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        let getCourses = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const elements = document.querySelectorAll("[filter]");
            const academicYear = elements[0].value;
            const program = elements[1].value;
            const level = elements[2].value;
            const semester = elements[3].value;
            this._vm.getStudentResults(program, academicYear, level, semester);
        });
        document.getElementById("submit").onclick = getCourses;
    }
}
//# sourceMappingURL=resultsSummary.js.map