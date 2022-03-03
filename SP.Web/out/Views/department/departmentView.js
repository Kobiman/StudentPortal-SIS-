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
import { DepartmentModal } from "./departmentModal";
import { _ } from "../../group";
import { DepartmentTableRow } from "./departmentHeadRow";
import { DepartmentTableHead } from "./departmentTableHead";
import { Department } from "../../models/department";
export class DepartmentView {
    constructor(_vm) {
        this._vm = _vm;
        this.addClickEvent = () => __awaiter(this, void 0, void 0, function* () {
            let showStudent = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target
                    .parentElement;
                const code = row.cells[2].innerText;
                this._vm.deptCode = code;
                yield this._vm.getDeptEditDetails();
                document.getElementById("code").value =
                    this._vm.department.code;
                document.getElementById("name").value =
                    this._vm.department.name;
                document.getElementById("schoolName").value =
                    this._vm.department.schoolName;
                document.getElementById("HoD").value =
                    this._vm.lecturerName;
                new DepartmentTableHead(this._vm).render();
                new DepartmentTableRow(this._vm).render();
            });
            const elements = document.querySelectorAll("td");
            elements.forEach(function (element) {
                element.onclick = showStudent;
            });
        });
        this._vm.departmentUpdatedCommand.add(() => {
            document.getElementById(this._vm.department.departmentId).innerHTML =
                this._vm.department.name;
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getDepartments();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Departments"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "addDepartment" }, "Add")),
                    createElement("div", null,
                        createElement("table", { class: "table-hd", id: "departmentViewHead" },
                            createElement("thead", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Name"),
                                createElement("th", null, "Code"))),
                        createElement("div", { class: "horizontal-edit" },
                            createElement("table", { class: "table css-serial", id: "departmentView" },
                                createElement("thead", { hidden: true },
                                    createElement("tr", null,
                                        createElement("th", null, "No."),
                                        createElement("th", null, "Name"),
                                        createElement("th", null, "Code"))),
                                createElement("tbody", { id: "departments", "data-repeat": "departments" }, this._vm.departments.map((x) => (createElement("tr", null,
                                    createElement("td", null),
                                    createElement("td", { id: x.departmentId, binding: "name" }, x.name),
                                    createElement("td", { binding: "code" }, x.code))))))),
                        createElement("div", { class: "edit-content" },
                            createElement("div", { class: "profile-form" },
                                createElement("div", { class: "sp-row-col-2-2-2" },
                                    createElement("div", { class: "user-info" },
                                        createElement("h3", { class: "edit-info-headers" }, "Department Details:"),
                                        createElement("div", { class: "dept-specific-table" },
                                            createElement("button", { value: "yes", onclick: () => {
                                                    this._vm.EnableTextBox();
                                                } },
                                                createElement("i", { class: "fas fa-edit" }),
                                                "Edit"),
                                            createElement("button", { id: "btnSave", style: "visibility:hidden", onclick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                                    evt.preventDefault();
                                                    this._vm.DisableTextBox();
                                                    yield this._vm.update();
                                                    //new DepartmentView(this._vm).render("route-outlet");
                                                }) },
                                                " ",
                                                createElement("i", { class: "fas fa-save" }),
                                                "Save")),
                                        createElement("div", { class: "edit-profile-info" },
                                            createElement("p", null,
                                                createElement("label", null, "Code"),
                                                createElement("input", { id: "code", type: "text", class: "edit-text-field", disabled: "disabled" })),
                                            createElement("p", null,
                                                createElement("label", null, "Name"),
                                                createElement("input", { id: "name", type: "text", class: "edit-text-field", disabled: "disabled", input: true })),
                                            createElement("p", null,
                                                createElement("label", null, "School"),
                                                createElement("input", { id: "schoolName", type: "text", class: "edit-text-field", disabled: "disabled", input: true })),
                                            createElement("p", null,
                                                createElement("label", null, "Head of Department"),
                                                createElement("input", { id: "HoD", type: "text", class: "edit-text-field", style: "margin-bottom: 0px;", onKeyup: (evt) => __awaiter(this, void 0, void 0, function* () {
                                                        // evt.preventDefault();
                                                        showLecturers(evt);
                                                    }), disabled: "disabled", input: true }),
                                                createElement("div", { class: "autocom-box2" },
                                                    createElement("ul", { id: "HoDList" })))),
                                        createElement("div", { class: "left-profile-edit" })),
                                    createElement("div", { clas: "profile-fields" },
                                        createElement("div", { class: "horizontal-edit-dept" },
                                            createElement("table", { class: "table edit-table" },
                                                createElement("thead", { id: "generateHead" }),
                                                createElement("tbody", { id: "statistics" }))))))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this.addClickEvent();
        _.syncTable("departmentViewHead", "departmentView");
        document.getElementById("name").onkeyup = (evt) => {
            evt.preventDefault();
            this._vm.department.name = evt.target.value;
        };
        document.getElementById("schoolName").onkeyup = (evt) => {
            evt.preventDefault();
            this._vm.department.schoolName = evt.target.value;
        };
        // document.getElementById("HoD").onkeyup = (evt: Event) => {
        //   evt.preventDefault();
        //   this._vm.lecturerName = (evt.target as HTMLInputElement).value;
        // }
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            this._vm.department = new Department();
            this._vm.bind();
            new DepartmentModal(this._vm).render("route-outlet");
        });
        let showLecturers = (evt) => __awaiter(this, void 0, void 0, function* () {
            let textbox = evt.target;
            let lecturers = [];
            if (textbox.value !== "") {
                lecturers = yield this._vm.getLecturer(textbox.value);
            }
            let suggestions = document.getElementById("HoDList");
            suggestions.textContent = "";
            for (var l of lecturers) {
                let li = (createElement("li", null, l.name));
                li.onclick = () => {
                    textbox.value = li.innerHTML.trim();
                    suggestions.textContent = "";
                    this._vm.department.lecturerId = l.lecturerId;
                };
                suggestions.appendChild(li);
            }
        });
        this._vm.bind();
        document.getElementById("addDepartment").onclick = showModal;
    }
}
//# sourceMappingURL=departmentView.js.map