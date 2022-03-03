import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { TranscriptGenerationVm } from "../../viewModels/transcriptGenerationVm";
import { BallLoader } from "../../loader/ballLoader";
export class transcriptGenerationView implements IView {
  constructor(private _vm: TranscriptGenerationVm) {}
  async oninitialized(): Promise<void> {}
  render = (elementId: string) => {
    let temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Transcript and statement of result generation</h1>
          <div class="mountcourses-form" id="transcript-container">
            <div class="sp-row-trans" id="sp-m">
              <input
                type="text"
                name="answer"
                required="true"
                placeholder="search by INDEX NUMBER."
                autofocus
                id="searchfild"
              />
              <div class="sp-btn-row">
                <button
                  class="sp-btn sp-btn-default"
                  onClick={async () => {
                    BallLoader.show();
                    debugger;
                    const searchField = document.getElementById(
                      "searchfild"
                    ) as HTMLInputElement;
                    const indexNumber = searchField.value;
                    await this._vm.getStudentResults(indexNumber);
                    BallLoader.hide();
                    var doc = document.getElementById("studentListTable");
                    doc.textContent = "";
                    // for(const dr of this._vm.student){
                    let row = (
                      <tr>
                        <td>{this._vm.student.indexNmber}</td>
                        <td>{this._vm.student.name}</td>
                        <td>
                          {this._vm.student.gender == "M" ? "Male" : "Female"}
                        </td>
                        <td>{this._vm.student.universityEmail}</td>
                        <td>{this._vm.student.personalEmail}</td>
                        <td>{this._vm.student.dateOfBirth.substring(0, 10)}</td>
                        <td>
                          <button
                            id=""
                            class="sp-btn sp-btn-stOfResult "
                            onClick={(evt: Event) => {
                              evt.preventDefault();
                              this._vm.generateTranscript();
                            }}
                          >
                            <i class="fa fa-download"></i>
                            Gen.tans
                          </button>
                          <button
                            id=""
                            class="sp-btn sp-btn-stOfResult "
                            onClick={(evt: Event) => {
                              evt.preventDefault();
                              this._vm.generateTranscript();
                            }}
                          >
                            <i class="fa fa-download"></i>
                            St.Result
                          </button>
                        </td>
                      </tr>
                    );
                    doc.appendChild(row);
                    // }
                    let th = document.getElementsByTagName("th");
                    for (let i = 0; i < th.length; i++) {
                      (th[i] as HTMLTableHeaderCellElement).addEventListener(
                        "click",
                        function () {}
                      );
                    }
                  }}
                  id="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div class="sp-form-col1">
            <div class="horizontal">
              <table class="table striped">
                <thead class="table">
                  <th>IndexNumber</th>
                  <th>FullName</th>
                  <th>Gender</th>
                  <th>University Email</th>
                  <th>Personal Email</th>
                  <th>DOB(yyyy/mm/dd)</th>
                  <th> Action</th>
                </thead>
                <tbody data-repeat="studentList" id="studentListTable"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
  };
}
