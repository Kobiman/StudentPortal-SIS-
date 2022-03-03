import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { ResultsSummaryVm } from "../../viewModels/resultsSummaryVm";
import { ResultsHead, ResultsRow } from "./resultsSummaryTable";

export class ResultsSummaryView implements IView {
  constructor(private _vm: ResultsSummaryVm) {}
  async oninitialized(): Promise<void> {}
  render(elementId: string): void {
    let temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>ACADEMIC BOARD FORMAT </h1>
          <div class="mountcourses-form">
            <div class="sp-row-col-5-5">
              <select id="academicYear" binding="Object.academicYear" filter>
                <option value="">Academic Year</option>
                {this._vm.academicYear.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}{" "}
              </select>
              <select
                id="programs"
                binding=""
                value={this._vm.mountedCourse.program}
                filter
              >
                <option value="">Programs</option>
                {this._vm.getPrograms().map((x) => (
                  <option value={x.programId}>{x.name}</option>
                ))}
              </select>
              <select id="level" binding="Object.level" filter>
                <option value="">Please Select Level</option>
                {this._vm.levels.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}{" "}
              </select>
              <select id="semester" binding="Object.semester" filter>
                <option value="">Please Select Semester</option>
                {this._vm.semesters.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}{" "}
              </select>
            </div>
            <div class="sp-btn-row">
              <button class="sp-btn sp-btn-default " id="submit">
                VIEW
              </button>
              <button
                class="sp-btn sp-btn-default "
                id="download"
                onClick={() => {
                  const elements = document.querySelectorAll("[filter]");
                  const academicYear = (elements[0] as HTMLSelectElement).value;
                  const program = (elements[1] as HTMLSelectElement).value;
                  const level = (elements[2] as HTMLSelectElement).value;
                  const semester = (elements[3] as HTMLSelectElement).value;
                  this._vm.generateSummarySheet(
                    academicYear,
                    program,
                    level,
                    semester
                  );
                }}
              >
                GET SHEET
              </button>
              <button class="sp-btn sp-btn-primary">APPROVE</button>
            </div>
            <p id="summaryCaption">Summary</p>
            <table
              id="summmaryTable"
              class="table"
              style="font-weight: normal; font-size:10px;"
            >
              <thead id="stableHead" class="table">
                <tr>
                  <th>PASS</th>
                  <th>TRAIL</th>
                  <th>PROBATION</th>
                  <th>WITHDRAWN</th>
                  <th>DEFERED</th>
                  <th>SUSPENDED</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody id="stableBody">
                {this._vm.summary.map((x) => (
                  <tr>
                    <td>{x.pass}</td>
                    <td>{x.trail}</td>
                    <td>{x.probation}</td>
                    <td>{x.withdrawn}</td>
                    <td>{x.defered}</td>
                    <td>{x.suspended}</td>
                    <td>{x.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <p style="display:none" id="captionText">Passed Students: Students without trails</p>   */}
            <div class="abf-horizontal">
              <table
                id="summmaryDetailsTable"
                class="table"
                style="font-weight: normal; font-size:10px;"
              >
                <thead id="tableHead" class="table"></thead>
                <tbody id="tableBody"></tbody>
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
      const academicYear = (elements[0] as HTMLSelectElement).value;
      const program = (elements[1] as HTMLSelectElement).value;
      const level = (elements[2] as HTMLSelectElement).value;
      const semester = (elements[3] as HTMLSelectElement).value;
      this._vm.getStudentResults(program, academicYear, level, semester);
    };
    document.getElementById("submit").onclick = getCourses;
  }
}
