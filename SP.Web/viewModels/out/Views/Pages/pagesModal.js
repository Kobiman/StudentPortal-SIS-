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
export class PagesModal {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        const temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
            createElement("div", { class: "modal-content" },
                createElement("div", { class: "sp-box", style: "margin-top:90px;" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, "Permissions Setup"),
                        createElement("form", { class: "mountcourses-form" },
                            createElement("form", { class: "" },
                                createElement("div", { class: "" },
                                    createElement("p", null,
                                        createElement("label", null, "Tilte"),
                                        createElement("br", null),
                                        createElement("input", { id: "showTitles", type: "text", class: "edit-text-field", style: "margin-bottom: 0px;" })),
                                    createElement("p", null,
                                        createElement("label", null, "Route"),
                                        createElement("br", null),
                                        createElement("input", { id: "showRoutes", type: "text", class: "edit-text-field", style: "margin-bottom: 0px;" })))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-default ", id: "set-permission", onKeyup: (evt) => __awaiter(this, void 0, void 0, function* () {
                                        //this.savePermission();
                                    }) }, "Save"),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        const doc = document.getElementById(elementId);
        //doc.textContent = "";
        doc.appendChild(temp);
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        document.getElementById("close").onclick = hideModal;
    }
}
//# sourceMappingURL=pagesModal.js.map