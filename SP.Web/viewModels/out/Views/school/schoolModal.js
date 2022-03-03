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
import { School } from "../../models/school";
export class SchoolModal {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    render(elementId) {
        const temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
            createElement("div", { class: "modal-content" },
                createElement("div", { class: "sp-box" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, "School"),
                        createElement("div", { class: "mountcourses-form" },
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Institution"),
                                createElement("select", { class: "edit-text-field", style: "margin-top: 1%;", id: "institutions", binding: "School.institutionName", value: this._vm.school.institutionName, "data-repeat": "institutions" },
                                    createElement("option", { binding: "institutionNane" })),
                                createElement("div", { errors: "institutionName" })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Name"),
                                createElement("input", { binding: "School.name", type: "text", class: "edit-text-field", style: "margin-top: 1%;width:-webkit-fill-available", value: this._vm.school.name }),
                                createElement("div", { errors: "name" })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Academic Year"),
                                createElement("select", { id: "academicYears", binding: "School.academicYear", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.school.academicYear, "data-repeat": "academicYears" },
                                    createElement("option", { binding: "name" }, "Select Academic Year")),
                                createElement("div", { errors: "academicYear" })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Semester"),
                                createElement("select", { id: "semesters", binding: "School.semester", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.school.semester, "data-repeat": "semesters" },
                                    createElement("option", { binding: "name" }, "Select Semester")),
                                createElement("div", { errors: "semester" })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Dean of School"),
                                createElement("select", { id: "dean", binding: "School.lecturerId", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.school.lecturerId, "data-repeat": "lecturerId" },
                                    createElement("option", { binding: "name" }, "Set Dean of Student"),
                                    this._vm.getLecturers().map((x) => (createElement("option", { value: x.lecturerId }, x.name)))),
                                createElement("div", { errors: "dean" })),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { id: "Save", class: "sp-btn sp-btn-primary" }, "Save"),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        this._vm.school = new School();
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        let save = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            this._vm.save();
            if (!this._vm.validator.hasErrors) {
                let tr = document.getElementById("schools");
                tr.textContent = "";
                tr.appendChild(createElement("tr", null,
                    createElement("td", { binding: "name" }),
                    createElement("td", { binding: "academicYear" }),
                    createElement("td", { binding: "semester" })));
                doc.removeChild(temp);
            }
        });
        this._vm.bindList("institutions");
        this._vm.bindList("semesters");
        this._vm.bindList("academicYears");
        this._vm.bind();
        document.getElementById("Save").onclick = save;
        document.getElementById("close").onclick = hideModal;
    }
}
//# sourceMappingURL=schoolModal.js.map