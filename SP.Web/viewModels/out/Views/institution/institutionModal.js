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
export class InstitutionModal {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => __awaiter(this, void 0, void 0, function* () {
            const temp = (createElement("div", { class: "mountcourse-modal" },
                createElement("div", { class: "modal-content" },
                    createElement("div", { class: "sp-box" },
                        createElement("div", { class: "sp-row" },
                            createElement("h1", null, "Institution"),
                            createElement("form", { class: "mountcourses-form" },
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Name"),
                                    createElement("input", { id: "surname", binding: "Institution.name", type: "text", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.institution.name }),
                                    createElement("div", { errors: "name" })),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Code"),
                                    createElement("input", { type: "text", binding: "Institution.code", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.institution.code }),
                                    createElement("div", { errors: "code" })),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Postal Address"),
                                    createElement("input", { type: "text", binding: "Institution.postalAddress", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.institution.postalAddress }),
                                    createElement("div", { errors: "postalAddress" })),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Email"),
                                    createElement("input", { type: "text", binding: "Institution.email", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.institution.email }),
                                    createElement("div", { errors: "email" })),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Country"),
                                    createElement("input", { type: "text", binding: "Institution.country", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.institution.country }),
                                    createElement("div", { errors: "country" })),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "City"),
                                    createElement("input", { type: "text", binding: "Institution.city", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.institution.city }),
                                    createElement("div", { errors: "city" })),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Telephone"),
                                    createElement("input", { type: "text", binding: "Institution.telephone", class: "edit-text-field", style: "margin-top: 1%;", value: this._vm.institution.telephone }),
                                    createElement("div", { errors: "telephone" })),
                                createElement("div", { class: "sp-btn-row" },
                                    createElement("button", { id: "Save", class: "sp-btn sp-btn-primary" },
                                        "Save ",
                                        createElement("i", { class: "fa fa-save" })),
                                    createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
            const doc = document.getElementById(elementId);
            //doc.textContent = "";
            doc.appendChild(temp);
            let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                doc.removeChild(temp);
            });
            let save = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                this._vm.save();
                if (!this._vm.validator.hasErrors) {
                    let tr = document.getElementById("institutions");
                    tr.textContent = "";
                    tr.appendChild(createElement("tr", null,
                        createElement("td", { binding: "name" }),
                        createElement("td", { binding: "code" }),
                        createElement("td", { binding: "country" }),
                        createElement("td", { binding: "city" }),
                        createElement("td", { binding: "email" }),
                        createElement("td", { binding: "telephone" }),
                        createElement("td", { binding: "postalAddress" })));
                    doc.removeChild(temp);
                }
            });
            this._vm.bind();
            document.getElementById("close").onclick = hideModal;
            document.getElementById("Save").onclick = save;
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=institutionModal.js.map