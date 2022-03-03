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
export class userProfileView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getStudentList();
        });
    }
    render(elementId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this._vm.student.dateOfEntry = ((_a = this._vm.student) === null || _a === void 0 ? void 0 : _a.dateOfEntry)
                .split("T")[0]
                .replaceAll("-", "/");
            this._vm.student.dateofBirth = ((_b = this._vm.student) === null || _b === void 0 ? void 0 : _b.dateofBirth)
                .split("T")[0]
                .replaceAll("-", "/");
            let temp = (createElement("div", { class: "sp-box", style: "height:100%" },
                createElement("div", { class: "mc-row" },
                    createElement("div", { class: "sp-row-col-2-2" },
                        createElement("div", { class: "user-img" },
                            createElement("img", { id: "uploaded-img", src: "../assets/avatar.png", alt: "" }),
                            createElement("input", { onChange: this._vm.profileImagePreview, id: "imgUpload", class: "imgUpload", type: "file", accept: "image/*", name: "Edit" }),
                            createElement("span", { class: "fade", id: "fade" }),
                            console.log("this is the input class name " +
                                document.getElementById("imgUpload")),
                            createElement("h4", { class: "profile-name" }, this._vm.student.studentName),
                            createElement("button", { class: " sp-btn-primay-3", id: "profileEditMobileButton", onclick: () => {
                                    this._vm.EnableTextBox();
                                } },
                                createElement("span", null, "Edit")),
                            createElement("button", { class: " sp-btn-primay-3", style: "visibility:hidden", id: "profileSaveMobileButton", onclick: () => {
                                    this._vm.DisableTextBox();
                                } },
                                createElement("span", null, "Save")),
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
                                        this._vm.student.dateofBirth)),
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
                                        this._vm.student.universityEmail)))),
                        createElement("div", { class: "profile-fields" },
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
                                createElement("div", { class: "left-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "Index Number"),
                                        createElement("input", { id: "indexNumber", type: "text", class: "edit-text-field", value: this._vm.student.indexNumber, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "Reference Number"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "referenceNumber", value: this._vm.student.referenceNumber, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "FullName"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "fullName", value: this._vm.student.studentName, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "Program"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: this._vm.student.program, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "Department"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "department", value: this._vm.student.department, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "School"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "school", value: this._vm.student.school, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "Contact 1"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "contact1", value: this._vm.student.contact1, disabled: "disabled", input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "University Email"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "universityEmail", value: this._vm.student.universityEmail, disabled: "disabled" }))),
                                createElement("div", { class: "middle-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "DOB (yyyy/mm/dd)"),
                                        createElement("input", { type: "text", class: "edit-text-field ", value: this._vm.student.dateofBirth, disabled: "disabled" }),
                                        createElement("div", { errors: "DateofBirth" })),
                                    createElement("p", null,
                                        createElement("label", null, "Gender"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "gender", value: this._vm.student.gender === "M" ? "Male" : "Female", disabled: "disabled" }),
                                        createElement("div", { errors: "Gender" })),
                                    createElement("p", null,
                                        createElement("label", null, "Level"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "level", value: this._vm.student.level, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "Personal Email"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "personalEmail", value: this._vm.student.personalEmail, disabled: "disabled", input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Enrollment Option"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "enrollmentOption", value: this._vm.student.enrollmentOption, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "Enrollment Date"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "enrollmentDate", value: this._vm.student.dateOfEntry, disabled: "disabled" })),
                                    createElement("p", null,
                                        createElement("label", null, "Contact 2"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "contact2", value: this._vm.student.contact2, disabled: "disabled", input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Marital Status"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "maritalStatus", value: this._vm.student.maritalStatus, disabled: "disabled" }))))))),
                createElement("div", { class: "profile-btn", id: "mediaProfileButton" },
                    createElement("button", { value: "yes", onclick: () => {
                            this._vm.EnableTextBox();
                        } },
                        createElement("i", { class: "fas fa-edit" }),
                        "Edit"),
                    createElement("button", { onclick: () => {
                            this._vm.DisableTextBox();
                        } },
                        " ",
                        createElement("i", { class: "fas fa-save" }),
                        "Save"))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
        });
    }
}
//# sourceMappingURL=userProfileView.js.map