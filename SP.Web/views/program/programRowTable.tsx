import { createElement } from "tsx-create-element";
import { ProgramViewModel } from "../../viewModels/programVm";


export class ProgramTableRow {
    constructor(private _vm: ProgramViewModel) {
    }
     render(){
         const doc = document.getElementById("statistics");         
         doc.textContent = "";
         
         for (let rows of this._vm.fillTable(this._vm.prog)) {        
            let row = rows.map(x=> <td>{x}</td>);
            let tr: HTMLTableRowElement = (
                <tr> 
                    {row}
                    <td>
                        <button class="sp-btn td-btn" button
                            onClick={(evt: Event) => {
                                let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                                const level = row.cells[1].innerText;
                                this._vm.download_csv(level);
                            }}
                        >
                        <i class="fas fa-download"> </i>
                        Excel
                      </button>  
                     </td>
                </tr>
            );
            doc.appendChild(tr);
      }
     }
  }