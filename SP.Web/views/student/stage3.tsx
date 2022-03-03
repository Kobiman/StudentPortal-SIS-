import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { AddStudentVm } from "../../viewModels/AddStudentVm";
import { ViewModelHelper } from "../../viewModelHelper";
import { App } from "../../app";

export class Stage3 implements IView {
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
          <h1>Academic Details</h1>
          <form class="sp-form">
            <div class="left">
              <p>
                <label>Program Of Study</label>
                <input type="text" binding="Student.ProgramId" value={this._vm.student.ProgramId} />
                <div errors="ProgramId"></div>
              </p>
              <p>
                <label>Specialization</label>
                <input type="text" binding="Student.Specialization" value={this._vm.student.Specialization} />
                <div errors="Specialization"></div>
              </p>
              <p>
                <label>ProgramStatus</label>
                <input type="text" binding="Student.ProgramStatus" value={this._vm.student.ProgramStatus} />
                <div errors="ProgramStatus"></div>
              </p>
              <p>
                <label>Level</label>
                <input type="text" binding="Student.Level" value={this._vm.student.Level} />
                <div errors="Level"></div>
              </p>
            </div>
            <div class="right">
              <p>
                <label>StudentType</label>
                <input type="text" binding="Student.StudentType" value={this._vm.student.StudentType} />
                <div errors="StudentType"></div>
              </p>
              <p>
                <label>Enrolment Option</label>
                <input type="text" binding="Student.EnrolmentOption" value={this._vm.student.EnrolmentOption} />
                <div errors="EnrolmentOption"></div>
              </p>
              <p>
                <label>DateOfEntry</label>
                <input type="date" binding="Student.DateOfEntry" value={this._vm.student.DateOfEntry} />
                <div errors="DateOfEntry"></div>
              </p>
              {/* <p>
                               <label>Registration Status</label>
                               <input type="text" binding="RegistrationStatus" value={this._vm.student.RegistrationStatus}/>
                             </p>
                             <p>
                               <label>University Email</label>
                               <input type="text" binding="UniversityEmail" value={this._vm.student.DateOfCompletion}/>
                             </p>
                             <p>
                               <label>Residential Status</label>
                               <input type="text" binding="ResidentialStatus" value={this._vm.student.ResidentialStatus}/>
                             </p> */}
            </div>
            <div class="sp-btn-row"></div>
            <div class="sp-btn-row">
              <button id="Back" class="sp-btn sp-btn-default" click="/app/#addStudent/stage2">
                <i class="fa fa-chevron-circle-left"></i> Back
              </button>
              <button id="Save" class="sp-btn sp-btn-primary">
                Submit <i class="fa fa-save"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    let onSaveButtonClicked = (evt: Event) => {
      evt.preventDefault();
      this._vm.save(this._vm.stage3_rules());
    };

    const save = document.getElementById("Save");
    save.onclick = onSaveButtonClicked;

    let onBackButtonClicked = (evt: Event) => {
      evt.preventDefault();
      var route = back.getAttribute("click");
      App.navigate(route);
    };

    const back = document.getElementById("Back");
    back.onclick = onBackButtonClicked;

    this._vm.bindData();
    //new ViewModelHelper().addEventListener(this,'click');
  };
}
