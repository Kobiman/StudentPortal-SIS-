import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ApproveRegistrationVm } from "../../viewModels/approveRegistrationVm";
import { ApproveRegistrationModal} from "./approveRegistrationModal";
import { ApproveRegistrationTableRow } from "./ApproveRegistrationTableRow";
import { UnRegisteredMountedTableRow, UnRegisteredTrailTableRow } from "./UnRegisteredTableRow";


export class RegisteredCourseRow  {
    constructor(private _vm: ApproveRegistrationVm) {

    }
    
    render(): void {
        const doc = document.getElementById("results");
        doc.textContent = "";
        for (let r of this._vm.temporalRegistrationList) {
            var checkbox = (<input id="checkme" type="checkbox" name="checkbox" disabled="true"></input>);
            if(r.status.value){
                checkbox = (<input id="checkme" type="checkbox" name="checkbox" checked="checked" disabled="true"></input>);
            }
            if(!r.status.value){
                let tr: HTMLTableRowElement = (
                    <tr>
                        <td style="color:red;font-weight:bold">{r.indexNumber}</td>
                        <td style="color:red;font-weight:bold">{r.level}</td>
                        <td style="color:red;font-weight:bold">{r.totalCourses}</td>
                        <td style="color:red;font-weight:bold">{r.totalCredit}</td>
                        <td style="color:red;font-weight:bold">{r.pendingTrails}</td>
                        <td style="color:red;font-weight:bold">
                            <button class="sp-btn sp-btn-default btn-small" button>
                                View
                            </button>
                        </td>
                        <td style="color:red;font-weight:bold">
                            <label class="check-content"  style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
                                {checkbox}
                            <span class="checkmark"></span>
                            </label>
                        </td>
                    </tr>
                );          
                doc.appendChild(tr);
            }else if(r.status.value){
                let tr: HTMLTableRowElement = (
                    <tr>
                        <td>{r.indexNumber}</td>
                        <td>{r.level}</td>
                        <td>{r.totalCourses}</td>
                        <td>{r.totalCredit}</td>
                        <td>{r.pendingTrails}</td> 
                            <td>
                                <button class="sp-btn sp-btn-default btn-small" button>
                                    View
                                </button>
                            </td>
                            <td>
                                <label class="check-content"  style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
                                      {checkbox}
                                    <span class="checkmark"></span>
                                </label>
                            </td>
                    </tr>
                );          
                doc.appendChild(tr);
            }else if(r.totalCredit >this._vm.maximunCredit){
                let tr: HTMLTableRowElement = (
                    <tr>
                        <td>{r.indexNumber}</td>
                        <td>{r.level}</td>
                        <td>{r.totalCourses}</td>
                        <td style="color:red;font-weight:bold">{r.totalCredit}</td>
                        <td>{r.pendingTrails}</td> 
                            <td>
                                <button class="sp-btn sp-btn-default btn-small" button>
                                    View
                                </button>
                            </td>
                            <td>
                                <label class="check-content"  style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
                                      {checkbox}
                                    <span class="checkmark"></span>
                                </label>
                            </td>
                    </tr>
                );          
                doc.appendChild(tr);
            }else{
                let tr: HTMLTableRowElement = (
                    <tr>
                        <td>{r.indexNumber}</td>
                        <td>{r.level}</td>
                        <td>{r.totalCourses}</td>
                        <td>{r.totalCredit}</td>
                        <td>{r.pendingTrails}</td> 
                            <td>
                                <button class="sp-btn sp-btn-default btn-small" button>
                                    View
                                </button>
                            </td>
                            <td>
                                <label class="check-content"  style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
                                      {checkbox}
                                    <span class="checkmark"></span>
                                </label>
                            </td>
                    </tr>
                );          
                doc.appendChild(tr);
            }
            

                let showModal = async (evt: Event) => {
                    evt.preventDefault();
                    let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
                    const indexNumber = row.cells[0].innerText;
                    this._vm.indexNumber = indexNumber;
                    this._vm.level = row.cells[1].innerText;
                    new ApproveRegistrationModal(this._vm, indexNumber).render("route-outlet");
                    this._vm.getAcademicYear();
                    await this._vm.getMountedCourses();   
                    // await this._vm.getTrailList();
                    const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                    new ApproveRegistrationTableRow(this._vm).render(registeredCourses, indexNumber);
                    new UnRegisteredMountedTableRow(this._vm,indexNumber).render(registeredCourses);
                    new UnRegisteredTrailTableRow(this._vm,indexNumber).render(registeredCourses);
                   
                  };
        
                const elements = document.querySelectorAll("[button]");
                  elements.forEach(function (element) {
                  (element as HTMLButtonElement).onclick = showModal;
                  });
        }
    }
}