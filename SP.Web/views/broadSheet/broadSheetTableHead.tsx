import { createElement } from "tsx-create-element";
import { BroadSheetVm } from "../../viewModels/broadSheetVm";


export class BroadSheetTableHead {
    constructor(private _vm: BroadSheetVm) {
    }
     render(){
      const doc = document.getElementById("generateHead");
      doc.textContent = "";
            let tr: HTMLTableRowElement = (
                <tr>
                    <th>NO</th>
                    <th>INDEX NO.</th>
                    <th>NAME</th>
                    {this._vm.getHeaderCols().map((headerItem) => (
                    <th title={headerItem.split(".")[1].trim()} class="parentCell">
                        {headerItem.split(".")[0].trim()}
                    </th>
                    ))}
                    <th title="Semester Credit">SCRD</th>
                    <th title="Semester GPA">SGPA</th>
                    <th title="Actual Credit">ACRD</th>
                    <th title="Earned Credit">ECRD</th>
                    <th title="Cummulative Credit">CUCRD</th>
                    <th title="Cummulative GPA">CUGPA</th>
                    <th width="5%">REMARK</th>
                </tr>        
            );
            doc.appendChild(tr);
         }
       } 
     