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
export class loginView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            let temp = (
            //<div class="sp-box">
            // <div class="mc-row">
            //<div class="container">
            createElement("div", { class: "wrapper", id: "login-wrapper" },
                createElement("form", { action: "", class: "login-form" },
                    createElement("img", { src: "../assets/uenr-logo-768x998.png", alt: "" }),
                    createElement("h2", null, "Login"),
                    createElement("div", { class: "input-group" },
                        createElement("input", { type: "text", name: "loginUser", id: "loginUser", required: true }),
                        createElement("label", { for: "loginUser" }, "User Name")),
                    createElement("div", { class: "input-group" },
                        createElement("input", { type: "password", name: "loginPassword", id: "loginPassword", required: true }),
                        createElement("label", { for: "loginPassword" }, "Password")),
                    createElement("input", { value: "Login", class: "submit-btn", onClick: (evt) => {
                            evt.preventDefault();
                            this._vm.signIn();
                        } }),
                    createElement("a", { href: "#forgot-password", class: "forgot-password" }, "Forgot Password?")),
                createElement("div", { id: "forgot-password" },
                    createElement("form", { action: "", class: "login-form" },
                        createElement("a", { href: "#", class: "close" }, "\u00D7"),
                        createElement("h2", null, "Reset Password"),
                        createElement("div", { class: "input-group" },
                            createElement("input", { type: "email", name: "email", id: "email", required: true }),
                            createElement("label", { for: "email" }, "Email")),
                        createElement("input", { type: "submit", value: "Submit", class: "submit-btn" }))))
            //</div>
            //</div>
            //</div>
            );
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=loginView.js.map