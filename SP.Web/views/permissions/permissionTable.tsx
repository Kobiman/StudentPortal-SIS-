import { createElement } from "tsx-create-element";
import { _ } from "../../group";
import { HttpService } from "../../services/httpService";
import { PermissionVm } from "../../viewModels/permissionsVm";
import { PermissionsModal } from "./permissionsModal";

export class PermissionTable {
    constructor(private _vm: PermissionVm) {
    }
    render() {
        const doc = document.getElementById("userPermission");
        doc.textContent = "";    
    for (let rows of this._vm.userPermission) {            
            let tr: HTMLTableRowElement = (
                <tr>
                     <td></td>
                    <td>{rows.staffName}</td>
                    {/* <td>{rows.staffDepartment}</td> */}
                    <td>{rows.staffEmail}</td>
                    <td><button class="sp-btn td-btn"
                    onClick={async (evt: Event) => {
                    evt.preventDefault();
                    let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                        this._vm.id = row.cells[2].innerText;
                        this._vm.staffId = rows.staffId;
                        await this._vm.getPermissions(rows.staffId);
                    new PermissionsModal(this._vm).render("route-outlet");
                    }}
                >
                <i class="fas fa-edit"> </i>
                Edit
            </button>               
                </td>
                </tr>
            );
            doc.appendChild(tr);
            _.syncTable("permissionViewHead","permissionView");
        }
    
    }
}

 