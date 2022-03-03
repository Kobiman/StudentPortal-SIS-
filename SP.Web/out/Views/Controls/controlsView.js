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
import { CustomRenderer } from "../../customRenderer";
import { AddControlModal } from "./controlModal";
export class ControlsView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        let temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Controls"),
                createElement("button", { class: "sp-btn sp-btn-primary", id: "addControl", onClick: (evt) => {
                        evt.preventDefault();
                        new AddControlModal(this._vm).render("route-outlet");
                    } },
                    createElement("i", { class: "fas fa-plus", style: "margin-right:5px;color:#eee" }),
                    "Add"),
                createElement("div", { class: "" },
                    createElement("div", { class: "" },
                        createElement("button", { class: "sp-btn sp-btn-default", id: "controlAllButton", style: "color:#8B0000", onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                evt.preventDefault();
                                yield this._vm.updateControls(true);
                                this._vm.setControlType();
                                CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create());
                            }) }, "TURN ON")),
                    createElement("div", { class: "" },
                        createElement("button", { class: "sp-btn sp-btn-default", id: "controlAllButton", onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                evt.preventDefault();
                                yield this._vm.updateControls(false);
                                this._vm.setControlType();
                                CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create());
                            }) }, "TURN OFF")),
                    createElement("div", { class: "control-filter" },
                        createElement("div", { class: "" },
                            createElement("select", { class: "control-text-field", id: "type", style: "height:37px;visibility:hidden;", filter: true },
                                createElement("option", { value: "" }, "CONTROL TYPE"),
                                this._vm.getControlType().map((x) => (createElement("option", { value: x.name }, x.name))))),
                        createElement("div", { class: "" },
                            createElement("select", { class: "control-text-field", id: "academicYear", style: "height:37px;", academicYear: true },
                                createElement("option", { value: "" }, "ACADEMIC YEAR"),
                                this._vm.getAcademicYear().map((x) => (createElement("option", { value: x.name }, x.name))))))),
                createElement("div", { class: "" },
                    createElement("div", { class: "control-horizontal" },
                        createElement("table", { class: "table css-serial", id: "controlHead" },
                            createElement("thead", null,
                                createElement("tr", null,
                                    createElement("th", null, "No."),
                                    createElement("th", null, "Program"),
                                    createElement("th", null, "Type"),
                                    createElement("th", null, "Edit"))),
                            createElement("tbody", { id: "controlBody" })))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        let getType = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const element = document.querySelector("[filter]");
            let control = element.value;
            this._vm.controlType = control;
            this._vm.setControlType();
            CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create());
        });
        document.getElementById("type").onchange = getType;
        let getAcademicYear = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const element = document.querySelector("[academicYear]");
            let academicYear = element.value;
            this._vm.getControls(academicYear);
            document.getElementById("type").style.visibility = "visible";
            CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create());
        });
        document.getElementById("academicYear").onchange = getAcademicYear;
    }
}
export class StatusButton {
    constructor(_vm) {
        this._vm = _vm;
    }
    create(status) {
        let btnText = status.active ? "On" : "Off";
        let btnColor = status.active ? "#59b379" : "#8B0000";
        let btn = (createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "turn", style: "border:none;text-align: start;margin-left: -2px;", onClick: (evt) => {
                evt.preventDefault();
                let row = evt.target.parentElement
                    .parentElement;
                debugger;
                if (row.textContent.indexOf("On") != -1) {
                    status.active = false;
                    this._vm.updateControl(status.programId, status.controlType, status.active, status.id);
                    row.cells[3].children[0].style.color = "#8B0000";
                    row.cells[3].children[0].innerText = "Off";
                }
                else {
                    status.active = true;
                    this._vm.updateControl(status.programId, status.controlType, status.active, status.id);
                    row.cells[3].children[0].style.color = "#59b379";
                    row.cells[3].children[0].innerText = "On";
                }
            } }, btnText));
        btn.style.color = btnColor;
        return btn;
    }
}
export class ControlsTr {
    constructor(_vm) {
        this._vm = _vm;
    }
    create() {
        return this._vm.programs.map((x) => (createElement("tr", null,
            createElement("td", { width: "5.1%" }),
            createElement("td", { width: "15.7%" }, x.name),
            createElement("td", { width: "15.7%" }, x.controlType),
            createElement("td", { width: "9%" }, new StatusButton(this._vm).create(x)))));
    }
}
//# sourceMappingURL=controlsView.js.map