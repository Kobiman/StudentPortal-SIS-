import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { GradingSystemVm } from "../../viewModels/gradingSystemVm";

export class GradeSettingsModal implements IView {   
    constructor(private _vm: GradingSystemVm) {
    }
    async oninitialized(): Promise<void> {
    }
    render(elementId: string): void {
        
        const temp = (
            <div class="mountcourse-modal" id="modal">
                <div class="modal-content">
                    <div class="sp-box" style="margin-top:90px;">
                        <div class="sp-row">
                            <h1>Grade Setup</h1>
                            <form class="mountcourses-form">
                                <p id="gradeModalTextEdit">
                                    <label>Commission Date:</label>
                                    <input id="cdate" type="date" class="edit-text-field"  name="commissionDate" placeholder="select commission date" style="margin-top: 1%;" filter/>
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Type:</label>
                                    {/* <input id="lLimit" type="number" class="edit-text-field" style="margin-top: 1%;" filter /> */}
                                    {<select id="lLimit" type="number" class="edit-text-field" style="margin-top: 1%;" filter>
                                        <option value="">Program Status</option>
                                        {this._vm.getGradeType().map((x) => (
                                            <option value={x.name}>{x.name}</option>
                                        ))} </select>
                                    }
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Upper Limit:</label>
                                    <input id="uLimit" type="number" class="edit-text-field" style="margin-top: 1%;" filter/>
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Lower Limit:</label>
                                    <input id="lLimit" type="number" class="edit-text-field" style="margin-top: 1%;" filter/>
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Grade:</label>
                                    <input id="grade" type="text" class="edit-text-field" style="margin-top: 1%;" filter/>
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Grade Point:</label>
                                    <input id="gradePoint" type="text" class="edit-text-field" style="margin-top: 1%;" filter/>
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Remarks:</label>
                                    <input id="remarks" type="text" class="edit-text-field" style="margin-top: 1%;" filter/>
                                </p>
                                <div class="sp-btn-row">
                                    <button class="sp-btn sp-btn-primary" id="save" onClick={(evt: Event) => {
                                        evt.preventDefault();
                                        const elements = document.querySelectorAll("[filter]");
                                        const cDate = (elements[0] as HTMLInputElement).value;
                                        const type = (elements[1] as HTMLSelectElement).value;
                                        const uLimit = (elements[2] as HTMLInputElement).value;
                                        const lLimit = (elements[3] as HTMLInputElement).value;
                                        const grade = (elements[4] as HTMLInputElement).value;
                                        const gradePoint = (elements[5] as HTMLInputElement).value;
                                        const remarks = (elements[6] as HTMLInputElement).value;
                                        this._vm.save(cDate,type,uLimit,lLimit,grade,gradePoint,remarks);
                                        }}
                                    >
                                       Save
                                    </button>
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
        doc.appendChild(temp);

       let hideModal = async (evt: Event) => {
            evt.preventDefault();
            doc.removeChild(temp);
    };

        document.getElementById("close").onclick = hideModal;
    }
  }
    