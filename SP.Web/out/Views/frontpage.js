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
import { BallLoader } from "../loader/ballLoader";
export class FrontPageView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            let temp = (createElement("div", { class: "showcase" },
                createElement("h2", { class: "front-header" }, "UMIS"),
                createElement("div", { class: "sp-container sp-container-bg" },
                    createElement("h1", null, "Training the next generation of experts"),
                    createElement("p", null, "Providing cutting-edge research to support Ghana and Africa\u2019s development on energy and natural resources."),
                    createElement("div", null,
                        createElement("img", { src: "../assets/uenrBook2.png", class: "front-book", alt: "" })),
                    createElement("button", { class: " sp-btn-primay-3", id: "signin", onClick: (evt) => {
                            BallLoader.show();
                            evt.preventDefault();
                            this._vm.signIn();
                        } },
                        createElement("span", null, "Sign in")))));
            let state = false;
            function toggle() {
                if (state) {
                    document.getElementById("loginPassword").setAttribute("type", "password");
                    document.getElementById("eye").style.color = "#000000";
                    state = false;
                }
                else {
                    document.getElementById("loginPassword").setAttribute("type", "text");
                    document.getElementById("eye").style.color = "#2bab0d";
                    state = true;
                }
            }
            var doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
            // var btn = document.getElementById("signin");
            // btn.addEventListener("click", (evt: Event) => {
            //   evt.preventDefault();
            //   App.navigate("/app/#addStudent/stage1");
            //   // /app/#addStudent/stage1
            // });
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=frontpage.js.map