import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { App } from "../../app";
import { CourseVm } from "../../viewModels/courseVm";

export class CourseModal implements IView {
  constructor(private _vm: CourseVm) {}
  async oninitialized(): Promise<void> {
    await this._vm.getCourses();
  }
  render(elementId: string): void {
    const temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <h1>Course</h1>
              <div class="mountcourses-form">
                <p>
                  <label>Department</label>
                  <select
                    id="departments"
                    binding="Course.department"
                    value={this._vm.course.department}
                    data-repeat="departments"
                  >
                    <option binding="name"></option>
                  </select>
                  <div errors="department"></div>
                </p>
                <p>
                  <label>Name</label>
                  <input
                    binding="Course.courseName"
                    type="text"
                    value={this._vm.course.courseName}
                  />
                  <div errors="name"></div>
                </p>
                <p>
                  <label>Code</label>
                  <input
                    type="text"
                    binding="Course.code"
                    value={this._vm.course.code}
                  />
                  <div errors="code"></div>
                </p>
                <p>
                  <label>Credit</label>
                  <input
                    type="number"
                    binding="Course.credit"
                    value={this._vm.course.credit}
                  />
                  <div errors="credit"></div>
                </p>
                <div class="sp-btn-row">
                  <button id="Save" class="sp-btn sp-btn-primary">
                    Save <i class="fas fa-save"></i>
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
    };

    let hideModal = async (evt: Event) => {
      evt.preventDefault();
      doc.removeChild(temp);
    };

    this._vm.bind();
    this._vm.bindList("departments");
    document.getElementById("close").onclick = hideModal;
    document.getElementById("Save").onclick = save;
  }
}
