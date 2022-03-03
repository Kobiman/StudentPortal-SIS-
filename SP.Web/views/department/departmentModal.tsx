import { IView } from "../../IView";
import { DepartmentVm } from "../../viewModels/departmentVm";
import { createElement } from "tsx-create-element";
import { App } from "../../app";

export class DepartmentModal implements IView {
  constructor(private _vm: DepartmentVm) {}
  async oninitialized(): Promise<void> {}

  render(elementId: string): void {
    const temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <h1>Department</h1>
              <div class="mountcourses-form">
                <p id="gradeModalTextEdit">
                  <label>School</label>
                  <select
                    id="schools"
                    binding="Department.schoolName"
                    value={this._vm.department.schoolName}
                    data-repeat="schools"
                  >
                    <option binding="name"></option>
                  </select>
                  <div errors="schoolName"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Name</label>
                  <input
                    binding="Department.name"
                    type="text"
                    class="edit-text-field"
                    style="margin-top: 1%;width:-webkit-fill-available"
                    value={this._vm.department.name}
                  />
                  <div errors="name"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Code</label>
                  <input
                    type="text"
                    binding="Department.code"
                    class="edit-text-field"
                    style="margin-top: 1%;width:-webkit-fill-available"
                    value={this._vm.department.code}
                  />
                  <div errors="code"></div>
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
        let tr = document.getElementById("departments");
        tr.textContent = "";
        tr.appendChild(
          <tr>
            <td binding="name"></td>
            <td binding="code"></td>
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
    this._vm.bindList("schools");
    document.getElementById("close").onclick = hideModal;
    document.getElementById("Save").onclick = save;
  }
}
