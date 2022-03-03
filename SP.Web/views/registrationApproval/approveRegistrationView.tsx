import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ApproveRegistrationVm } from "../../viewModels/approveRegistrationVm";

export class ApproveRegistrationView implements IView {
    constructor(private _vm: ApproveRegistrationVm) {

    }
  async oninitialized(): Promise<void> {
  }
    render(elementId: string): void {
        var temp=(
            <div class="sp-box">
              <div class="mc-row">
                  <h1>Approve Registration </h1>
                  <div class="mountcourses-form">
                  <div class="sp-row-col-2-5">
                          <select id="programs" binding="SelectedCourse.program" value={this._vm.mountedCourse.program} filter>
                          <option value="">Programs</option>
                          {this._vm.getPrograms().map((x) => (
                          <option value={x.name}>{x.name}</option>
                          ))}
                          </select>
                 
                          <select id="level" binding="Object.level" filter>
                          <option value="">Please Select Level</option>
                          {this._vm.levels.map((x) => (
                          <option value={x.name}>{x.name}</option>
                          ))} </select>

                        <div class="sp-btn-row">
                            <button class="sp-btn sp-btn-default " id="view-list">View</button>
                        </div>
                     </div>
                  <div class="horizontal">
                  <table id="approveTable" class="table table-hoverable">
                      <thead class="table">
                          <th>Index Number</th>
                          <th>Level</th>
                          <th>Total Courses </th>
                          <th>Total Credit</th>
                          <th>Pending Trails</th>
                          <th>View Registration</th>
                          <th>
                          <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px; width: 40%; display: inline-grid;">
                            <input id="checkme" type="checkbox" name="checkbox" 
                            onChange={(evt: Event) => {
                              evt.preventDefault();
                              const checked = (evt.target as HTMLInputElement).checked;
                              this._vm.unChecked(checked);
                              this._vm.aproveAllRegistration();
                            }}>
                          </input>Approve All
                            <span class="checkmark"></span>
                          </label>
                          </th>
                      </thead>
                      <tbody id="results" data-repeat="temporalRegistrationList">
                        
                      </tbody>
                  </table>
                  </div>
                  </div>
                </div>
            </div>

        );
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);

      let getCourses = async (evt: Event) => {
        evt.preventDefault();
      const elements = document.querySelectorAll("[filter]");
      const program = (elements[0] as HTMLSelectElement).value;
      const level = (elements[1] as HTMLSelectElement).value;
      await this._vm.getStudentRegistration(program, level);
    }
    document.getElementById("view-list").onclick = getCourses; 
    }
}



