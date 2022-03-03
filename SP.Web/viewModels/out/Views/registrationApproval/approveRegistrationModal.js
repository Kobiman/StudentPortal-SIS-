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
export class ApproveRegistrationModal {
    constructor(_vm, indexNumber) {
        this._vm = _vm;
        this.indexNumber = indexNumber;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
            createElement("div", { class: "modal-content" },
                createElement("div", { class: "sp-box" },
                    createElement("div", { class: "sp-row" },
                        createElement("div", { class: "mountcourses-form" },
                            createElement("div", { class: "approve-top-btns" },
                                createElement("button", { class: "sp-btn sp-btn-primary", id: "accept" }, "Aprove"),
                                createElement("button", { class: "approve-modal-btn", id: "close" },
                                    createElement("li", { class: "fa fa-times", style: "width: 19px" }))),
                            createElement("div", { class: "dropdown" },
                                createElement("h1", { id: "dropdown-header" },
                                    createElement("span", { class: "sp-bold" },
                                        createElement("a", { onClick: (evt) => {
                                                evt.preventDefault();
                                                if (evt.target.getAttribute("class") === "fa fa-minus") {
                                                    colapseTable(evt);
                                                    let element = (document.getElementsByClassName("registered"));
                                                    element[0].style.display = "none";
                                                }
                                                else {
                                                    expandTable(evt);
                                                    let element = (document.getElementsByClassName("registered"));
                                                    element[0].style.display = "inline";
                                                }
                                            } },
                                            createElement("li", { class: "fa fa-minus" })),
                                        "\u00A0\t\u00A0 \u00A0\t\u00A0Registered Courses"))),
                            createElement("div", { class: "registered" },
                                createElement("div", { class: "approve-horizontal" },
                                    createElement("table", { class: "table" },
                                        createElement("thead", { class: "table" },
                                            createElement("th", null, "Course Code"),
                                            createElement("th", null, "Course Title"),
                                            createElement("th", null, "Credit"),
                                            createElement("th", null, "Option"),
                                            createElement("th", null, "Remove"),
                                            createElement("th", null, "Defer")),
                                        createElement("tbody", { id: "approveRegistrationRow" })))),
                            createElement("div", { class: "dropdown" },
                                createElement("h1", { id: "dropdown-header" },
                                    createElement("span", { class: "sp-bold" },
                                        createElement("a", { onClick: (evt) => {
                                                evt.preventDefault();
                                                if (evt.target.getAttribute("class") === "fa fa-plus") {
                                                    expandTable(evt);
                                                    let element = (document.getElementsByClassName("trail"));
                                                    element[0].style.display = "inline";
                                                }
                                                else {
                                                    colapseTable(evt);
                                                    let element = (document.getElementsByClassName("trail"));
                                                    element[0].style.display = "none";
                                                }
                                            } },
                                            createElement("li", { class: "fa fa-plus" })),
                                        "\u00A0\t\u00A0 \u00A0\t\u00A0Trail Courses"))),
                            createElement("div", { class: "trail" },
                                createElement("div", { class: "approve-horizontal" },
                                    createElement("table", { class: "table" },
                                        createElement("thead", { class: "table" },
                                            createElement("th", null, "Course Code"),
                                            createElement("th", null, "Course Title"),
                                            createElement("th", null, "Credit"),
                                            createElement("th", null, "Option"),
                                            createElement("th", null, "Add")),
                                        createElement("tbody", { id: "unregisteredTrailCourses" })))),
                            createElement("div", { class: "dropdown" },
                                createElement("h1", { id: "dropdown-header" },
                                    createElement("span", { class: "sp-bold" },
                                        createElement("a", { onClick: (evt) => {
                                                evt.preventDefault();
                                                if (evt.target.getAttribute("class") === "fa fa-plus") {
                                                    expandTable(evt);
                                                    let element = (document.getElementsByClassName("mounted"));
                                                    element[0].style.display = "inline";
                                                    let element1 = (document.getElementsByClassName("registered"));
                                                    element1[0].style.display = "none";
                                                    element1[0].class = "fa fa-plus";
                                                    let element2 = (document.getElementsByClassName("trail"));
                                                    element2[0].style.display = "none";
                                                    element2[0].class = "fa fa-plus";
                                                }
                                                else {
                                                    colapseTable(evt);
                                                    let element = (document.getElementsByClassName("mounted"));
                                                    element[0].style.display = "none";
                                                }
                                            } },
                                            createElement("li", { class: "fa fa-plus" })),
                                        "\u00A0\t\u00A0 \u00A0\t\u00A0Mounted Courses"))),
                            createElement("div", { class: "mounted" },
                                createElement("div", { class: "approve-horizontal" },
                                    createElement("table", { class: "table" },
                                        createElement("thead", { class: "table" },
                                            createElement("th", null, "Course Code"),
                                            createElement("th", null, "Course Title"),
                                            createElement("th", null, "Credit"),
                                            createElement("th", null, "Option"),
                                            createElement("th", null, "Add")),
                                        createElement("tbody", { id: "unregisteredMountedCourses" }))))))))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        let closeModel = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        let accept = (evt) => __awaiter(this, void 0, void 0, function* () {
            //evt.preventDefault();
            this._vm.aproveRegistration(this.indexNumber);
            doc.removeChild(temp);
        });
        document.getElementById("accept").onclick = accept;
        document.getElementById("close").onclick = closeModel;
        let expandTable = (evt) => {
            let element = evt.target;
            element.removeAttribute("class");
            element.setAttribute("class", "fa fa-minus");
            element.setAttribute("style", "display:inline");
        };
        let colapseTable = (evt) => {
            let element = evt.target;
            element.removeAttribute("class");
            element.setAttribute("class", "fa fa-plus");
        };
    }
}
//# sourceMappingURL=approveRegistrationModal.js.map