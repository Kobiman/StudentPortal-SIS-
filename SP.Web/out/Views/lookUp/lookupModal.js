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
export class LookupModal {
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
                        createElement("h1", null, "Lookup"),
                        createElement("div", { class: "mountcourses-form" },
                            createElement("p", null,
                                createElement("label", null, "Institution"),
                                createElement("select", { id: "institutions", binding: "Lookup.institution", value: this._vm.lookup.institution, "data-repeat": "institutions" },
                                    createElement("option", { binding: "name" })),
                                createElement("div", { errors: "institution" })),
                            createElement("p", null,
                                createElement("label", null, "Type"),
                                createElement("select", { id: "lookupTypes", binding: "Lookup.type", value: this._vm.lookup.type, "data-repeat": "lookupTypes" },
                                    createElement("option", { binding: "name" })),
                                createElement("div", { errors: "type" })),
                            createElement("p", null,
                                createElement("label", null, "Name"),
                                createElement("input", { binding: "Lookup.name", type: "text", value: this._vm.lookup.name }),
                                createElement("div", { errors: "name" })),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { id: "Save", class: "sp-btn sp-btn-primary" },
                                    "Save ",
                                    createElement("i", { class: "fa fa-save" })),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        let save = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            this._vm.save();
            if (!this._vm.validator.hasErrors) {
                let tr = document.getElementById("lookups");
                tr.textContent = "";
                tr.appendChild(createElement("tr", null,
                    createElement("td", { binding: "name" }),
                    createElement("td", { binding: "type" })));
                doc.removeChild(temp);
            }
        });
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        this._vm.bind();
        this._vm.bindList("institutions");
        this._vm.bindList("lookupTypes");
        document.getElementById("close").onclick = hideModal;
        document.getElementById("Save").onclick = save;
    }
}
//# sourceMappingURL=lookupModal.js.map