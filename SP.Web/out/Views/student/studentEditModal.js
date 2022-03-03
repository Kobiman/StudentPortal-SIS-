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
export class StudentEditModal {
    constructor(_vm, indexNumber) {
        this._vm = _vm;
        this.indexNumber = indexNumber;
        this.render = (elementId) => {
            var _a, _b;
            this._vm.student.dateOfEntry = (((_a = this._vm.student) === null || _a === void 0 ? void 0 : _a.dateOfEntry).split("T"))[0].replaceAll("-", "/");
            this._vm.student.dateofBirth = (((_b = this._vm.student) === null || _b === void 0 ? void 0 : _b.dateofBirth).split("T"))[0].replaceAll("-", "/");
            let temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
                createElement("div", { class: "modal-content" },
                    createElement("div", { class: "sp-box", style: "height:95%" },
                        createElement("div", { class: "mc-row", style: "height:100%" },
                            createElement("div", { class: "horizontal" },
                                createElement("button", { class: "modal-btn", id: "close" },
                                    createElement("li", { class: "fa fa-times" }))),
                            createElement("div", { class: "profile-form", style: "height:100%;" },
                                createElement("div", { class: "sp-row-col-2-2", style: "height:100%" },
                                    createElement("div", { class: "user-img" },
                                        createElement("img", { id: "uploaded-img", src: "../assets/avatar.png", alt: "" }),
                                        createElement("input", { id: "imgUpload", class: "imgUpload", type: "file", name: "Edit" }),
                                        createElement("span", { class: "fade", id: "fade" }),
                                        createElement("h4", { class: "profile-name" }, this._vm.student.studentName),
                                        createElement("div", { class: "Profile-Info" },
                                            createElement("div", { class: "upload-img" }),
                                            createElement("h3", { class: "info-headers" }, "Personal Info:"),
                                            createElement("label", null,
                                                "Student ID:",
                                                createElement("br", null),
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.indexNumber)),
                                            createElement("label", null,
                                                "Reference Number:",
                                                createElement("br", null),
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.referenceNumber)),
                                            createElement("label", null,
                                                "DOB (yyyy/mm/dd):",
                                                createElement("br", null),
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.dateOfBirth)),
                                            createElement("label", null,
                                                "Gender:",
                                                createElement("br", null),
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.gender === "M" ? "Male" : "Female")),
                                            createElement("label", null,
                                                "Level:",
                                                createElement("br", null),
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.level))),
                                        createElement("div", { class: "Profile-Info-2" },
                                            createElement("h3", { class: "info-headers" }, "Contact Info"),
                                            createElement("label", null,
                                                "Contact:",
                                                createElement("br", null),
                                                " ",
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.contact1)),
                                            createElement("label", null,
                                                "Personal Email:",
                                                createElement("br", null),
                                                " ",
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.personalEmail)),
                                            createElement("label", null,
                                                "Institutional Email:",
                                                createElement("br", null),
                                                " ",
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.universityEmail)),
                                            createElement("label", null,
                                                "Address:",
                                                createElement("br", null),
                                                createElement("span", null,
                                                    " ",
                                                    this._vm.student.address1)))),
                                    createElement("div", { clas: "profile-fields" },
                                        createElement("div", { class: "profile-btn" },
                                            createElement("button", { id: "btnEdit", value: "yes", onclick: () => {
                                                    this._vm.EnableTextBox();
                                                } },
                                                createElement("i", { class: "fas fa-edit" }),
                                                "Edit"),
                                            createElement("button", { id: "save-visibility", style: "visibility:hidden", onclick: () => {
                                                    this._vm.DisableTextBox();
                                                } },
                                                " ",
                                                createElement("i", { class: "fas fa-save" }),
                                                "Save")),
                                        createElement("form", { class: "sp-form-profile" },
                                            createElement("div", { class: "left-profile" },
                                                createElement("p", null,
                                                    createElement("label", null, "Index Number"),
                                                    createElement("input", { id: "indexNumber", type: "text", class: "text-field-dec", value: this._vm.student.indexNumber, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Reference Number"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "referenceNumber", value: this._vm.student.referenceNumber, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "FullName"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "fullName", value: this._vm.student.studentName, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Program"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "program", value: this._vm.student.program, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Department"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "department", value: this._vm.student.department, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "School"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "school", value: this._vm.student.school, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Contact 1"),
                                                    createElement("input", { type: "text", class: "text-field-dec editTable", id: "contact1", value: this._vm.student.contact1, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "University Email"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "universityEmail", value: this._vm.student.universityEmail, disabled: "disabled" }))),
                                            createElement("div", { class: "right-profile" },
                                                createElement("p", null,
                                                    createElement("label", null, "DOB (yyyy/mm/dd)"),
                                                    createElement("input", { type: "text", class: "text-field-dec ", value: this._vm.student.dateofBirth, disabled: "disabled" }),
                                                    createElement("div", { errors: "DateofBirth" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Gender"),
                                                    createElement("input", { type: "text", class: "text-field-dec editTable", id: "gender", value: this._vm.student.gender === "M" ? "Male" : "Female", disabled: "disabled" }),
                                                    createElement("div", { errors: "Gender" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Level"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "level", value: this._vm.student.level, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Personal Email"),
                                                    createElement("input", { type: "text", class: "text-field-dec editTable", id: "personalEmail", value: this._vm.student.personalEmail, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Enrollment Option"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "enrollmentOption", value: this._vm.student.enrollmentOption, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Enrollment Date"),
                                                    createElement("input", { type: "text", class: "text-field-dec", id: "enrollmentDate", value: this._vm.student.dateOfEntry, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Contact 2"),
                                                    createElement("input", { type: "text", class: "text-field-dec editTable", id: "contact2", value: this._vm.student.contact2, disabled: "disabled" })),
                                                createElement("p", null,
                                                    createElement("label", null, "Marital Status"),
                                                    createElement("input", { type: "text", class: "text-field-dec editTable", id: "maritalStatus", value: this._vm.student.maritalStatus, disabled: "disabled" }))))))))))));
            let closeModel = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                doc.removeChild(temp);
            });
            document.getElementById("close").onclick = closeModel;
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            //   await this._vm.getStudentList();
            yield this._vm.getStudent(this.indexNumber);
        });
    }
}
//# sourceMappingURL=studentEditModal.js.map