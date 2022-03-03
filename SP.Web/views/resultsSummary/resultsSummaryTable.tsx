import { createElement } from "tsx-create-element";
import { ResultsSummaryVm } from "../../viewModels/resultsSummaryVm";

export class ResultsHead {
    constructor(private _vm: ResultsSummaryVm) {
    }
     render(){
         const doc = document.getElementById("tableHead");         
         doc.textContent = "";
        //  document.getElementById("captionText").style.display = "block";
        // let p: HTMLParagraphElement = (
        //      <p id="captionText">Passed Students: Students without trails</p>
        // ); 
        
         let tr: HTMLTableRowElement = (
            <tr>
                <th>Sn</th>
                <th>Index Number</th>
                <th>Name</th>                   
                <th>CuGPA</th>
            </tr> 
         );   
        // doc.appendChild(p);
        doc.appendChild(tr);
     }
}
  
export class ResultsRow {
    constructor(private _vm: ResultsSummaryVm) {
    }
    render() {
        
        const doc = document.getElementById("tableBody");
        doc.textContent = "";
        let i = 0;
        for (let rows of this._vm.eResultsData) {
            
            let tr: HTMLTableRowElement = (
                <tr>
                    <td>{++i}</td>
                    <td>{rows.indexNumber}</td>
                    <td>{rows.name}</td>
                    <td>{rows.cumulativeGPA.toPrecision(3)}</td>                  
                </tr>
            );           
            doc.appendChild(tr);
        }
    }
}
  
