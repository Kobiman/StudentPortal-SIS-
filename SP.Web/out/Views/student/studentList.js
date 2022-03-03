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
import { _ } from "../../group";
import { CustomRenderer } from "../../customRenderer";
import { StudentDetails } from "./studentDetails";
export class StudentListView {
    constructor(_vm) {
        this._vm = _vm;
        this.addClickEvent = () => __awaiter(this, void 0, void 0, function* () {
            let showStudent = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target
                    .parentElement;
                const indexNumber = row.cells[1].innerText;
                this._vm.indexNumber = indexNumber;
                this._vm.getStudent();
                CustomRenderer.render("studentDetails", new StudentDetails(this._vm).render());
            });
            const elements = document.querySelectorAll("td");
            elements.forEach(function (element) {
                element.onclick = showStudent;
            });
        });
        this._vm.updateStudentListCommand.add(() => {
            CustomRenderer.renderElements("students", new StudentListTr(this._vm).create());
            this.addClickEvent();
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getStudents();
            yield this._vm.getStudent();
        });
    }
    render(elementId) {
        var _a, _b;
        this._vm.student.dateOfEntry = ((_a = this._vm.student) === null || _a === void 0 ? void 0 : _a.dateOfEntry)
            .split(",")[0]
            .replaceAll("/", "-");
        this._vm.student.dateofBirth = ((_b = this._vm.student) === null || _b === void 0 ? void 0 : _b.dateofBirth)
            .split(",")[0]
            .replaceAll("/", "-");
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Student List"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "search-student" },
                        createElement("input", { type: "text", name: "answer", required: true, placeholder: "SEARCH BY INDEX NUMBER OR NAME .", autofocus: true, class: "searchTerm", onkeyup: () => {
                                tableSearch();
                            }, id: "searchByIndexNumber" }))),
                createElement("div", { class: "" },
                    createElement("table", { class: "table-hd", id: "studentListHead" },
                        createElement("thead", null,
                            createElement("tr", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Index Number"),
                                createElement("th", null, "Reference No."),
                                createElement("th", null, "Surname"),
                                createElement("th", null, "Othernames"),
                                createElement("th", null, "Level"),
                                createElement("th", null, "Program"),
                                createElement("th", null, "Gender"),
                                createElement("th", null, "Date of Birth")))),
                    createElement("div", { class: "horizontal-edit", id: "v-scroll" },
                        createElement("table", { class: "table css-serial", id: "studentList" },
                            createElement("thead", { hidden: true },
                                createElement("tr", null,
                                    createElement("th", null, "No."),
                                    createElement("th", null, "Index Number"),
                                    createElement("th", null, "Reference No."),
                                    createElement("th", null, "Surname"),
                                    createElement("th", null, "Othernames"),
                                    createElement("th", null, "Level"),
                                    createElement("th", null, "Program"),
                                    createElement("th", null, "Gender"),
                                    createElement("th", null, "Date of Birth"))),
                            createElement("tbody", { id: "students", "data-repeat": "students" }, new StudentListTr(this._vm).create()))),
                    createElement("div", { id: "studentDetails" }, new StudentDetails(this._vm).render())))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this.addClickEvent();
        let scroller = document.getElementById("v-scroll");
        scroller.onscroll = (evt) => {
            var scrollTop = evt.target.scrollTop;
            var maxScroll = scroller.getBoundingClientRect().height;
            this._vm.onScroll(scrollTop, maxScroll);
        };
        document.getElementById("surname").onkeyup = (evt) => {
            evt.preventDefault();
            this._vm.student.surname = evt.target.value;
        };
        _.syncTable("studentListHead", "studentList");
        function tableSearch() {
            let input, filter, table, tr, td, txtValue;
            input = document.getElementById("searchByIndexNumber");
            filter = input.value.toUpperCase();
            table = document.getElementById("students");
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
    }
}
export class StudentListTr {
    constructor(_vm) {
        this._vm = _vm;
    }
    create() {
        return this._vm.students.map((x) => (createElement("tr", null,
            createElement("td", { width: "5.1%" }),
            createElement("td", { width: "15.7%" }, x.indexNumber),
            createElement("td", { width: "15.3%" }, x.referenceNumber),
            createElement("td", { width: "10.5%" }, x.surname.toUpperCase()),
            createElement("td", { width: "13.7%" }, x.othernames.toUpperCase()),
            createElement("td", { width: "6.9%" }, x.level.toUpperCase()),
            createElement("td", { width: "10.5%" }, x.programId),
            createElement("td", { width: "9%" }, x.gender === "M" ? "MALE" : "FEMALE"),
            createElement("td", null, x.dateofBirth.split("/")))));
    }
}
//# sourceMappingURL=studentList.js.map