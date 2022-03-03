import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { SchoolVm } from "../../viewModels/schoolVm";
import { App } from "../../app";
import { School } from "../../models/school";

export class SchoolModal implements IView {
  constructor(private _vm: SchoolVm) {}
  async oninitialized(): Promise<void> {}
  render(elementId: string): void {
    const temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <h1>School</h1>
              <div class="mountcourses-form">
                <p id="gradeModalTextEdit">
                  <label>Institution</label>
                  <select
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    id="institutions"
                    binding="School.institutionName"
                    value={this._vm.school.institutionName}
                    data-repeat="institutions"
                  >
                    <option binding="institutionNane"></option>
                  </select>
                  <div errors="institutionName"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Name</label>
                  <input
                    binding="School.name"
                    type="text"
                    class="edit-text-field"
                    style="margin-top: 1%;width:-webkit-fill-available"
                    value={this._vm.school.name}
                  />
                  <div errors="name"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Academic Year</label>
                  <select
                    id="academicYears"
                    binding="School.academicYear"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.school.academicYear}
                    data-repeat="academicYears"
                  >
                    <option binding="name">Select Academic Year</option>
                  </select>
                  <div errors="academicYear"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Semester</label>
                  <select
                    id="semesters"
                    binding="School.semester"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.school.semester}
                    data-repeat="semesters"
                  >
                    <option binding="name">Select Semester</option>
                  </select>
                  <div errors="semester"></div>
                </p>
                <p id="gradeModalTextEdit">
                  <label>Dean of School</label>
                  <select
                    id="dean"
                    binding="School.lecturerId"
                    class="edit-text-field"
                    style="margin-top: 1%;"
                    value={this._vm.school.lecturerId}
                    data-repeat="lecturerId"
                  >
                    <option binding="name">Set Dean of Student</option>
                    {this._vm.getLecturers().map((x) => (
                      <option value={x.lecturerId}>{x.name}</option>
                    ))}
                  </select>
                  <div errors="dean"></div>
                </p>
                <div class="sp-btn-row">
                  <button id="Save" class="sp-btn sp-btn-primary">
                    Save
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
    this._vm.school = new School();

    let hideModal = async (evt: Event) => {
      evt.preventDefault();
      doc.removeChild(temp);
    };

    let save = async (evt: Event) => {
      evt.preventDefault();
      this._vm.save();

      if (!this._vm.validator.hasErrors) {
        let tr = document.getElementById("schools");
        tr.textContent = "";
        tr.appendChild(
          <tr>
            <td binding="name"></td>
            <td binding="academicYear"></td>
            <td binding="semester"></td>
          </tr>
        );

        doc.removeChild(temp);
      }
    };

    this._vm.bindList("institutions");
    this._vm.bindList("semesters");
    this._vm.bindList("academicYears");
    this._vm.bind();
    document.getElementById("Save").onclick = save;
    document.getElementById("close").onclick = hideModal;
  }
}
