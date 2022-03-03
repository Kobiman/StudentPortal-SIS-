import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { RegisterCourseVm } from "../../viewModels/registerCourseVm";


export class RegistrationModal implements IView {
  constructor(private _vm: RegisterCourseVm) {}
  async oninitialized(): Promise<void> {

  }

  render(elementId: string): void {
    const temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <h1>Specialization</h1>
              <div class="mountcourses-form">
                <p>
                    <label>Please select your area of Specialization</label>
                    <select class="edit-text-field" id="setSpecialization" style="height:37px; width: 101%;" filter>
                    <option value="">Specializations</option>
                    {this._vm.specializations.map((x) => (
                    <option value={x.specializationId}>{x.name}</option>
                    ))} </select>
                </p>
                <div class="sp-btn-row">
                  <button id="Save" class="sp-btn sp-btn-primary">
                    Save <i class="fa fa-save"></i>
                  </button>
                  <button class="sp-btn sp-btn-default" id="close">
                    Cancel
                  </button>
                </div>
              </div>
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
