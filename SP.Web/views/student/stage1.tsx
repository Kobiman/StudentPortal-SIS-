import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { AddStudentVm } from "../../viewModels/AddStudentVm";

export class Stage1 implements IView {
  constructor(private _vm: AddStudentVm) {}
  async oninitialized(): Promise<void> {
  }

  render = (elementId: string): void => {
    const temp = (
      <div class="sp-box">
        <div class="sp-row">
          <h1>Personal Details</h1>
          <form class="sp-form">
            <div class="left">
              <p>
                <label>Index Number</label>
                <input id="indexNumber" binding="Student.IndexNumber" type="text" value={this._vm.student.IndexNumber} />
                <div errors="IndexNumber"></div>
              </p>
              <p>
                <label>Reference Number</label>
                <input type="text" binding="Student.ReferenceNumber" value={this._vm.student.ReferenceNumber} />
                <div errors="ReferenceNumber"></div>
              </p>
              <p>
                <label>Title</label>
                <input type="text" binding="Student.Title" value={this._vm.student.Title} />
              </p>
              <p>
                <label>Surname</label>
                <input type="text" binding="Student.Surname" value={this._vm.student.Surname} />
                <div errors="Surname"></div>
              </p>
              <p>
                <label>Othernames</label>
                <input type="text" binding="Student.Othernames" value={this._vm.student.Othernames} />
                <div errors="Othernames"></div>
              </p>
            </div>
            <div class="right">
              <p>
                <label>Date Of Birth</label>
                <input type="date" id="sp-date" binding="Student.DateofBirth" value={this._vm.student.DateofBirth} />
                <div errors="DateofBirth"></div>
              </p>
              <p>
                <label>Gender</label>
                <input type="text" binding="Student.Gender" value={this._vm.student.Gender} />
                <div errors="Gender"></div>
              </p>
              <p>
                <label>MaritalStatus</label>
                <select binding="Student.MaritalStatus" value={this._vm.student.MaritalStatus}>
                  {this._vm.maritalStatus.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
                <div errors="MaritalStatus"></div>
              </p>
              <p>
                <label class="check-content">
                  Disability
                  <input
                    type="checkbox"
                    binding="Student.Disability"
                    checked={this._vm.student.Disability}
                    value={this._vm.student.Disability}
                  />
                  <span class="checkmark"></span>
                </label>

                {/* <label class="radio-content">One
                                <input type="radio" checked="checked" name="radio"/>
                                <span class="radiomark"></span>
                               </label> */}
              </p>
            </div>
            <div class="sp-btn-row"></div>
            <div class="sp-btn-row">
              <button class="sp-btn sp-btn-default" disabled="disabled">
                <i class="fa fa-chevron-circle-left"></i> Back
              </button>
              <button id="Next" class="sp-btn sp-btn-primary" click="/app/#addStudent/stage2">
                Next <i class="fa fa-chevron-circle-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    this._vm.bindData();

    let onclick = (evt: Event) => {
      evt.preventDefault();
      var route = element.getAttribute("click");
      this._vm.validate(route, this._vm.stage1_rules());
    };

    const element = document.getElementById("Next");
    element.onclick = onclick;
    //new ViewModelBase().addEventListener('click');
  };
}
