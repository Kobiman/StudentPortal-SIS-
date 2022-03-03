import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { AddStudentVm } from "../../viewModels/AddStudentVm";
import { App } from "../../app";

export class Stage2 implements IView {
  _vm: AddStudentVm;
  constructor(addStudentVm: AddStudentVm) {
    this._vm = addStudentVm;
  }
  async oninitialized(): Promise<void> {
  }

  render = (elementId: string): void => {
    var temp = (
      <div class="sp-box">
        <div class="sp-row">
          <h1>Contact Details</h1>
          <form class="sp-form">
            <div class="left">
              <p>
                <label>Country</label>
                <input type="text" binding="Student.Country" value={this._vm.student.Country} />
                <div errors="Country"></div>
              </p>
              <p>
                <label>Region</label>
                <input type="text" binding="Student.Region" value={this._vm.student.Region} />
                <div errors="Region"></div>
              </p>
              <p>
                <label>HomeTown</label>
                <input type="text" binding="Student.HomeTown" value={this._vm.student.HomeTown} />
                <div errors="HomeTown"></div>
              </p>
              <p>
                <label>Address1</label>
                <input type="text" binding="Student.Address1" value={this._vm.student.Address1} />
              </p>
              <p>
                <label>Address2</label>
                <input type="text" binding="Student.StudentAddress2" value={this._vm.student.Address2} />
                <div errors="Address2"></div>
              </p>
            </div>
            <div class="right">
              <p>
                <label>Contact1</label>
                <input type="text" binding="Student.Contact1" value={this._vm.student.Contact1} />
                <div errors="Contact1"></div>
              </p>
              <p>
                <label>Contact2</label>
                <input type="text" binding="Student.Contact2" value={this._vm.student.Contact2} />
                <div errors="Contact2"></div>
              </p>
              <p>
                <label>PersonalEmail</label>
                <input type="text" binding="Student.PersonalEmail" value={this._vm.student.PersonalEmail} />
                <div errors="PersonalEmail"></div>
              </p>
              <p>
                <label>University Email</label>
                <input type="text" binding="Student.UniversityEmail" value={this._vm.student.UniversityEmail} />
                <div errors="UniversityEmail"></div>
              </p>
              <p>
                <label>Residential Status</label>
                <input type="text" binding="Student.ResidentialStatus" value={this._vm.student.ResidentialStatus} />
                <div errors="ResidentialStatus">
                  {/* <span>Required</span>
                                 <span>Email</span>
                                 <span>MinLength</span> */}
                </div>
              </p>
            </div>
            <div class="sp-btn-row"></div>
            <div class="sp-btn-row">
              <button id="Back" class="sp-btn sp-btn-default" click="/app/#addStudent/stage1">
                <i class="fa fa-chevron-circle-left"></i> Back
              </button>
              <button id="Next" class="sp-btn sp-btn-primary" click="/app/#addStudent/stage3">
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

    let onNextButtonClicked = (evt: Event) => {
      evt.preventDefault();
      var route = next.getAttribute("click");
      this._vm.validate(route, this._vm.stage2_rules());
    };

    const next = document.getElementById("Next");
    next.onclick = onNextButtonClicked;

    let onBackButtonClicked = (evt: Event) => {
      evt.preventDefault();
      var route = back.getAttribute("click");
      App.navigate(route);
    };

    const back = document.getElementById("Back");
    back.onclick = onBackButtonClicked;
    //new ViewModelHelper().addEventListener(this,'click');
  };
}
