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
import { InstitutionModal } from "./institutionModal";
import { _ } from "../../group";
export class InstitutionView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            var temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "mc-row" },
                    createElement("h1", null, "Institutions"),
                    createElement("div", { class: "mountcourses-form" },
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "addInstitution" }, "Add")),
                        createElement("div", null,
                            createElement("table", { class: "table-hd", id: "institutionViewHead" },
                                createElement("thead", null,
                                    createElement("th", null, "No."),
                                    createElement("th", null, "Name"),
                                    createElement("th", null, "Code"),
                                    createElement("th", null, "Country"),
                                    createElement("th", null, "City"),
                                    createElement("th", null, "Email"),
                                    createElement("th", null, "Telephone"),
                                    createElement("th", null, "Postal Address"))),
                            createElement("div", { class: "horizontal" },
                                createElement("table", { class: "table css-serial", id: "institutionView" },
                                    createElement("thead", { hidden: true },
                                        createElement("tr", null,
                                            createElement("th", null, "No."),
                                            createElement("th", null, "Name"),
                                            createElement("th", null, "Code"),
                                            createElement("th", null, "Country"),
                                            createElement("th", null, "City"),
                                            createElement("th", null, "Email"),
                                            createElement("th", null, "Telephone"),
                                            createElement("th", null, "Postal Address"))),
                                    createElement("tbody", { id: "institutions", "data-repeat": "institutions" }, this._vm.institutions.map((x) => (createElement("tr", null,
                                        createElement("td", null),
                                        createElement("td", { binding: "name" }, x.name),
                                        createElement("td", { binding: "code" }, x.code),
                                        createElement("td", { binding: "country" }, x.country),
                                        createElement("td", { binding: "city" }, x.city),
                                        createElement("td", { binding: "email" }, x.email),
                                        createElement("td", { binding: "telephone" }, x.telephone),
                                        createElement("td", { binding: "postalAddress" }, x.postalAddress))))))),
                            createElement("div", { class: "edit-content" },
                                createElement("div", { class: "profile-form" },
                                    createElement("div", { class: "sp-row-col-2-2-2" },
                                        createElement("div", { class: "user-info" },
                                            createElement("h3", { class: "edit-info-headers" }, "Institution Details:"),
                                            createElement("div", { class: "edit-profile-info" },
                                                createElement("label", null,
                                                    "Institution ID:",
                                                    createElement("br", null),
                                                    createElement("span", null, this._vm.institution.institutionId)),
                                                createElement("label", null,
                                                    "Institution Code:",
                                                    createElement("br", null),
                                                    " ",
                                                    createElement("span", null, this._vm.institution.code)),
                                                createElement("label", null,
                                                    "Institution Name:",
                                                    createElement("br", null),
                                                    createElement("span", null, this._vm.institution.name)),
                                                createElement("label", null,
                                                    "Country:",
                                                    createElement("br", null),
                                                    createElement("span", null, this._vm.institution.country)),
                                                createElement("label", null,
                                                    "City:",
                                                    createElement("br", null),
                                                    createElement("span", null, this._vm.institution.city)),
                                                createElement("label", null,
                                                    "Email:",
                                                    createElement("br", null),
                                                    createElement("span", null, this._vm.institution.email)),
                                                createElement("label", null,
                                                    "Telephone:",
                                                    createElement("br", null),
                                                    createElement("span", null, this._vm.institution.telephone)))),
                                        createElement("div", { clas: "profile-fields" },
                                            createElement("div", { class: "edit-profile-btn" },
                                                createElement("button", { onclick: () => {
                                                        this._vm.DisableTextBox();
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
                                                        createElement("label", null, "Institution ID"),
                                                        createElement("input", { id: "indexNumber", type: "text", class: "edit-text-field", value: this._vm.institution.institutionId, disabled: "disabled" })),
                                                    createElement("p", null,
                                                        createElement("label", null, "Institution Code"),
                                                        createElement("input", { type: "text", class: "edit-text-field", id: "referenceNumber", value: this._vm.institution.code, input: true })),
                                                    createElement("p", null,
                                                        createElement("label", null, "Institution Name"),
                                                        createElement("input", { type: "text", class: "edit-text-field", id: "fullName", value: this._vm.institution.name, input: true })),
                                                    createElement("p", null,
                                                        createElement("label", null, "Country"),
                                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: this._vm.institution.country, input: true }))),
                                                createElement("div", { clas: "middle-profile-edit" },
                                                    createElement("p", null,
                                                        createElement("label", null, "City"),
                                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: this._vm.institution.city, input: true })),
                                                    createElement("p", null,
                                                        createElement("label", null, "Email"),
                                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: this._vm.institution.email, input: true })),
                                                    createElement("p", null,
                                                        createElement("label", null, "Telephone"),
                                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: this._vm.institution.telephone, input: true })))))))))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
            this.addClickEvent();
            let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                new InstitutionModal(this._vm).render("route-outlet");
            });
            _.syncTable("institutionViewHead", "institutionView");
            document.getElementById("addInstitution").onclick = showModal;
        };
        this.addClickEvent = () => __awaiter(this, void 0, void 0, function* () {
            let editInstitution = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target
                    .parentElement;
                const code = row.cells[2].innerText;
                this._vm.code = code;
                yield this._vm.getInstitutionDetails();
                new InstitutionView(this._vm).render("route-outlet");
            });
            const elements = document.querySelectorAll("td");
            elements.forEach(function (element) {
                element.onclick = editInstitution;
            });
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getInstitutions();
        });
    }
}
//# sourceMappingURL=institutionView.js.map