import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { RegisteredCoursesVm } from "../../viewModels/registeredCoursesVm";
import { App } from "../../app";

export class RegisteredCoursesView implements IView {
  constructor(private _vm: RegisteredCoursesVm) {}
  async oninitialized(): Promise<void> {
  }
  render(elementId: string): void {
    var registeredCoursesView: HTMLElement = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Registered Courses</h1>
          <div class="mountcourses-form">
          <div class="sp-btn-row sp-row-col0-1-1-1">
              <button class="sp-btn sp-btn-primary btn-small" id="submit"
              onClick={(evt:Event)=>{
                App.navigate("/app/#registerCourses");
              }}>
                Register
              </button>              
            </div>
            {/* <div class="sp-btn-row">
              <button class="sp-btn sp-btn-primary btn-small" id="submit">
                Submit
              </button>
            </div> */}
            <div class="horizontal">
              <table class="table">
                <thead>
                  <th>Date</th>
                  <th>Academic Year</th>
                  <th>Course Code</th>
                  <th>Course</th>
                  <th>Credit</th>
                  <th>Status</th>
                </thead>
                <tbody id="courseList">
                  {
                    this._vm.getRegisteredCourses().map(x=>
                        <tr>
                         <td binding="registrationDate">{x.registrationDate}</td>
                         <td binding="approved">{x.academicYear}</td>
                         <td binding="courseCode">{x.courseCode}</td>
                         <td binding="courseName">{x.courseName}</td>
                         <td binding="credit">{x.credit}</td>
                         <td>
                           <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
                           {this.setStatus(x.approved)}
                                <span class="checkmark"></span>
                           </label>
                         </td>
                        </tr>
                      )
                  }
                </tbody>
              </table>
              <span id="totalCredit">Total Credit: </span> {this._vm.totalCredit}
            </div>
          </div>
        </div>
      </div>
    );

    // let submit = registerCourseView.getElementsByTagName("button")[0] as HTMLButtonElement;
    // submit.addEventListener("click", (e) => {
    //   e.preventDefault();
    // });

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(registeredCoursesView);
    this._vm.getRegisteredCourses();
  }

  setStatus(approved){
    let status = "";
    if(approved){
      status = <input type="checkbox" binding="selected" checked disabled />
    }
    else{
      status = <input type="checkbox" binding="selected" disabled />
    }
    return status;
  }
}
