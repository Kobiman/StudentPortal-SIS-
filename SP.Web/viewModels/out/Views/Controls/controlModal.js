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
import { ControlsTr } from "./controlsView";
export class AddControlModal {
    constructor(_vm) {
        this._vm = _vm;
    }
    render(elementId) {
        const temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
            createElement("div", { class: "modal-content" },
                createElement("div", { class: "sp-box", style: "margin-top:90px;" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, "Control Setup"),
                        createElement("form", { class: "mountcourses-form" },
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Programs:"),
                                createElement("select", { class: "control-text-field", id: "programs", style: "height:37px;", onChange: (evt) => {
                                        debugger;
                                        evt.preventDefault();
                                        let element = (document.getElementById("academicYear"));
                                        element.style.visible = false;
                                    }, filter: true },
                                    createElement("option", { value: "" }, "Programs"),
                                    this._vm.getPrograms().map((x) => (createElement("option", { value: x.name }, x.name))))),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Control Type:"),
                                createElement("select", { class: "control-text-field", id: "control", style: "height:37px;", filter: true },
                                    createElement("option", { value: "" }, "Control Type"),
                                    this._vm.getControlType().map((x) => (createElement("option", { value: x.name }, x.name))))),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Academic Year:"),
                                createElement("select", { class: "control-text-field", id: "academicYear", style: "height:37px;", filter: true },
                                    createElement("option", { value: "" }, "Academic Year"),
                                    this._vm.getAcademicYear().map((x) => (createElement("option", { value: x.name }, x.name))))),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px; width: 40%; display: inline-grid;" },
                                    createElement("input", { id: "checkAll", type: "checkbox", name: "checkbox", onChange: (evt) => {
                                            debugger;
                                            evt.preventDefault();
                                            const checked = evt.target.checked;
                                            this._vm.active = checked;
                                        } }),
                                    "Active",
                                    createElement("span", { class: "checkmark" }))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-primary", id: "save", onClick: (evt) => {
                                        evt.preventDefault();
                                        const elements = document.querySelectorAll("[filter]");
                                        const program = elements[1].value;
                                        const controlType = elements[2].value;
                                        const AcademicYear = elements[3].value;
                                        this._vm.addControls(program, controlType, AcademicYear);
                                        this._vm.setControlType();
                                        CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create());
                                        doc.removeChild(temp);
                                    } }, "Save"),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        document.getElementById("close").onclick = hideModal;
    }
}
//# sourceMappingURL=controlModal.js.map