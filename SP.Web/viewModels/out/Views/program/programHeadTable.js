import { createElement } from "tsx-create-element";
export class ProgramTableHead {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("generateHead");
        doc.textContent = "";
        let tr = (createElement("tr", null,
            createElement("th", null, "No."),
            createElement("th", null, "Levels"),
            createElement("th", null, "No. of Stds"),
            createElement("th", null, "Min Credit"),
            createElement("th", null, "Max credit"),
            createElement("th", null, "Male"),
            createElement("th", null, "Female"),
            createElement("th", null, "Download")));
        doc.appendChild(tr);
    }
}
//# sourceMappingURL=programHeadTable.js.map