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
import { ProgramModal } from "./ProgramModal";
import { _ } from "../group";
export class ProgramView {
    constructor(_vm) {
        this._vm = _vm;
        this.addClickEvent = () => __awaiter(this, void 0, void 0, function* () {
            let showDetails = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target.parentElement;
                const name = row.cells[1].innerText;
                yield this._vm.getSpecialization(name);
                new ProgramView(this._vm).render("route-outlet");
            });
            const elements = document.querySelectorAll("td");
            elements.forEach(function (element) {
                element.onclick = showDetails;
            });
        });
        this._vm.command.add(() => {
            this.render("route-outlet");
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getDepartments();
            yield this._vm.getPrograms();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Program List"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "addProgram", style: "float:right" }, "Add")),
                    createElement("div", null,
                        createElement("table", { class: "table-hd", id: "programViewHead" },
                            createElement("thead", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Name"),
                                createElement("th", null, "Duration"))),
                        createElement("div", { class: "horizontal-edit" },
                            createElement("table", { class: "table css-serial", id: "programView" },
                                createElement("thead", { hidden: true },
                                    createElement("tr", null,
                                        createElement("th", null, "No."),
                                        createElement("th", null, "Name"),
                                        createElement("th", null, "Duration"))),
                                this._vm.programs.map(x => createElement("tbody", { id: "programs", "data-repeat": "programs" },
                                    createElement("tr", null,
                                        createElement("td", null),
                                        createElement("td", null, x.name),
                                        createElement("td", null, x.duration)))))),
                        createElement("div", { class: "edit-content" },
                            createElement("div", { class: "profile-form" },
                                createElement("div", { class: "sp-row-col-program" },
                                    createElement("div", { class: "specialization-info" },
                                        createElement("h3", { class: "edit-specialization-header" }, `Specializations: ${this.name}`),
                                        createElement("div", { class: "specialization-view" },
                                            createElement("table", { id: "specializations" },
                                                createElement("thead", null,
                                                    createElement("tr", null,
                                                        createElement("th", null, "Name"),
                                                        createElement("th", null, "Type"),
                                                        createElement("th", null, "Level"))),
                                                this._vm.specialization.map(xx => createElement("tbody", null,
                                                    createElement("tr", null,
                                                        createElement("td", null, xx.name),
                                                        createElement("td", null, xx.type),
                                                        createElement("td", null, xx.level)))))),
                                        createElement("div", { class: "left-profile-edit" })),
                                    createElement("div", { clas: "profile-fields" },
                                        createElement("div", { class: "horizontal-edit-dept" },
                                            createElement("table", { class: "table" },
                                                createElement("thead", { id: "generateHead" },
                                                    createElement("tr", null,
                                                        createElement("th", null, "Level"),
                                                        createElement("th", null, "Min Credit"),
                                                        createElement("th", null, "Max Credit"),
                                                        createElement("th", null, "Std Population"),
                                                        createElement("th", null, "Male"),
                                                        createElement("th", null, "Female"),
                                                        createElement("th", null, "Download"))),
                                                createElement("tbody", { id: "statistics" },
                                                    createElement("tr", null)))))))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this.addClickEvent();
        // let expandTable = (evt:Event,x) =>{
        //     let element = (evt.target as HTMLAnchorElement);
        //     element.removeAttribute("class");
        //     element.setAttribute("class","fa fa-minus");
        //     let elements = document.getElementsByClassName(x.name);
        //     for(var i = 0; i < elements.length; i++){
        //      elements[i].setAttribute("style","display:block");
        //     }
        // }
        //   let colapseTable = (evt:Event,x) =>{
        //     let element = (evt.target as HTMLAnchorElement);
        //     element.removeAttribute("class");
        //     element.setAttribute("class","fa fa-plus");
        //     let elements = document.getElementsByClassName(x.name);
        //     for(var i = 0; i < elements.length; i++){
        //      elements[i].setAttribute("style","display:none");
        //     }
        // }
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            new ProgramModal(this._vm).render("route-outlet");
        });
        _.syncTable("programViewHead", "programView");
        document.getElementById("addProgram").onclick = showModal;
    }
}
//# sourceMappingURL=programView.js.map