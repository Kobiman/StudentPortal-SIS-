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
import { SchoolModal } from "./schoolModal";
import { _ } from "../group";
import { SchoolTableRow } from "./schoolStatisticsView";
import { School } from "../models/school";
export class SchoolView {
    constructor(_vm) {
        this._vm = _vm;
        this.addClickEvent = () => __awaiter(this, void 0, void 0, function* () {
            let showStudent = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target.parentElement;
                const name = row.cells[1].innerText;
                this._vm.schoolName = name;
                yield this._vm.getSchoolEditDetails();
                document.getElementById("name").value = this._vm.school.name;
                document.getElementById("dean").value = this._vm.lecturerName;
                document.getElementById("academicYear").value = this._vm.school.academicYear;
                document.getElementById("semester").value = this._vm.school.semester;
                document.getElementById("generateHead").style.visibility = "visible";
                new SchoolTableRow(this._vm).render();
            });
            const elements = document.querySelectorAll("td");
            elements.forEach(function (element) {
                element.onclick = showStudent;
            });
        });
        this._vm.schoolUpdatedCommand.add(() => {
            document.getElementById(this._vm.school.schoolId).innerHTML = this._vm.school.name;
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getSchools();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "School List"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "addSchool" }, "Add")),
                    createElement("div", null,
                        createElement("table", { class: "table-hd", id: "schoolViewHead" },
                            createElement("thead", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Name"),
                                createElement("th", null, "Academic Year"),
                                createElement("th", null, "Semester"))),
                        createElement("div", { class: "horizontal" },
                            createElement("table", { class: "table css-serial", id: "schoolView" },
                                createElement("thead", { class: "table", hidden: true },
                                    createElement("tr", null,
                                        createElement("th", null, "No."),
                                        createElement("th", null, "Name"),
                                        createElement("th", null, "Academic Year"),
                                        createElement("th", null, "Semester"))),
                                createElement("tbody", { id: "schools" }, this._vm.schools.map(x => createElement("tr", null,
                                    createElement("td", null),
                                    createElement("td", { id: x.schoolId }, x.name),
                                    createElement("td", null, x.academicYear),
                                    createElement("td", null, x.semester)))))),
                        createElement("div", { class: "edit-content" },
                            createElement("div", { class: "profile-form" },
                                createElement("div", { class: "sp-row-col-2-2-2" },
                                    createElement("div", { class: "user-info" },
                                        createElement("h3", { class: "edit-info-headers" }, "School Details:"),
                                        createElement("div", { class: "dept-specific-table" },
                                            createElement("button", { value: "yes", onclick: (evt) => {
                                                    evt.preventDefault();
                                                    ;
                                                    this._vm.EnableTextBox();
                                                } },
                                                createElement("i", { class: "fas fa-edit" }),
                                                "Edit"),
                                            createElement("button", { id: "btnSave", style: "visibility:hidden", onclick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                                    evt.preventDefault();
                                                    this._vm.DisableTextBox();
                                                    yield this._vm.update();
                                                }) },
                                                " ",
                                                createElement("i", { class: "fas fa-save" }),
                                                "Save")),
                                        createElement("div", { class: "edit-profile-info" },
                                            createElement("p", null,
                                                createElement("label", null, "Name"),
                                                createElement("input", { id: "name", type: "text", class: "edit-text-field", disabled: "disabled", input: true })),
                                            createElement("p", null,
                                                createElement("label", null, "Dean of School"),
                                                createElement("input", { id: "dean", type: "text", class: "edit-text-field", style: "margin-bottom: 0px;", onKeyup: (evt) => __awaiter(this, void 0, void 0, function* () {
                                                        evt.preventDefault();
                                                        showLecturers(evt);
                                                    }), disabled: "disabled", input: true }),
                                                createElement("div", { class: "autocom-box2" },
                                                    createElement("ul", { id: "deanList" })),
                                                createElement("div", { errors: "assignedTo" })),
                                            createElement("p", null,
                                                createElement("label", null, "Academic Year"),
                                                createElement("select", { class: "edit-text-field", id: "academicYear", style: "height:37px; width: 101%;", disabled: "disabled", input: true },
                                                    createElement("option", { value: "" }, "Academic Year"),
                                                    this._vm.academicYears.map((x) => (createElement("option", { value: x.name }, x.name))),
                                                    " ")),
                                            createElement("p", null,
                                                createElement("label", null, "Semester"),
                                                createElement("select", { class: "edit-text-field", id: "semester", style: "height:37px; width: 101%;", disabled: "disabled", input: true },
                                                    createElement("option", { value: "" }, "Semester"),
                                                    this._vm.semesters.map((x) => (createElement("option", { value: x.name }, x.name))),
                                                    " "))),
                                        createElement("div", { class: "left-profile-edit" })),
                                    createElement("div", { clas: "profile-fields" },
                                        createElement("div", { class: "horizontal-edit-dept" },
                                            createElement("table", { class: "table edit-table" },
                                                createElement("thead", { id: "generateHead", style: "visibility:hidden" },
                                                    createElement("tr", null,
                                                        createElement("th", null, "No."),
                                                        createElement("th", null, "Department Name"),
                                                        createElement("th", null, "No. of Stds"),
                                                        createElement("th", null, "Male Number"),
                                                        createElement("th", null, "Female Number"),
                                                        createElement("th", null, "Download"))),
                                                createElement("tbody", { id: "statistics" }))))))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this.addClickEvent();
        _.syncTable("schoolViewHead", "schoolView");
        document.getElementById("name").onkeyup = (evt) => {
            evt.preventDefault();
            this._vm.school.name = evt.target.value;
        };
        document.getElementById("academicYear").onchange = (evt) => {
            evt.preventDefault();
            this._vm.school.academicYear = evt.target.value;
        };
        document.getElementById("semester").onchange = (evt) => {
            evt.preventDefault();
            this._vm.school.semester = evt.target.value;
            debugger;
        };
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            this._vm.school = new School();
            this._vm.bind();
            new SchoolModal(this._vm).render("route-outlet");
        });
        let showLecturers = (evt) => __awaiter(this, void 0, void 0, function* () {
            let textbox = evt.target;
            let lecturers = [];
            if (textbox.value !== '') {
                lecturers = yield this._vm.getLecturer(textbox.value);
            }
            let suggestions = document.getElementById("deanList");
            suggestions.textContent = '';
            for (var l of lecturers) {
                let li = createElement("li", null, l.name);
                li.onclick = () => {
                    textbox.value = li.innerHTML.trim();
                    this._vm.lecturerName = textbox.value;
                    suggestions.textContent = '';
                    this._vm.school.lecturerId = lecturers.find((x) => x.name === li.innerHTML.trim()).lecturerId;
                };
                suggestions.appendChild(li);
            }
        });
        this._vm.bind();
        document.getElementById("addSchool").onclick = showModal;
    }
}
//# sourceMappingURL=schoolView.js.map