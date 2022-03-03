import { IView } from "../../IView";
import { LookupVm } from "../../viewModels/lookupVm";
import { createElement } from "tsx-create-element";
import { App } from "../../app";

export class LookupModal implements IView {
  constructor(private _vm: LookupVm) {}
  async oninitialized(): Promise<void> {}

  render(elementId: string): void {
    const temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <h1>Lookup</h1>
              <div class="mountcourses-form">
                <p>
                  <label>Institution</label>
                  <select
                    id="institutions"
                    binding="Lookup.institution"
                    value={this._vm.lookup.institution}
                    data-repeat="institutions"
                  >
                    <option binding="name"></option>
                  </select>
                  <div errors="institution"></div>
                </p>
                <p>
                  <label>Type</label>
                  <select
                    id="lookupTypes"
                    binding="Lookup.type"
                    value={this._vm.lookup.type}
                    data-repeat="lookupTypes"
                  >
                    <option binding="name"></option>
                  </select>
                  <div errors="type"></div>
                </p>
                <p>
                  <label>Name</label>
                  <input
                    binding="Lookup.name"
                    type="text"
                    value={this._vm.lookup.name}
                  />
                  <div errors="name"></div>
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

    let save = async (evt: Event) => {
      evt.preventDefault();
      this._vm.save();
      if (!this._vm.validator.hasErrors) {
        let tr = document.getElementById("lookups");
        tr.textContent = "";
        tr.appendChild(
          <tr>
            <td binding="name"></td>
            <td binding="type"></td>
          </tr>
        );

        doc.removeChild(temp);
      }
    };

    let hideModal = async (evt: Event) => {
      evt.preventDefault();
      doc.removeChild(temp);
    };

    this._vm.bind();
    this._vm.bindList("institutions");
    this._vm.bindList("lookupTypes");
    document.getElementById("close").onclick = hideModal;
    document.getElementById("Save").onclick = save;
  }
}
