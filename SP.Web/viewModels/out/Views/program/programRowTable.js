import { createElement } from "tsx-create-element";
export class ProgramTableRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("statistics");
        doc.textContent = "";
        for (let rows of this._vm.fillTable(this._vm.prog)) {
            let row = rows.map(x => createElement("td", null, x));
            let tr = (createElement("tr", null,
                row,
                createElement("td", null,
                    createElement("button", { class: "sp-btn td-btn", button: true, onClick: (evt) => {
                            let row = evt.target.parentElement.parentElement;
                            const level = row.cells[1].innerText;
                            this._vm.download_csv(level);
                        } },
                        createElement("i", { class: "fas fa-download" }, " "),
                        "Excel"))));
            doc.appendChild(tr);
        }
    }
}
//# sourceMappingURL=programRowTable.js.map