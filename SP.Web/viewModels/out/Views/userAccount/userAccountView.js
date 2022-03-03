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
export class UserAccountView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => __awaiter(this, void 0, void 0, function* () {
            let temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "mc-row" },
                    createElement("h1", null, "User Account setting"),
                    createElement("div", { class: "mountcourses-form" },
                        createElement("div", { class: "ammendment-header" })))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=userAccountView.js.map