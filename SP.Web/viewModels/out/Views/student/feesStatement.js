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
export class FeesStatementView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getFeesStatus();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Fees Statement"),
                createElement("div", { class: "fees-summary" },
                    createElement("p", { id: "arrears" }, "Arrears"),
                    createElement("p", { id: "balance" }, "Balance")),
                createElement("div", { class: "lect-horizontal" },
                    createElement("table", { class: "table css-serial", id: "lecturerView" },
                        createElement("thead", null,
                            createElement("tr", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Academic Year"),
                                createElement("th", null, "Transaction Date"),
                                createElement("th", null, "Transaction Time"),
                                createElement("th", null, "Debit"),
                                createElement("th", null, "Credit"),
                                createElement("th", null, "Balance"),
                                createElement("th", null, "Naration"),
                                createElement("th", null, "Bank"),
                                createElement("th", null, "Receipt No."))),
                        createElement("tbody", { id: "lecturers", "data-repeat": "results" }, this._vm.statement.map(x => createElement("tr", null,
                            createElement("td", null),
                            createElement("td", null, x.academicYear),
                            createElement("td", null, x.transactionDate.split("T")[0]),
                            createElement("td", null, x.transactionDate.split("T")[1].substring(1, 8)),
                            createElement("td", null, x.debit.toFixed(2)),
                            createElement("td", null, x.credit.toFixed(2)),
                            createElement("td", null, x.balance.toFixed(2)),
                            createElement("td", null, x.naration),
                            createElement("td", null, x.bank),
                            createElement("td", { width: "10%" }, x.receiptNumber.trim())))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this._vm.calculateAmount();
    }
}
//# sourceMappingURL=feesStatement.js.map