import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { RegisterCourseVm } from "../../viewModels/registerCourseVm";
import { RegisterCourseRow } from "./registerCourseRow";
import { CustomRenderer } from "../../customRenderer";
import { HtmlSelect } from "../HtmlSelect";
import { RegistrationModal } from "./registrationModal";

export class RegisterCourseView implements IView {
  constructor(private _vm: RegisterCourseVm) {}
  async oninitialized(): Promise<void> {
    this._vm.getSpecializations();
    await this._vm.getMountedCourses();
    await this._vm.getFeeStatement();
    this._vm.setTotalCreditCommand.add(()=>{
      document.getElementById("totalCredit").innerHTML = "Total Credit: "+this._vm.selectedCourses.map(x=>parseInt(x.credit)).reduce((a, b) => a + b, 0).toString();
    });
    this._vm.selectedCourseCommand.add(
      ()=>{
        CustomRenderer.renderElements(
          "courseList",
        this._vm.courseList.map(x=>
          new RegisterCourseRow(this._vm).create(x))
        );
      }
    );
    this._vm.courseRegisteredCommand.add(()=>{
      CustomRenderer.render(
        "courseList",
        <tr></tr>)
    });
  }
  render(elementId: string): void {
     let courseRow = this._vm.courseList.map(x=>new RegisterCourseRow(this._vm).create(x));
     let courseTrailRow = this._vm.trailList.map(x=>new RegisterCourseRow(this._vm).createTrail(x));
     let totalCredit = "Total Credit: "+this._vm.selectedCourses.map(x=>parseInt(x.credit)).reduce((a, b) => a + b, 0).toString();

    var registerCourseView: HTMLElement = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Register Courses</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row sp-row-col0-1-1-1">
              <button class="sp-btn sp-btn-primary btn-small" id="submit">
                Submit
              </button>          
                    
            </div>
            <div class="horizontal">
              <table class="table table-hoverable">
                <thead>
                  <th>Courses</th>
                  <th>Lecturer</th>
                  <th>Category</th>
                  <th>Select</th>
                </thead>
                <tbody id="courseList">
                  {
                    courseRow
                  }
                </tbody>
                <tr></tr>
                <tr style="color: #292121;font-weight: bold;font-size: 13px;font-family: emoji;">TRAILS</tr>
                <tr></tr>
                <tbody id="courseTrailList">
                  {
                    courseTrailRow
                  }
                </tbody>
              </table>
              <span id="totalCredit">{totalCredit}</span>     
            </div>
          </div>
        </div>
      </div>
    );

    let submit = registerCourseView.getElementsByTagName("button")[0] as HTMLButtonElement;
    submit.addEventListener("click", async(e) => {
      e.preventDefault();
      await this._vm.register();
    });

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(registerCourseView);

    if (this._vm.courseList.length === 0) {
      new RegistrationModal(this._vm).render("route-outlet");
    }
  }
}
