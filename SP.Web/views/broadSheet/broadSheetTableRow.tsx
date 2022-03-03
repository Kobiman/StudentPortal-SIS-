import { createElement } from "tsx-create-element";
import { BroadSheetVm } from "../../viewModels/broadSheetVm";


export class BroadSheetTableRow {
    constructor(private _vm: BroadSheetVm,private checked) {
    }
     render(){
      const doc = document.getElementById("results1");
      doc.textContent = "";
      let i=0;
         for (let rows of this._vm.getTableRows(this.checked)) {
             let row = rows.map((x) => {
                 if (x.toString().includes("-")) {
                     let y = x.split("-");
                     return <td title={y[1]}>{y[0]}</td>
                 }
                 return <td>{x}</td>
                            });
            let tr: HTMLTableRowElement = (
                <tr>
                    <td>{++i}</td>
                    {row}
                </tr>
            );
            doc.appendChild(tr);
      }
     }
  }
