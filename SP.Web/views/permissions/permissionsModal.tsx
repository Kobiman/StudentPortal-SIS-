import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { HttpService } from "../../services/httpService";
import { Toast } from "../../toast/toast";
import { PermissionVm } from "../../viewModels/permissionsVm";

export class PermissionsModal implements IView {   
    constructor(private _vm: PermissionVm) {
    }
    async oninitialized(): Promise<void> {
    }
    render(elementId: string): void {
        const temp = (
            <div class="mountcourse-modal" id="modal">
                <div class="modal-content">
                    <div class="sp-box" style="margin-top:90px;">
                        <div class="sp-row">
                            <h1>Permissions Setup</h1>
                            <form class="mountcourses-form">                                                                 
                                <p>
                                    <label>User Name</label>
                                    <input id="staffId" type="text" class="edit-text-field" value={this._vm.staffId}
                                        style="margin-bottom: 8px; margin-top: 8px"
                                        onKeyup={async (evt: Event) => {
                                            this.showLecturers(evt);
                                        }} input />
                                    <div class="autocom-box">
                                        <ul id="HoDList">
                                        </ul>
                                    </div>
                                </p>                                
                                <p>
                                <label>Select Page Title</label>
                                    <div class="permissionOlist">
                                        <ol name="setPermission" id="permissions">    
                                            {
                                                this._vm.pages.map(x => <li>
                                                    <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px; width: 30%; display: inline-grid;">
                                                    <input type="checkbox" value={x} />                                                   
                                                        <span style="margin-left: 3%;">{x.title}</span>
                                                     <span class="checkmark"></span>
                                                    </label></li>)   
                                            }
                                        </ol>
                                    </div>
                                </p>                          
                                <div class="sp-btn-row">
                                    <button class="sp-btn sp-btn-default " id="set-permission" onClick={
                                        async (evt: Event) => {
                                            evt.preventDefault();
                                            this.savePermission();
                                        }
                                    }>Set</button>
                                    <button class="sp-btn sp-btn-default" id="close">
                                        Cancel
                                    </button>                                     
                                </div>                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
      
        const doc = document.getElementById(elementId);
        //doc.textContent = "";
        doc.appendChild(temp);

         let hideModal = async (evt: Event) => {
            evt.preventDefault();
            doc.removeChild(temp);
        };
      
        document.getElementById("close").onclick = hideModal;
      
     if (this._vm.staffPermissionsList!=undefined){
        this.setSelectedPermission()
     }
      
    }


   setSelectedPermission()
   {
       debugger
       let permissionList = (document.getElementById("permissions") as any).children;
       for (var i = 0; i < permissionList.length-1; i++) {
           for (var j = 0; j < (this._vm.staffPermissionsList as any).value.length-1; j++) {
               debugger
               if ((this._vm.staffPermissionsList as any).value[j].pageId===(permissionList[i] as any).children[0].children[0].value.split(";")[0].split(":")[1])
               {
                (permissionList[i] as any).getElementsByTagName("input")[0].checked=true;
                   break;
               }
           }
       } 
   }  

   showLecturers = async(evt: Event) => {
     let textbox = (evt.target as HTMLInputElement);
      let lecturers = [];
      if (textbox.value !== '') {         
        lecturers = await this._vm.getLecturer(textbox.value);
      }
      let suggestions = document.getElementById("HoDList");
      suggestions.textContent = '';
      for(var l of lecturers){
        let li = (<li>{l.name}</li> as HTMLLinkElement);
        li.onclick = ()=>{
          textbox.value = li.innerHTML.trim();   
          suggestions.textContent = '';            
          this._vm.department.lecturerId = l.lecturerId;
        }   
        suggestions.appendChild(li);
       }
    }


async  savePermission()
  {
    let permissionList = (document.getElementById("permissions") as any).children;
    let grantedList = [];
    for (var i = 0; i <= permissionList.length - 1; i++) {
      if ((permissionList[i] as any).children[0].children[0].checked) {
        grantedList.push({
          userId: this._vm.department.lecturerId,
          pageId: (permissionList[i] as any).children[0].children[0].value.split(";")[0].split(":")[1],
        });
      }
    }
    let res =await this._vm.save(grantedList);
    if ((res as any).isSucessful){
    Toast.success(res.message);
    (document.getElementById("staffId") as HTMLInputElement).value = "";
    let permissionList = (document.getElementById("permissions") as any).children;;
      for (var i = 0; i <= permissionList.length - 1; i++) {
        if ((permissionList[i] as any).children[0].children[0].checked) {
            (permissionList[i] as any).children[0].children[0].checked = false;
        }
      }
    }else{
      Toast.error(res.message);
     }
    }  
  }
    