import { createElement } from "tsx-create-element";
export class ResultsHead {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("tableHead");
        doc.textContent = "";
        //  document.getElementById("captionText").style.display = "block";
        // let p: HTMLParagraphElement = (
        //      <p id="captionText">Passed Students: Students without trails</p>
        // ); 
        let tr = (createElement("tr", null,
            createElement("th", null, "Sn"),
            createElement("th", null, "Index Number"),
            createElement("th", null, "Name"),
            createElement("th", null, "CuGPA")));
        // doc.appendChild(p);
        doc.appendChild(tr);
    }
}
export class ResultsRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("tableBody");
        doc.textContent = "";
        let i = 0;
        for (let rows of this._vm.eResultsData) {
            let tr = (createElement("tr", null,
                createElement("td", null, ++i),
                createElement("td", null, rows.indexNumber),
                createElement("td", null, rows.name),
                createElement("td", null, rows.cumulativeGPA.toPrecision(3))));
            doc.appendChild(tr);
        }
    }
}
//# sourceMappingURL=resultsSummaryTable.js.map