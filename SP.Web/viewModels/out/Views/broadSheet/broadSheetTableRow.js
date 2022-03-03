import { createElement } from "tsx-create-element";
export class BroadSheetTableRow {
    constructor(_vm, checked) {
        this._vm = _vm;
        this.checked = checked;
    }
    render() {
        const doc = document.getElementById("results1");
        doc.textContent = "";
        let i = 0;
        for (let rows of this._vm.getTableRows(this.checked)) {
            let row = rows.map((x) => {
                if (x.toString().includes("-")) {
                    let y = x.split("-");
                    return createElement("td", { title: y[1] }, y[0]);
                }
                return createElement("td", null, x);
            });
            let tr = (createElement("tr", null,
                createElement("td", null, ++i),
                row));
            doc.appendChild(tr);
        }
    }
}
//# sourceMappingURL=broadSheetTableRow.js.map