import { createElement } from "tsx-create-element";
import { ProgramViewModel } from "../../viewModels/programVm";

export class ProgramTableHead {
    constructor(private _vm: ProgramViewModel) {
    }
     render(){
      const doc = document.getElementById("generateHead");
      doc.textContent = "";
            let tr: HTMLTableRowElement = (
                <tr>
                    <th>No.</th>
                    <th>Levels</th>
                    <th>No. of Stds</th>
                    <th>Min Credit</th>
                    <th>Max credit</th>
                    <th>Male</th>
                    <th>Female</th>
                    <th>Download</th>
                </tr>        
            );
            doc.appendChild(tr);
         }
       } 