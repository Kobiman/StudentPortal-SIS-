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
export class examsListView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            let temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "mc-row" },
                    createElement("h1", null, "Examination List"),
                    createElement("div", { class: "search-details" },
                        createElement("input", { type: "text", name: "answer", required: true, placeholder: "search here.", class: "searchTerm", onkeyup: () => {
                                tableSearch();
                                CustomRenderer.renderElements("examsListBody", new ExamsListTableRow(this._vm).create());
                            }, id: "searchByCCode" })),
                    createElement("div", { class: "mountcourses-form" },
                        createElement("div", { class: "exams-list-filter" },
                            createElement("div", { class: "", id: "examsListFilter" },
                                createElement("select", { filters: true },
                                    createElement("option", { value: "" }, "ACADEMIC YEAR"),
                                    this._vm.getAcademicYear().map((x) => (createElement("option", { value: x.name }, x.name))))),
                            createElement("div", { id: "examsListFilter" },
                                createElement("select", { filters: true },
                                    createElement("option", { value: "" }, "SEMESTER"),
                                    this._vm.getSemester().map((x) => (createElement("option", { value: x.name }, x.name))))),
                            createElement("div", null,
                                createElement("button", { class: "sp-btn sp-btn-default ", id: "submit", onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                        debugger;
                                        evt.preventDefault();
                                        const element = document.querySelectorAll("[filters]");
                                        let academicYear = element[0].value;
                                        let semester = element[1].value;
                                        yield this._vm.getExamsList(academicYear, semester);
                                        CustomRenderer.renderElements("examsListBody", new ExamsListTableRow(this._vm).create());
                                    }) }, "Submit")))),
                    createElement("div", null,
                        createElement("div", { class: "exam-horizontal" },
                            createElement("table", { class: "table css-serial", id: "examView" },
                                createElement("thead", null,
                                    createElement("tr", null,
                                        createElement("th", null, "No."),
                                        createElement("th", null, "Download"),
                                        createElement("th", null, "Code"),
                                        createElement("th", null, "Title"),
                                        createElement("th", null, "Prog of Study"),
                                        createElement("th", null, "Level"),
                                        createElement("th", null, "Semester"))),
                                createElement("tbody", { id: "examsListBody" })))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
            function tableSearch() {
                debugger;
                let input, filter, table, tr, td, txtValue;
                input = document.getElementById("searchByCCode");
                filter = input.value.toUpperCase();
                table = document.getElementById("examView");
                tr = table.querySelectorAll("tr");
                for (let i = 0; i < tr.length; ++i) {
                    td = tr[i].getElementsByTagName("td");
                    tr[i].style.display = "none";
                    for (let j = 0; j < td.length; j++) {
                        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                        }
                    }
                }
            }
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
;
// addClickEvent(){
//     let showModal = async (evt: Event) => {
//         evt.preventDefault();
//         let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
//         const cCode = row.cells[2].innerText;
//         this._vm.cCode = cCode;
//       };
//     const elements = document.querySelectorAll("[button]");
//       elements.forEach(function (element) {
//       (element as HTMLElement).onclick = showModal;
//       });
// }
export class ExamsListTableRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    create() {
        return this._vm.courses.map((x) => (createElement("tr", null,
            createElement("td", null),
            createElement("td", null,
                createElement("button", { class: "sp-btn sp-btn-default btn-small", style: "border: none;margin-left: -28px;background: transparent;", title: "click to download", button: true, onClick: (evt) => {
                        evt.preventDefault();
                        let row = evt.target
                            .parentElement
                            .parentElement;
                        const cCode = row.cells[2].innerText;
                        this._vm.generateExamsList(cCode);
                    } },
                    createElement("i", { class: "fas fa-file-pdf", style: "margin-right:5px; color:red" }),
                    "PDF")),
            createElement("td", null, x.courseCode),
            createElement("td", null, x.courseTitle),
            createElement("td", null, x.program),
            createElement("td", null, x.level),
            createElement("td", null, x.semester))));
    }
}
//# sourceMappingURL=examsList.js.map