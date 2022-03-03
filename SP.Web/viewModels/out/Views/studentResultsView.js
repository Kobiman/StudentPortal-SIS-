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
import { _ } from "../group";
export class StudentResultsView {
    constructor(_vm) {
        this._vm = _vm;
        this._vm.resultChangedCommand.add(() => {
            let tr = document.getElementById("results");
            tr.textContent = "";
            for (var x of this._vm.results) {
                tr.appendChild(createElement("tr", null,
                    createElement("td", { binding: "academicYear" }, x.academicYear),
                    createElement("td", { binding: "courseCode" }, x.courseCode),
                    createElement("td", { binding: "courseName" }, x.courseName),
                    createElement("td", { binding: "credit", width: "100px" }, x.credit),
                    createElement("td", { binding: "classMark", width: "60px" }, x.classMark),
                    createElement("td", { binding: "examMark" }, x.examMark),
                    createElement("td", { binding: "totalMark" }, x.totalMark),
                    createElement("td", { binding: "grade" }, x.grade),
                    createElement("td", { binding: "gradePoint" }, x.gradePoint),
                    createElement("td", { binding: "level" }, x.level)));
            }
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
                createElement("h1", null, "Students Results "),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-row-col-3-5" },
                        createElement("select", { id: "level", binding: "Object.level", filter: true },
                            createElement("option", { value: "" }, "Please Select Level"),
                            this._vm.levels.map((x) => (createElement("option", { value: x.name }, x.name))),
                            " "),
                        createElement("select", { id: "semester", binding: "Object.semester", filter: true },
                            createElement("option", { value: "" }, "Please Select Semester"),
                            this._vm.semesters.map((x) => (createElement("option", { value: x.name }, x.name))),
                            " "),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-primary ", id: "download", onClick: () => {
                                    const elements = document.querySelectorAll("[filter]");
                                    const level = elements[0].value;
                                    const semester = elements[1].value;
                                    this._vm.generateResultsPDF();
                                } }, "DOWNLOAD"))),
                    createElement("div", { class: "main-container" },
                        createElement("div", { class: "GPA-card", id: "sem-gpa" },
                            createElement("div", { class: "GPA-container" },
                                createElement("p", null,
                                    "Semester GPA: ",
                                    createElement("span", { id: "totalGPA" })))),
                        createElement("div", { class: "GPA-card", id: "total-hours" },
                            createElement("div", { class: "GPA-container" },
                                createElement("p", null,
                                    "Semester Credit: ",
                                    createElement("span", { id: "totalCredit" })))),
                        createElement("div", { class: "GPA-card", id: "cum-gpa" },
                            createElement("div", { class: "GPA-container" },
                                createElement("p", null,
                                    "Cummulative GPA: ",
                                    createElement("span", { id: "cummulativeGPA" }),
                                    " "))),
                        createElement("div", { class: "GPA-card", id: "total-credit" },
                            createElement("div", { class: "GPA-container" },
                                createElement("p", null,
                                    "Total Credit: ",
                                    createElement("span", { id: "cummulativeCredit" }),
                                    " ")))),
                    createElement("table", { class: "table-hd", id: "resultsTableHead" },
                        createElement("thead", null,
                            createElement("th", null, "Academic Year"),
                            createElement("th", null, "CourseCode"),
                            createElement("th", null, "CourseTitle"),
                            createElement("th", null, "Credit"),
                            createElement("th", null, "CA"),
                            createElement("th", null, "Exam"),
                            createElement("th", null, "Total"),
                            createElement("th", null, "Grade"),
                            createElement("th", null, "GP"),
                            createElement("th", null, "Level"))),
                    createElement("div", { class: "horizontal2" },
                        createElement("table", { class: "table", id: "resultsTable" },
                            createElement("thead", { class: "table", hidden: true },
                                createElement("tr", null,
                                    createElement("th", null, "Academic Year"),
                                    createElement("th", null, "CourseCode"),
                                    createElement("th", null, "CourseTitle"),
                                    createElement("th", null, "Credit"),
                                    createElement("th", null, "CA"),
                                    createElement("th", null, "Exam"),
                                    createElement("th", null, "Total"),
                                    createElement("th", null, "Grade"),
                                    createElement("th", null, "GP"),
                                    createElement("th", null, "Level"))),
                            createElement("tbody", { id: "results", "data-repeat": "results" }, this._vm.results.map(x => createElement("tr", null,
                                createElement("td", null, x.academicYear),
                                createElement("td", null, x.courseCode),
                                createElement("td", null, x.courseName),
                                createElement("td", { width: "100px" }, x.credit),
                                createElement("td", { width: "60px" }, x.classMark),
                                createElement("td", null, x.examMark),
                                createElement("td", null, x.totalMark),
                                createElement("td", null, x.grade),
                                createElement("td", null, x.gradePoint),
                                createElement("td", null, x.level))))))))));
        let levelChanged = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const innerTable = document.getElementById("results");
            innerTable.textContent = "";
            innerTable.appendChild(createElement("tr", null,
                createElement("td", { binding: "academicYear" }),
                createElement("td", { binding: "courseCode" }),
                createElement("td", { binding: "courseName" }),
                createElement("td", { binding: "credit" }),
                createElement("td", { binding: "classMark" }),
                createElement("td", { binding: "examMark" }),
                createElement("td", { binding: "totalMark" }),
                createElement("td", { binding: "grade" }),
                createElement("td", { binding: "gradePoint" }),
                createElement("td", { binding: "level" })));
            const value = evt.target.value;
            this._vm.buidQuery("level", value);
            document.getElementById("totalCredit").textContent = this._vm.totalCredit;
            document.getElementById("totalGPA").textContent = this._vm.totalGPA;
        });
        let semesterChanged = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const innerTable = document.getElementById("results");
            innerTable.textContent = "";
            innerTable.appendChild(createElement("tr", null,
                createElement("td", { binding: "academicYear" }),
                createElement("td", { binding: "courseCode" }),
                createElement("td", { binding: "courseName" }),
                createElement("td", { binding: "credit" }),
                createElement("td", { binding: "classMark" }),
                createElement("td", { binding: "examMark" }),
                createElement("td", { binding: "totalMark" }),
                createElement("td", { binding: "grade" }),
                createElement("td", { binding: "gradePoint" }),
                createElement("td", { binding: "level" })));
            const value = evt.target.value;
            this._vm.buidQuery("semester", value.toUpperCase());
            document.getElementById("totalCredit").textContent = this._vm.totalCredit;
            document.getElementById("totalGPA").textContent = this._vm.totalGPA;
        });
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        _.syncTable("resultsTableHead", "resultsTable");
        document.getElementById("level").onchange = levelChanged;
        document.getElementById("semester").onchange = semesterChanged;
        document.getElementById("cummulativeGPA").textContent = this._vm.cummulativeGPA;
        document.getElementById("cummulativeCredit").textContent = this._vm.cummulativeCredit;
    }
}
//# sourceMappingURL=studentResultsView.js.map