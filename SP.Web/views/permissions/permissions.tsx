import { createElement } from "tsx-create-element";
import { _ } from "../../group";
import { IView } from "../../IView";
import { PermissionVm } from "../../viewModels/permissionsVm";
import { PermissionsModal } from "./permissionsModal";
import { PermissionTable } from "./permissionTable";


export class PermissionView implements IView {
    constructor(private _vm: PermissionVm) {

    }
    async oninitialized(): Promise<void> {
      await this._vm.getPages();
      await this._vm.getUsers(); 
    }
    render(elementId: string): void {
        var temp = (
            <div class="sp-box">
                <div class="mc-row">
                    <h1>Permissions View </h1>
                    <div class="sp-btn-row">
                    <button class="sp-btn sp-btn-primary" id="addPermission" onClick={(evt: Event) => {
                                evt.preventDefault();
                                new PermissionsModal(this._vm).render("route-outlet");
                            }}>
                      Add
                    </button>
                    </div>               
                    <div class="mountcourses-form">
                        <div class="permission-filter">
                            <div id="permissionSearch">
                                <input type="text" name="answer" placeholder="search here." autofocus onkeyup={() => {                      
                                    }} id="searchByUserId"/>
                            </div>
                            <div class="sp-btn-row">
                                <button class="sp-btn sp-btn-default" id="addPermissions" style="float:right" onClick={async(evt: Event) => {
                                        evt.preventDefault();
                                        //this.tableSearch();
                                    await this._vm.getStaffDetails((document.getElementById("searchByUserId")as any).value);
                                    new PermissionTable(this._vm).render();
                                    }}>
                                    SEARCH
                                </button>
                                </div>
                            </div>
                        <div>
                        <div>
                            <table class="table-hd" id="permissionViewHead">
                            <thead >
                                <th>No.</th>
                                <th>STAFF NAME</th>
                                {/* <th>DEPARTMENT</th> */}
                                <th>EMAIL</th>
                                <th>Edit</th>
                            </thead>
                            </table>
  
                            <div class="horizontal-edit">
                                <table class="table css-serial" id="permissionView">
                                <thead class="table" hidden>
                                    <tr>
                                        <th>No.</th>
                                        <th>Username</th>
                                        <th>User ID</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody id="userPermission">                                 
                                </tbody>
                                </table>
                            </div>
                            {/* <div class="edit-content">
                                <div class="profile-form">
                                <div class="sp-row-col-2-2-2">
                                    <div class="user-info">
                                    <h3 class="edit-info-headers">Permission Details:</h3>
                                    <div class="edit-profile-info">        
                                        <label>Username:
                                        <br/> <span id="code1"></span>
                                        </label>
                                        <label>User ID:
                                        <br/><span id="name1"></span>
                                        </label>
                                    </div>
                                    </div>
                                    <div clas="profile-fields">                    
                                    <form class="edit-details">
                                        <div class="left-profile-edit">
                                        <p>
                                            <label>Roles List</label>
                                            <select name="setPermission" id="permissions" multiple multiselect-search="true" multiselect-select-all="true" style="height:250px">
                                                {this._vm.userPermission.map(x => <option value={x}>{x.title}</option>)}
                                            </select>
                                        </p>                          
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div> */}
                        </div>  
                        </div>
                   </div>
                    </div>
                </div>
        );
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
    }

    tableSearch() {
        const searchField = document.getElementById("searchByUserId") as HTMLInputElement;                 
        this._vm.id = searchField.value;
    }
}
