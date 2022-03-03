import { createElement } from "tsx-create-element";
export class BroadSheetTableHead {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("generateHead");
        doc.textContent = "";
        let tr = (createElement("tr", null,
            createElement("th", null, "NO"),
            createElement("th", null, "INDEX NO."),
            createElement("th", null, "NAME"),
            this._vm.getHeaderCols().map((headerItem) => (createElement("th", { title: headerItem.split(".")[1].trim(), class: "parentCell" }, headerItem.split(".")[0].trim()))),
            createElement("th", { title: "Semester Credit" }, "SCRD"),
            createElement("th", { title: "Semester GPA" }, "SGPA"),
            createElement("th", { title: "Actual Credit" }, "ACRD"),
            createElement("th", { title: "Earned Credit" }, "ECRD"),
            createElement("th", { title: "Cummulative Credit" }, "CUCRD"),
            createElement("th", { title: "Cummulative GPA" }, "CUGPA"),
            createElement("th", { width: "5%" }, "REMARK")));
        doc.appendChild(tr);
    }
}
//# sourceMappingURL=broadSheetTableHead.js.map