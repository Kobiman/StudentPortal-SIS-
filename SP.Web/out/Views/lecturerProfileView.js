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
export class lecturerProfileView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getLecturer();
        });
    }
    render(elementId) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = (createElement("div", { class: "sp-box", style: "height:95%  " },
                createElement("div", { class: "mc-row", style: "height:100%; " },
                    createElement("div", { class: "profile-form", style: "height:100%; " },
                        createElement("div", { class: "sp-row-col-2-2", style: "height:100%" },
                            createElement("div", { class: "user-img" },
                                createElement("div", null,
                                    createElement("img", { id: "uploaded-img", src: "../assets/avatar.png", alt: "" }),
                                    createElement("input", { onChange: this._vm.profileImagePreview, id: "imgUpload", class: "imgUpload", type: "file", name: "Edit", accept: "image/*" }),
                                    createElement("span", { class: "fade", id: "fade" }),
                                    createElement("h4", { class: "profile-name" }, this._vm.lecturer.name)),
                                createElement("div", { class: "Profile-Info" },
                                    createElement("div", { class: "upload-img" }),
                                    createElement("h3", { class: "info-headers" }, "Profile Info:"),
                                    createElement("label", null,
                                        "Staff ID:",
                                        createElement("br", null),
                                        createElement("span", null, this._vm.lecturer.staffId)),
                                    createElement("label", null,
                                        "contact:",
                                        createElement("br", null),
                                        createElement("span", null, this._vm.lecturer.telephone)),
                                    createElement("label", null,
                                        "Emergency Contact",
                                        createElement("br", null),
                                        createElement("span", null, this._vm.lecturer.telephone)),
                                    createElement("label", null,
                                        "Personal Email:",
                                        createElement("br", null),
                                        createElement("span", null, this._vm.lecturer.email)),
                                    createElement("label", null,
                                        "Insitutional Email:",
                                        createElement("br", null),
                                        createElement("span", null, this._vm.lecturer.email)),
                                    createElement("label", null,
                                        "Department:",
                                        createElement("br", null),
                                        createElement("span", null, "Computer Science and Informatics")),
                                    createElement("label", null,
                                        "School:",
                                        createElement("br", null),
                                        createElement("span", null, "Natural Resources")))),
                            createElement("div", { clas: "profile-fields " },
                                createElement("div", { class: "profile-btn" },
                                    createElement("button", { id: "btnEdit", value: "yes", onclick: () => {
                                            this._vm.enableTexbox();
                                        } },
                                        createElement("i", { class: "fas fa-edit" }),
                                        "Edit"),
                                    createElement("button", { id: "save-visibility", style: "visibility:hidden", onclick: () => {
                                            this._vm.disableTextBox();
                                        } },
                                        " ",
                                        createElement("i", { class: "fas fa-save" }),
                                        "Save")),
                                createElement("form", { class: "sp-form-profile" },
                                    createElement("div", { class: "left-profile-edit" },
                                        createElement("p", null,
                                            createElement("label", null, "FullName"),
                                            createElement("input", { id: "name", type: "text", class: "edit-text-field", disabled: "disabled", value: this._vm.lecturer.name })),
                                        createElement("p", null,
                                            createElement("label", null, "Staff ID"),
                                            createElement("input", { type: "text", class: "edit-text-field", id: "staffId", disabled: "disabled", value: this._vm.lecturer.staffId })),
                                        createElement("p", null,
                                            createElement("label", null, "Contact"),
                                            createElement("input", { type: "text", class: "edit-text-field editTable", id: "contact", disabled: "disabled", value: this._vm.lecturer.telephone })),
                                        createElement("p", null,
                                            createElement("label", null, "Emergency Contact"),
                                            createElement("input", { type: "text", class: "edit-text-field editTable", id: "emyContact", disabled: "disabled", value: this._vm.lecturer.telephone })),
                                        createElement("p", null,
                                            createElement("label", null, "Personal Email"),
                                            createElement("input", { type: "text", class: "edit-text-field editTable", id: "personalEmail", disabled: "disabled", value: this._vm.lecturer.email })),
                                        createElement("p", null,
                                            createElement("label", null, "Institutional Email"),
                                            createElement("input", { type: "text", class: "edit-text-field", id: "instEmail", disabled: "disabled", value: this._vm.lecturer.email })),
                                        createElement("p", null,
                                            createElement("label", null, "Department"),
                                            createElement("input", { type: "text", class: "edit-text-field", id: "department", disabled: "disabled", value: this._vm.lecturer.lecturerId })),
                                        createElement("p", null,
                                            createElement("label", null, "School"),
                                            createElement("input", { type: "text", class: "edit-text-field", id: "school", disabled: "disabled", value: "" }))))))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
        });
    }
}
function enableTexboxes() {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=lecturerProfileView.js.map