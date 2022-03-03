import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { Toast } from "../../toast/toast";
import { PagesVm } from "../../viewModels/pagesVm";


export class PagesModal implements IView {
    constructor(private _vm: PagesVm) {
        
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
                                <form class="">
                                    <div class="">
                                        <p>
                                            <label>Tilte</label><br/>
                                            <input id="showTitles" type="text" class="edit-text-field" style="margin-bottom: 0px;"></input>   
                                        </p>
                                        <p>
                                            <label>Route</label><br/>
                                            <input id="showRoutes" type="text" class="edit-text-field" style="margin-bottom: 0px;"></input>
                                        </p>
                                    </div>
                                </form>  
                                <div class="sp-btn-row">
                                    <button class="sp-btn sp-btn-default " id="set-permission" onKeyup={
                                        async (evt: Event) => {
                                            //this.savePermission();
                                        }
                                    }>Save</button>
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

         
    }
     
}
    