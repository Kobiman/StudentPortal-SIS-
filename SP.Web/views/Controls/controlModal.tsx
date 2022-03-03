import { createElement } from "tsx-create-element";
import { CustomRenderer } from "../../customRenderer";
import { ControlsVm } from "../../viewModels/controlsVm";
import { ControlsTr } from "./controlsView";

export class AddControlModal{
    constructor(private _vm: ControlsVm) {
    }
    render(elementId: string) {
         const temp = (
            <div class="mountcourse-modal" id="modal">
                <div class="modal-content">
                    <div class="sp-box" style="margin-top:90px;">
                        <div class="sp-row">
                            <h1>Control Setup</h1>
                            <form class="mountcourses-form">
                                <p id="gradeModalTextEdit">
                                    <label>Programs:</label>
                                     <select class="control-text-field" id="programs" style="height:37px;"
                                         onChange={(evt: Event) => {
                                             debugger
                                             evt.preventDefault();
                                             let element = (document.getElementById("academicYear"));                 
                                                (element as any).style.visible =false;
                                    }}filter>
                                        <option value="">Programs</option>
                                        {this._vm.getPrograms().map((x) => (
                                        <option value={x.name}>{x.name}</option>
                                        ))}
                                    </select>
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Control Type:</label>
                                    <select class="control-text-field" id="control" style="height:37px;" filter>
                                        <option value="">Control Type</option>
                                        {this._vm.getControlType().map((x) => (
                                        <option value={x.name}>{x.name}</option>
                                        ))}
                                    </select>
                                </p>
                                <p id="gradeModalTextEdit">
                                    <label>Academic Year:</label>
                                    <select class="control-text-field" id="academicYear" style="height:37px;" filter>
                                        <option value="">Academic Year</option>
                                        {this._vm.getAcademicYear().map((x) => (
                                        <option value={x.name}>{x.name}</option>
                                        ))}
                                    </select>
                                </p>
                                 <p id="gradeModalTextEdit">
                                <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px; width: 40%; display: inline-grid;">
                                    <input id="checkAll" type="checkbox" name="checkbox" 
                                             onChange={(evt: Event) => {
                                        debugger
                                    evt.preventDefault();
                                    const checked = (evt.target as HTMLInputElement).checked;
                                        this._vm.active = checked;
                                    }}>
                                </input>Active
                                    <span class="checkmark"></span>
                                </label>
                                </p>
                                <div class="sp-btn-row">
                                    <button class="sp-btn sp-btn-primary" id="save" onClick={(evt: Event) => {
                                        evt.preventDefault();
                                        const elements = document.querySelectorAll("[filter]");
                                        const program = (elements[1] as HTMLInputElement).value;
                                        const controlType = (elements[2] as HTMLSelectElement).value;
                                        const AcademicYear = (elements[3] as HTMLInputElement).value;
                                         this._vm.addControls(program, controlType, AcademicYear);
                                         this._vm.setControlType();
                                         CustomRenderer.renderElements("controlBody", new ControlsTr(this._vm).create());
                                          doc.removeChild(temp);
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
      