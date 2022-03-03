import { createElement } from "tsx-create-element";
export class DepartmentTableHead {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("generateHead");
        doc.textContent = "";
        let tr = (createElement("tr", { style: "background-color:#f6f6f6" },
            createElement("th", null, "No."),
            createElement("th", null, "Programs"),
            createElement("th", null, "No. of Stds"),
            createElement("th", null, "Male"),
            createElement("th", null, "Female"),
            createElement("th", null, "Download")));
        doc.appendChild(tr);
    }
}
//# sourceMappingURL=departmentTableHead.js.map