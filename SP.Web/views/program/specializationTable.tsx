import { createElement } from "tsx-create-element";
import { ProgramViewModel } from "../../viewModels/programVm";

export class SpecializationTableHead {
    constructor(private _vm: ProgramViewModel) {
    }
     render(){
         const doc = document.getElementById("specializationsHead");         
         doc.textContent = "";
         
         let tr: HTMLTableRowElement = (
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Level</th>
                </tr>
            );       
        doc.appendChild(tr);
     }
}
  
export class SpecializationTable {
    constructor(private _vm: ProgramViewModel) {
    }
    render() {
        const doc = document.getElementById("specializationsBody");
        doc.textContent = "";
        for (let rows of this._vm.specialization) {
            
            let tr: HTMLTableRowElement = (
                <tr>
                    <td>{rows.name}</td>
                    <td>{rows.type}</td>
                    <td>{rows.level}</td>
                </tr>
            );
            doc.appendChild(tr);
        }
    }
}
  
