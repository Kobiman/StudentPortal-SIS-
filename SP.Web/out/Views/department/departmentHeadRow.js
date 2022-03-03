import { createElement } from "tsx-create-element";
export class DepartmentTableRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("statistics");
        doc.textContent = "";
        let i = 0;
        for (let rows of this._vm.fillTable()) {
            let row = rows.map((x) => createElement("td", null, x));
            let tr = (createElement("tr", null,
                createElement("td", null, ++i),
                row,
                createElement("td", null,
                    createElement("button", { class: "sp-btn td-btn", button: true, onClick: (evt) => {
                            let row = evt.target.parentElement
                                .parentElement;
                            const program = row.cells[1].innerText;
                            this._vm.download_csv(program);
                        } },
                        createElement("i", { class: "fa fa-download" }, " "),
                        "Excel"))));
            doc.appendChild(tr);
        }
    }
}
//# sourceMappingURL=departmentHeadRow.js.map