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
export class ProgramModal {
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
                createElement("div", { class: "sp-box" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, "Program"),
                        createElement("div", { class: "mountcourses-form" },
                            createElement("p", null,
                                createElement("label", null, "Department"),
                                createElement("select", { id: "schools", binding: "Program.department", value: this._vm.program.department, "data-repeat": "departments" },
                                    createElement("option", { binding: "name" })),
                                createElement("div", { errors: "department" })),
                            createElement("p", null,
                                createElement("label", null, "Name"),
                                createElement("input", { binding: "Program.name", type: "text", placeholder: "Program Name", value: this._vm.program.name }),
                                createElement("div", { errors: "name" })),
                            createElement("p", null,
                                createElement("label", null, "Duration"),
                                createElement("input", { binding: "Program.duration", type: "number", placeholder: "Duration", value: this._vm.program.duration }),
                                createElement("div", { errors: "duration" })),
                            CreditLimitView.create(),
                            createElement("p", null,
                                createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "Add" }, "Add")),
                            createElement("p", null,
                                createElement("label", null, "Specialization")),
                            createElement("p", { id: "specialization" },
                                createElement("div", { class: "mc-table" },
                                    createElement("table", { class: "table" },
                                        createElement("tbody", { id: "specializations", "data-repeat": "specializations" })))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { id: "Save", class: "sp-btn sp-btn-primary" },
                                    "Save ",
                                    createElement("i", { class: "fa fa-save" })),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        let addSpecialization = () => {
            new SpecializationView(this._vm).render("specializations");
            var rows = document.getElementById("specializations").rows;
            let sp = {
                name: "",
                type: "",
                level: "",
            };
            let elements = rows[rows.length - 1].querySelectorAll("[binding]");
            sp = this._vm.viewModelHelper.notificationPropertyChange(sp, elements);
            this._vm.addSpecialization(sp);
            rows[rows.length - 1].querySelectorAll("[click]")[0].onclick = removeRow;
        };
        let removeRow = (evt) => {
            evt.preventDefault();
            let row = evt.target.parentElement;
            if (document.getElementById("specializations").rows.length > 1) {
                document.getElementById("specializations").deleteRow(row.rowIndex);
                this._vm.removeSpecialization(row.rowIndex);
            }
        };
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        var rows = document.getElementById("creditLimits").children;
        let maxCredit = rows[1];
        let minCredit = rows[2];
        for (var i = 0; i < maxCredit.children.length; i++) {
            let creditLimit = {
                maxCredit: "",
                minCredit: "",
                level: (100 * (i + 1)).toString(),
            };
            let elements = maxCredit.children[i].querySelectorAll("[binding]");
            let elements2 = minCredit.children[i].querySelectorAll("[binding]");
            creditLimit = this._vm.viewModelHelper.notificationPropertyChange(creditLimit, elements);
            creditLimit = this._vm.viewModelHelper.notificationPropertyChange(creditLimit, elements2);
            this._vm.addCreditLimit(creditLimit);
        }
        addSpecialization();
        let save = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            this._vm.save();
            if (!this._vm.validator.hasErrors) {
                let tr = document.getElementById("programs");
                tr.textContent = "";
                tr.appendChild(createElement("tr", null,
                    createElement("td", { binding: "name" }),
                    createElement("td", { binding: "duration" }),
                    createElement("td", { binding: "specializations" })));
                doc.removeChild(temp);
            }
        });
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        let add = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            addSpecialization();
        });
        this._vm.bind();
        this._vm.bindList("schools");
        document.getElementById("close").onclick = hideModal;
        document.getElementById("Save").onclick = save;
        document.getElementById("Add").onclick = add;
    }
}
export class SpecializationView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        const temp = (createElement("tr", null,
            createElement("td", null,
                createElement("input", { binding: "name", type: "text", placeholder: "Name", style: "margin-bottom: 0px;" })),
            createElement("td", null,
                createElement("select", { binding: "type", style: "margin-bottom: 0px;" },
                    createElement("option", { binding: "name" }, " "),
                    this._vm.getSpecializations("SPECIALIZATION").map(x => createElement("option", { binding: "name" }, x.name)))),
            createElement("td", null,
                createElement("select", { binding: "level", style: "margin-bottom: 0px;" },
                    createElement("option", { binding: "name" }, " "),
                    this._vm.getSpecializations("LEVEL").map(x => createElement("option", { binding: "name" }, x.name)))),
            createElement("td", null,
                createElement("button", { class: "sp-btn sp-btn-default btn-small", click: "" }, "DEL"))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
    }
}
export class CreditLimitView {
    static create() {
        return (createElement("p", { id: "creditLimits" },
            createElement("label", null, "Set Credit Limits"),
            createElement("div", { class: "sp-row-col-4" },
                createElement("p", null,
                    createElement("label", null, "Level 100"),
                    createElement("input", { binding: "maxCredit", type: "number", placeholder: "Max", style: "width: 95%" }),
                    createElement("div", { errors: "maxCredit0" })),
                createElement("p", null,
                    createElement("label", null, "Level 200"),
                    createElement("input", { binding: "maxCredit", type: "number", placeholder: "Max", style: "width: 95%" }),
                    createElement("div", { errors: "maxCredit1" })),
                createElement("p", null,
                    createElement("label", null, "Level 300"),
                    createElement("input", { binding: "maxCredit", type: "number", placeholder: "Max", style: "width: 95%" }),
                    createElement("div", { errors: "maxCredit2" })),
                createElement("p", null,
                    createElement("label", null, "Level 400"),
                    createElement("input", { binding: "maxCredit", type: "number", placeholder: "Max", style: "width: 95%" }),
                    createElement("div", { errors: "maxCredit3" }))),
            createElement("div", { class: "sp-row-col-4" },
                createElement("p", null,
                    createElement("input", { binding: "minCredit", type: "number", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit0" })),
                createElement("p", null,
                    createElement("input", { binding: "minCredit", type: "number", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit1" })),
                createElement("p", null,
                    createElement("input", { binding: "minCredit", type: "number", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit2" })),
                createElement("p", null,
                    createElement("input", { binding: "minCredit", type: "number", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit3" })))));
    }
}
//# sourceMappingURL=programModal.js.map