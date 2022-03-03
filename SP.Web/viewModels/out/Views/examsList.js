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
                            }, id: "searchByCCode" })),
                    createElement("div", { class: "mountcourses-form" },
                        createElement("div", null,
                            createElement("table", { class: "table-hd", id: "examViewHead" },
                                createElement("thead", null,
                                    createElement("th", null, "No."),
                                    createElement("th", null, "Download"),
                                    createElement("th", null, "Code"),
                                    createElement("th", null, "Title"),
                                    createElement("th", null, "Prog of Study"),
                                    createElement("th", null, "Level"),
                                    createElement("th", null, "Semester"))),
                            createElement("div", { class: "horizontal" },
                                createElement("table", { class: "table css-serial", id: "examsView" },
                                    createElement("thead", { class: "table", hidden: true },
                                        createElement("tr", null,
                                            createElement("th", null, "No."),
                                            createElement("th", null, "Download"),
                                            createElement("th", null, "Code"),
                                            createElement("th", null, "Title"),
                                            createElement("th", null, "Prog of Study"),
                                            createElement("th", null, "Level"),
                                            createElement("th", null, "Semester"))),
                                    createElement("tbody", { id: "schools" }, createElement("tr", null,
                                        createElement("td", null),
                                        createElement("td", null, ""),
                                        createElement("td", null, ""),
                                        createElement("td", null, ""),
                                        createElement("td", null, ""),
                                        createElement("td", null,
                                            createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => {
                                                    evt.preventDefault();
                                                    let row = evt.target.parentElement.parentElement;
                                                    const cCode = row.cells[2].innerText;
                                                    this._vm.generateExamsList(cCode);
                                                } },
                                                createElement("i", { class: 'fas fa-file-pdf' }),
                                                "PDF"))))),
                                createElement("table", { class: "table css-serial", id: "attendance", hidden: true },
                                    createElement("thead", { class: "table" },
                                        createElement("tr", null,
                                            createElement("th", null, "No."),
                                            createElement("th", null, "Exams ID"),
                                            createElement("th", null, "Student Name"),
                                            createElement("th", null, "Type"),
                                            createElement("th", null, "Status"),
                                            createElement("th", null, "Signature"))),
                                    createElement("tbody", null))))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
            _.syncTable("examViewHead", "examView");
            function tableSearch() {
                let input, filter, table, tr, td, txtValue;
                input = document.getElementById("searchByName");
                filter = input.value.toUpperCase();
                table = document.getElementById("lecturers");
                tr = table.querySelectorAll("tr");
                for (let i = 0; i < tr.length; ++i) {
                    td = tr[i].cells[1];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            tr[i].style.display = "";
                        }
                        else {
                            tr[i].style.display = "none";
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
//# sourceMappingURL=examsList.js.map