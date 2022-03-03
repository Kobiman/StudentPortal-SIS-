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
import { ProgramModal } from "./programModal";
import { _ } from "../../group";
import { ProgramTableRow } from "./programRowTable";
import { ProgramTableHead } from "./programHeadTable";
import { SpecializationTable, SpecializationTableHead } from "./specializationTable";
export class ProgramView {
    constructor(_vm) {
        this._vm = _vm;
        this.addClickEvent = () => __awaiter(this, void 0, void 0, function* () {
            let showDetails = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target.parentElement;
                if (row.cells) {
                    const name = row.cells[1].innerText;
                    this._vm.prog = name;
                    yield this._vm.getSpecialization(name);
                    new ProgramTableHead(this._vm).render();
                    new ProgramTableRow(this._vm).render();
                    new SpecializationTableHead(this._vm).render();
                    new SpecializationTable(this._vm).render();
                    document.getElementById("programName").style.visibility = "visible";
                }
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
            yield this._vm.getStudents();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Program List"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "addProgram", style: "float:right", onClick: (evt) => {
                                evt.preventDefault();
                                new ProgramModal(this._vm).render("route-outlet");
                            } }, "Add")),
                    createElement("div", null,
                        createElement("table", { class: "table-hd", id: "programViewHead" },
                            createElement("thead", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Name"),
                                createElement("th", null, "Duration"),
                                createElement("th", null))),
                        createElement("div", { class: "horizontal-program" },
                            createElement("table", { class: "table css-serial", id: "programView" },
                                createElement("thead", { hidden: true },
                                    createElement("tr", null,
                                        createElement("th", null, "No."),
                                        createElement("th", null, "Name"),
                                        createElement("th", null, "Duration"),
                                        createElement("th", null, "Edit"))),
                                this._vm.programs.map(x => createElement("tbody", { id: "programs", "data-repeat": "programs" },
                                    createElement("tr", null,
                                        createElement("td", null),
                                        createElement("td", null, x.name),
                                        createElement("td", null, x.duration),
                                        createElement("td", null,
                                            createElement("button", { class: "sp-btn td-btn", onClick: (evt) => {
                                                    evt.preventDefault();
                                                    let row = evt.target.parentElement.parentElement;
                                                    const programName = row.cells[1].innerText;
                                                    this._vm.getProgram(programName);
                                                    new ProgramModal(this._vm).render("route-outlet");
                                                } },
                                                createElement("i", { class: "fas fa-edit" }, " "),
                                                "Edit"),
                                            "  ")))))),
                        createElement("div", null,
                            createElement("div", { class: "" },
                                createElement("div", { class: "sp-row-col-program" },
                                    createElement("div", { class: "specialization-info" },
                                        createElement("h3", { class: "edit-specialization-header", id: "programName", style: "visibility:hidden" }, `Specializations: ${this._vm.prog}`),
                                        createElement("div", { class: "specialization-view" },
                                            createElement("table", { id: "specializationsTable", class: "table edit-table" },
                                                createElement("thead", { id: "specializationsHead" }),
                                                createElement("tbody", { id: "specializationsBody" }))),
                                        createElement("div", { class: "left-profile-edit" })),
                                    createElement("div", { clas: "profile-fields" },
                                        createElement("div", { class: "horizontal-edit-dept" },
                                            createElement("table", { class: "table edit-table" },
                                                createElement("thead", { id: "generateHead" }),
                                                createElement("tbody", { id: "statistics" }))))))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this.addClickEvent();
        _.syncTable("programViewHead", "programView");
    }
}
//# sourceMappingURL=programView.js.map