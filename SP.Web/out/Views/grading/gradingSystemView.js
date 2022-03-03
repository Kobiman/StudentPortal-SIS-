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
import { GradeSettingsModal } from "./gradingSystemModal";
export class GradingSystemView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getGradingSystem();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Students Results"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { class: "sp-btn sp-btn-primary ", id: "gradeModal", style: "float:right" }, "Add"))),
                createElement("div", null,
                    createElement("div", { class: "results-horizontal" },
                        createElement("table", { class: "table" },
                            createElement("thead", null,
                                createElement("th", { colspan: "2" }, "No"),
                                createElement("th", { colspan: "2" }, "Type"),
                                createElement("th", { colspan: "1" }, "Commission Date")),
                            createElement("tbody", { id: "results" }, new ResultsRow(this._vm).create())))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            new GradeSettingsModal(this._vm).render("route-outlet");
        });
        document.getElementById("gradeModal").onclick = showModal;
    }
}
export class ResultsRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    createRows() {
        let rows = [];
        let i = 0;
        for (var grading of this._vm.groupedGrades) {
            let row = createElement("tr", null,
                createElement("td", { colspan: "2" }, ++i),
                createElement("td", { colspan: "2" }, grading.type),
                createElement("td", { colspan: "1" }, grading.commissionDate.split("T")[0].replaceAll("-", "/")));
            rows.push(row);
            rows.push(this.createHeader(grading.results));
            rows.push(createElement("tr", null,
                createElement("td", { colspan: "4" })));
            rows.push(createElement("tr", null,
                createElement("td", { colspan: "4" })));
        }
        return rows;
    }
    createHeader(results) {
        return createElement("tr", null,
            createElement("td", { colspan: "5" },
                createElement("table", { class: "table", onMouseOver: "this.style.background='#fff';", style: "width:100%;" },
                    createElement("thead", { style: "background:#f6f6f6;" },
                        createElement("tr", null,
                            createElement("td", null, "Grade"),
                            createElement("td", null, "Uppper Limit"),
                            createElement("td", null, "Lower Limit"),
                            createElement("td", null, "Remark"),
                            createElement("td", null, "Grade Point"))),
                    createElement("tbody", null, results.map(x => createElement("tr", { onMouseOver: "this.style.background='#fff';" },
                        createElement("td", null, x.grade),
                        createElement("td", null, x.upperLimit),
                        createElement("td", null, x.lowerLimit),
                        createElement("td", null, x.gradeRemarks),
                        createElement("td", null, x.gradePoint)))))));
    }
    create() {
        return this.createRows();
    }
}
//# sourceMappingURL=gradingSystemView.js.map