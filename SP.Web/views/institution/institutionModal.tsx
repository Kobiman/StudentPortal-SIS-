import { IView } from "../../IView";
import { InstitutionVm } from "../../viewModels/InstitutionVm";
import { createElement } from "tsx-create-element";
import { App } from "../../app";
import { AppChannel } from "../../appChannel";
import { Constants } from "../../constants";

export class InstitutionModal implements IView {
  constructor(private _vm: InstitutionVm) {}
  async oninitialized(): Promise<void> {}

  render = async (elementId: string): Promise<void> => {
    const temp = (
      <div class="mountcourse-modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <h1>Institution</h1>
              <form class="mountcourses-form">
                <p id="gradeModalTextEdit">
                  <label>Name</label>
                  <input
                    id="surname"
                    binding="Institution.name"
                    type="text"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.institution.name}
                  />
                  <div errors="name"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Code</label>
                  <input
                    type="text"
                    binding="Institution.code"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.institution.code}
                  />
                  <div errors="code"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Postal Address</label>
                  <input
                    type="text"
                    binding="Institution.postalAddress"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.institution.postalAddress}
                  />
                  <div errors="postalAddress"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Email</label>
                  <input
                    type="text"
                    binding="Institution.email"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.institution.email}
                  />
                  <div errors="email"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Country</label>
                  <input
                    type="text"
                    binding="Institution.country"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.institution.country}
                  />
                  <div errors="country"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>City</label>
                  <input
                    type="text"
                    binding="Institution.city"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.institution.city}
                  />
                  <div errors="city"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Telephone</label>
                  <input
                    type="text"
                    binding="Institution.telephone"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.institution.telephone}
                  />
                  <div errors="telephone"></div>
                </p>
                <div class="sp-btn-row">
                  <button id="Save" class="sp-btn sp-btn-primary">
                    Save <i class="fa fa-save"></i>
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
    //doc.textContent = "";
    doc.appendChild(temp);

    let hideModal = async (evt: Event) => {
      evt.preventDefault();

      doc.removeChild(temp);
    };

    let save = async (evt: Event) => {
      evt.preventDefault();
      this._vm.save();

      if (!this._vm.validator.hasErrors) {
        let tr = document.getElementById("institutions");
        tr.textContent = "";
        tr.appendChild(
          <tr>
            <td binding="name"></td>
            <td binding="code"></td>
            <td binding="country"></td>
            <td binding="city"></td>
            <td binding="email"></td>
            <td binding="telephone"></td>
            <td binding="postalAddress"></td>
          </tr>
        );

        doc.removeChild(temp);
      }
    };

    this._vm.bind();
    document.getElementById("close").onclick = hideModal;
    document.getElementById("Save").onclick = save;
  };
}
