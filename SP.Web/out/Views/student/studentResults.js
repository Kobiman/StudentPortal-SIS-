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
import { CustomRenderer } from "../../customRenderer";
export class StudentResultsView {
    constructor(_vm) {
        this._vm = _vm;
        this._vm.resultChangedCommand.add(() => {
            CustomRenderer.renderElements("results", new ResultsRow(this._vm).create());
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getStudentResults();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Students Results"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { class: "sp-btn sp-btn-primary ", id: "download", style: "float:right", onClick: () => {
                                this._vm.generateResultsPDF();
                            } }, "DOWNLOAD"))),
                createElement("div", null,
                    createElement("div", { class: "results-horizontal" },
                        createElement("table", { class: "table" },
                            createElement("thead", null,
                                createElement("th", { colspan: "2" }, "Level"),
                                createElement("th", { colspan: "2" }, "Semester"),
                                createElement("th", { colspan: "1" }, "GPA"),
                                createElement("th", { colspan: "1" },
                                    "CuGPA: ",
                                    createElement("span", { id: "cummulativeGPA" })),
                                createElement("th", { colspan: "1" }, "Crd"),
                                createElement("th", { colspan: "1" },
                                    "CCrd: ",
                                    createElement("span", { id: "cummulativeCredit" }))),
                            createElement("tbody", { id: "results" }, new ResultsRow(this._vm).create())))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        document.getElementById("cummulativeGPA").textContent = this._vm.cummulativeGPA;
        document.getElementById("cummulativeCredit").textContent = this._vm.cummulativeCredit;
    }
}
export class ResultsRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    createRows() {
        let rows = [];
        for (var result of this._vm.groupedResults) {
            let row = createElement("tr", null,
                createElement("td", { colspan: "2" }, result.level),
                createElement("td", { colspan: "2" }, result.semester),
                createElement("td", { colspan: "1" }, result.gpa),
                createElement("td", { colspan: "1" }, result.cugpa),
                createElement("td", { colspan: "1" }, result.credit),
                createElement("td", { colspan: "1" }, result.cuCredit));
            rows.push(row);
            rows.push(this.createHeader(result.results));
            rows.push(createElement("tr", null,
                createElement("td", { colspan: "4" })));
            rows.push(createElement("tr", null,
                createElement("td", { colspan: "4" })));
        }
        return rows;
    }
    createHeader(results) {
        return createElement("tr", null,
            createElement("td", { colspan: "8" },
                createElement("table", { class: "table", onMouseOver: "this.style.background='#fff';", style: "width:100%;" },
                    createElement("thead", { style: "background:#f6f6f6;" },
                        createElement("tr", null,
                            createElement("td", { width: "10%" }, "CourseCode"),
                            createElement("td", { width: "50%" }, "CourseTitle"),
                            createElement("td", null, "Credit"),
                            createElement("td", null, "Total"),
                            createElement("td", null, "Grade"),
                            createElement("td", null, "GP"))),
                    createElement("tbody", null, results.map(x => createElement("tr", { onMouseOver: "this.style.background='#fff';" },
                        createElement("td", null, x.courseCode),
                        createElement("td", null, x.courseName),
                        createElement("td", null, x.credit),
                        createElement("td", null, x.totalMark),
                        createElement("td", null, x.grade),
                        createElement("td", null, x.gradePoint)))))));
    }
    create() {
        return this.createRows();
    }
}
//# sourceMappingURL=studentResults.js.map