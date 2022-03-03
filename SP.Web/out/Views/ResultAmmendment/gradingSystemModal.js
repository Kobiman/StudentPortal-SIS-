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
export class GradeSettingsModal {
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
                        createElement("h1", null, "Grade Setup"),
                        createElement("form", { class: "mountcourses-form" },
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Commission Date:"),
                                createElement("input", { id: "cdate", type: "date", class: "edit-text-field", name: "commissionDate", placeholder: "select commission date", style: "margin-top: 1%;", filter: true })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Type:"),
                                createElement("select", { id: "lLimit", type: "number", class: "edit-text-field", style: "margin-top: 1%;", filter: true },
                                    createElement("option", { value: "" }, "Program Status"),
                                    this._vm.getGradeType().map((x) => (createElement("option", { value: x.name }, x.name))),
                                    " ")),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Upper Limit:"),
                                createElement("input", { id: "uLimit", type: "number", class: "edit-text-field", style: "margin-top: 1%;", filter: true })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Lower Limit:"),
                                createElement("input", { id: "lLimit", type: "number", class: "edit-text-field", style: "margin-top: 1%;", filter: true })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Grade:"),
                                createElement("input", { id: "grade", type: "text", class: "edit-text-field", style: "margin-top: 1%;", filter: true })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Grade Point:"),
                                createElement("input", { id: "gradePoint", type: "text", class: "edit-text-field", style: "margin-top: 1%;", filter: true })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Remarks:"),
                                createElement("input", { id: "remarks", type: "text", class: "edit-text-field", style: "margin-top: 1%;", filter: true })),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-primary", id: "save", onClick: (evt) => {
                                        evt.preventDefault();
                                        const elements = document.querySelectorAll("[filter]");
                                        const cDate = elements[0].value;
                                        const type = elements[1].value;
                                        const uLimit = elements[2].value;
                                        const lLimit = elements[3].value;
                                        const grade = elements[4].value;
                                        const gradePoint = elements[5].value;
                                        const remarks = elements[6].value;
                                        this._vm.save(cDate, type, uLimit, lLimit, grade, gradePoint, remarks);
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
//# sourceMappingURL=gradingSystemModal.js.map