import { createElement } from "tsx-create-element";
export class SpecializationTableHead {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("specializationsHead");
        doc.textContent = "";
        let tr = (createElement("tr", null,
            createElement("th", null, "Name"),
            createElement("th", null, "Type"),
            createElement("th", null, "Level")));
        doc.appendChild(tr);
    }
}
export class SpecializationTable {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("specializationsBody");
        doc.textContent = "";
        for (let rows of this._vm.specialization) {
            let tr = (createElement("tr", null,
                createElement("td", null, rows.name),
                createElement("td", null, rows.type),
                createElement("td", null, rows.level)));
            doc.appendChild(tr);
        }
    }
}
//# sourceMappingURL=specializationTable.js.map