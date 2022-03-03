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
export class Stage1 {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            const temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "sp-row" },
                    createElement("h1", null, "Personal Details"),
                    createElement("form", { class: "sp-form" },
                        createElement("div", { class: "left" },
                            createElement("p", null,
                                createElement("label", null, "Index Number"),
                                createElement("input", { id: "indexNumber", binding: "Student.IndexNumber", type: "text", value: this._vm.student.IndexNumber }),
                                createElement("div", { errors: "IndexNumber" })),
                            createElement("p", null,
                                createElement("label", null, "Reference Number"),
                                createElement("input", { type: "text", binding: "Student.ReferenceNumber", value: this._vm.student.ReferenceNumber }),
                                createElement("div", { errors: "ReferenceNumber" })),
                            createElement("p", null,
                                createElement("label", null, "Title"),
                                createElement("input", { type: "text", binding: "Student.Title", value: this._vm.student.Title })),
                            createElement("p", null,
                                createElement("label", null, "Surname"),
                                createElement("input", { type: "text", binding: "Student.Surname", value: this._vm.student.Surname }),
                                createElement("div", { errors: "Surname" })),
                            createElement("p", null,
                                createElement("label", null, "Othernames"),
                                createElement("input", { type: "text", binding: "Student.Othernames", value: this._vm.student.Othernames }),
                                createElement("div", { errors: "Othernames" }))),
                        createElement("div", { class: "right" },
                            createElement("p", null,
                                createElement("label", null, "Date Of Birth"),
                                createElement("input", { type: "date", id: "sp-date", binding: "Student.DateofBirth", value: this._vm.student.DateofBirth }),
                                createElement("div", { errors: "DateofBirth" })),
                            createElement("p", null,
                                createElement("label", null, "Gender"),
                                createElement("input", { type: "text", binding: "Student.Gender", value: this._vm.student.Gender }),
                                createElement("div", { errors: "Gender" })),
                            createElement("p", null,
                                createElement("label", null, "MaritalStatus"),
                                createElement("select", { binding: "Student.MaritalStatus", value: this._vm.student.MaritalStatus }, this._vm.maritalStatus.map((x) => (createElement("option", { value: x }, x)))),
                                createElement("div", { errors: "MaritalStatus" })),
                            createElement("p", null,
                                createElement("label", { class: "check-content" },
                                    "Disability",
                                    createElement("input", { type: "checkbox", binding: "Student.Disability", checked: this._vm.student.Disability, value: this._vm.student.Disability }),
                                    createElement("span", { class: "checkmark" })))),
                        createElement("div", { class: "sp-btn-row" }),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default", disabled: "disabled" },
                                createElement("i", { class: "fa fa-chevron-circle-left" }),
                                " Back"),
                            createElement("button", { id: "Next", class: "sp-btn sp-btn-primary", click: "/app/#addStudent/stage2" },
                                "Next ",
                                createElement("i", { class: "fa fa-chevron-circle-right" })))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
            this._vm.bindData();
            let onclick = (evt) => {
                evt.preventDefault();
                var route = element.getAttribute("click");
                this._vm.validate(route, this._vm.stage1_rules());
            };
            const element = document.getElementById("Next");
            element.onclick = onclick;
            //new ViewModelBase().addEventListener('click');
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=stage1.js.map