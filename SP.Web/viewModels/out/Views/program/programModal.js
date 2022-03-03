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
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Department"),
                                createElement("select", { id: "department", binding: "Program.department", class: "edit-text-field", value: this._vm.program.department }, this._vm.departments.map(x => createElement("option", { binding: "name" }, x.name))),
                                createElement("div", { errors: "department" })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Name"),
                                createElement("input", { binding: "Program.name", type: "text", placeholder: "Program Name", class: "edit-text-field", style: "margin-top: 1%;width:-webkit-fill-available", value: this._vm.program.name }),
                                createElement("div", { errors: "name" })),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Duration"),
                                createElement("input", { binding: "Program.duration", type: "text", placeholder: "Duration", class: "edit-text-field", style: "margin-top: 1%;width:-webkit-fill-available", value: this._vm.program.duration }),
                                createElement("div", { errors: "duration" })),
                            new CreditLimitView(this._vm).create(),
                            createElement("p", null,
                                createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "Add" }, "Add")),
                            createElement("p", { id: "gradeModalTextEdit" },
                                createElement("label", null, "Specialization")),
                            createElement("p", { id: "specialization" },
                                createElement("div", { class: "mc-table", style: "overflow-y:scroll; max-height:190px" },
                                    createElement("table", { class: "table" },
                                        createElement("tbody", { id: "specializations" })))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { id: "Save", class: "sp-btn sp-btn-primary" }, "Save"),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        let addSpecialization = () => {
            new SpecializationView(this._vm, null).render("specializations");
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
            let row = evt.target.parentElement.parentElement;
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
            let creditLimit = {};
            creditLimit = this._vm.program.creditLimits.find((x) => x.level === `${(100 * (i + 1))}`);
            if (creditLimit) {
                maxCredit.children[i].children[1].value = creditLimit.maxCredit;
                minCredit.children[i].children[0].value = creditLimit.minCredit;
            }
            else {
                creditLimit = {
                    maxCredit: 0,
                    minCredit: 0,
                    level: (100 * (i + 1)).toString(),
                };
            }
            let elements = maxCredit.children[i].querySelectorAll("[binding]");
            let elements2 = minCredit.children[i].querySelectorAll("[binding]");
            creditLimit = this._vm.viewModelHelper.notificationPropertyChange(creditLimit, elements);
            creditLimit = this._vm.viewModelHelper.notificationPropertyChange(creditLimit, elements2);
            this._vm.addCreditLimit(creditLimit);
        }
        if (this._vm.program.specializations.length == 0) {
            addSpecialization();
        }
        else {
            for (var sp of this._vm.program.specializations) {
                new SpecializationView(this._vm, sp).render("specializations");
                let rows = document.getElementById("specializations").rows;
                let elements = rows[rows.length - 1].querySelectorAll("[binding]");
                elements[1].value = sp.type;
                elements[5].value = sp.level;
                sp = this._vm.viewModelHelper.notificationPropertyChange(sp, elements);
                rows[rows.length - 1].querySelectorAll("[click]")[0].onclick = removeRow;
            }
            let department = document.getElementById("department");
            department.setAttribute("disabled", "true");
            department.value = this._vm.program.department;
        }
        let save = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            yield this._vm.saveProgram();
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
            this._vm.clearCreditlimits();
        });
        let add = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            addSpecialization();
        });
        this._vm.bind();
        document.getElementById("close").onclick = hideModal;
        document.getElementById("Save").onclick = save;
        document.getElementById("Add").onclick = add;
    }
}
export class SpecializationView {
    constructor(_vm, sp) {
        this._vm = _vm;
        this.sp = sp;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        let temp = "";
        if (this.sp === null) {
            (temp = createElement("tr", null,
                createElement("td", null,
                    createElement("input", { binding: "name", type: "text", placeholder: "Name", class: "edit-text-field", style: "margin-bottom: 0px;" })),
                createElement("td", null,
                    createElement("select", { binding: "type", class: "edit-text-field", style: "margin-bottom: 0px;" },
                        createElement("option", { binding: "name" }, "Type"),
                        this._vm.getSpecializations("SPECIALIZATION").map(x => createElement("option", { binding: "name" }, x.name)))),
                createElement("td", null,
                    createElement("select", { binding: "level", class: "edit-text-field", style: "margin-bottom: 0px;" },
                        createElement("option", { binding: "name" }, "Level"),
                        this._vm.getSpecializations("LEVEL").map(x => createElement("option", { binding: "level" }, x.name)))),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small", click: "" }, "DEL"))));
        }
        else {
            temp = (createElement("tr", null,
                createElement("td", null,
                    createElement("input", { binding: "name", type: "text", placeholder: "Name", style: "margin-bottom: 0px;", value: this.sp.name })),
                createElement("td", null,
                    createElement("select", { binding: "type", style: "margin-bottom: 0px;" }, this._vm.getSpecializations("SPECIALIZATION").map(x => createElement("option", { binding: "name" }, x.name)))),
                createElement("td", null,
                    createElement("select", { binding: "level", style: "margin-bottom: 0px;" }, this._vm.getSpecializations("LEVEL").map(x => createElement("option", { binding: "name" }, x.name)))),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small", click: "" }, "DEL"))));
        }
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
    }
}
export class CreditLimitView {
    constructor(_vm) {
        this._vm = _vm;
    }
    create() {
        return (createElement("p", { id: "creditLimits" },
            createElement("label", { id: "gradeModalTextEdit" }, "Set Credit Limits"),
            createElement("div", { class: "sp-row-col-4" },
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("label", null, "Level 100"),
                    createElement("input", { binding: "maxCredit", type: "number", class: "edit-text-field", placeholder: "Max", style: "margin-bottom: 4%;height: 37%;" }),
                    createElement("div", { errors: "maxCredit0" })),
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("label", null, "Level 200"),
                    createElement("input", { binding: "maxCredit", type: "number", class: "edit-text-field", placeholder: "Max", style: "margin-bottom: 4%;height: 37%;" }),
                    createElement("div", { errors: "maxCredit1" })),
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("label", null, "Level 300"),
                    createElement("input", { binding: "maxCredit", type: "number", class: "edit-text-field", placeholder: "Max", style: "margin-bottom: 4%;height: 37%;" }),
                    createElement("div", { errors: "maxCredit2" })),
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("label", null, "Level 400"),
                    createElement("input", { binding: "maxCredit", type: "number", class: "edit-text-field", placeholder: "Max", style: "margin-bottom: 4%;height: 37%;" }),
                    createElement("div", { errors: "maxCredit3" }))),
            createElement("div", { class: "sp-row-col-4" },
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("input", { binding: "minCredit", type: "number", class: "edit-text-field", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit0" })),
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("input", { binding: "minCredit", type: "number", class: "edit-text-field", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit1" })),
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("input", { binding: "minCredit", type: "number", class: "edit-text-field", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit2" })),
                createElement("p", { id: "gradeModalTextEdit" },
                    createElement("input", { binding: "minCredit", type: "number", class: "edit-text-field", placeholder: "Min", style: "width: 95%" }),
                    createElement("div", { errors: "minCredit3" })))));
    }
}
//# sourceMappingURL=programModal.js.map