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
import { CourseModal } from "./courseModal";
import { _ } from "../../group";
export class CourseView {
    constructor(_vm) {
        this._vm = _vm;
        this.addClickEvent = () => __awaiter(this, void 0, void 0, function* () {
            let showStudent = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target
                    .parentElement;
                const code = row.cells[1].innerText;
                this._vm.courseCode = code;
                yield this._vm.getDetails();
                document.getElementById("code").value =
                    this._vm.course.code;
                document.getElementById("name").value =
                    this._vm.course.courseName;
                document.getElementById("credit").value =
                    this._vm.course.credit.toString();
                document.getElementById("department").value =
                    this._vm.course.department;
                document.getElementById("code1").textContent =
                    this._vm.course.code;
                document.getElementById("name1").textContent =
                    this._vm.course.courseName;
                document.getElementById("credit1").textContent =
                    this._vm.course.credit.toString();
                document.getElementById("department1").textContent =
                    this._vm.course.department;
            });
            const elements = document.querySelectorAll("td");
            elements.forEach(function (element) {
                element.onclick = showStudent;
            });
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            this._vm.updateCourseCommand.add(() => {
                var doc = document.getElementById("courses");
                doc.textContent = "";
                this._vm.courses.map((x) => (createElement("tr", null,
                    createElement("td", null),
                    createElement("td", null, x.code),
                    createElement("td", null, x.courseName),
                    createElement("td", { width: "7%" }, x.credit))));
            });
            yield this._vm.getCourses();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Course List"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "course-header" },
                        createElement("input", { type: "text", name: "answer", required: true, placeholder: "SEARCH BY COURSE.", class: "searchTerm", onkeyup: () => {
                                tableSearch();
                            }, id: "searchByLectName" }),
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "addCourse" }, "Add"))),
                createElement("div", null,
                    createElement("div", null,
                        createElement("table", { class: "table-hd", id: "courseViewHead" },
                            createElement("thead", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Code"),
                                createElement("th", null, "Name"),
                                createElement("th", null, "Credit")))),
                    createElement("div", { class: "horizontal-edit" },
                        createElement("table", { class: "table css-serial", id: "courseView" },
                            createElement("thead", { hidden: true },
                                createElement("tr", null,
                                    createElement("th", null, "No."),
                                    createElement("th", null, "Code"),
                                    createElement("th", null, "Name"),
                                    createElement("th", null, "Credit"))),
                            createElement("tbody", { id: "courses", "data-repeat": "courses" }, this._vm.courses.map((x) => (createElement("tr", null,
                                createElement("td", null),
                                createElement("td", null, x.code),
                                createElement("td", null, x.courseName),
                                createElement("td", { width: "7%" }, x.credit))))))),
                    createElement("div", { class: "edit-content" },
                        createElement("div", { class: "profile-form" },
                            createElement("div", { class: "sp-row-col-2-2-2" },
                                createElement("div", { class: "user-info" },
                                    createElement("h3", { class: "edit-info-headers" }, "Cousre Details:"),
                                    createElement("div", { class: "edit-profile-info" },
                                        createElement("label", null,
                                            "Course Code:",
                                            createElement("br", null),
                                            " ",
                                            createElement("span", { id: "code1" })),
                                        createElement("label", null,
                                            "Course Name:",
                                            createElement("br", null),
                                            createElement("span", { id: "name1" })),
                                        createElement("label", null,
                                            "Credit:",
                                            createElement("br", null),
                                            createElement("span", { id: "credit1" })),
                                        createElement("label", null,
                                            "Department:",
                                            createElement("br", null),
                                            createElement("span", { id: "department1" })))),
                                createElement("div", { clas: "profile-fields" },
                                    createElement("div", { class: "edit-profile-btn" },
                                        createElement("button", { onclick: () => {
                                                this._vm.DisableTextBox();
                                                this._vm.update();
                                            } },
                                            " ",
                                            createElement("i", { class: "fas fa-save" }),
                                            "Save"),
                                        createElement("button", { id: "btnEdit", value: "yes", style: "visibility:hidden", onclick: () => {
                                                this._vm.EnableTextBox();
                                            } },
                                            createElement("i", { class: "fas fa-edit" }),
                                            "Edit")),
                                    createElement("form", { class: "edit-details" },
                                        createElement("div", { class: "left-profile-edit" },
                                            createElement("p", null,
                                                createElement("label", null, "Course Code"),
                                                createElement("input", { type: "text", class: "edit-text-field", id: "code", input: true })),
                                            createElement("p", null,
                                                createElement("label", null, "Course Name"),
                                                createElement("input", { type: "text", class: "edit-text-field", id: "name", input: true })),
                                            createElement("p", null,
                                                createElement("label", null, "Credit"),
                                                createElement("input", { type: "text", class: "edit-text-field", id: "credit", input: true }))),
                                        createElement("div", { class: "middle-profile-edit" },
                                            createElement("p", null,
                                                createElement("label", null, "Department"),
                                                createElement("input", { type: "text", class: "edit-text-field", id: "department", input: true }))))))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this.addClickEvent();
        function tableSearch() {
            let input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("searchByLectName");
            filter = input.value.toUpperCase();
            table = document.getElementById("courses");
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
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            new CourseModal(this._vm).render("route-outlet");
        });
        _.syncTable("courseViewHead", "courseView");
        document.getElementById("code").onkeyup = (evt) => {
            evt.preventDefault();
            this._vm.course.code = evt.target.value;
        };
        document.getElementById("name").onchange = (evt) => {
            evt.preventDefault();
            this._vm.course.courseName = evt.target.value;
        };
        document.getElementById("credit").onchange = (evt) => {
            evt.preventDefault();
            this._vm.course.credit = evt.target.value;
        };
        this._vm.bind();
        document.getElementById("addCourse").onclick = showModal;
    }
}
//# sourceMappingURL=courseView.js.map