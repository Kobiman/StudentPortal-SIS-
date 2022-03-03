import { Button } from "@amcharts/amcharts4/core";
import { createElement } from "tsx-create-element";
import { IView } from "../../IView";
import { BroadSheetVm } from "../../viewModels/broadSheetVm";
import { BroadSheetTableRow } from "./broadSheetTableRow";

export class BroadSheetView implements IView {
  constructor(private _vm: BroadSheetVm) {}
  async oninitialized(): Promise<void> {}

  render(elementId: string) {
    let academicYear: String;
    let program: String;
    let level: String;
    let semester: String;
    let temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>BroadSheets </h1>
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
              <button
                class="sp-btn sp-btn-primary"
                id="approvebtn"
                style="visibility:hidden"
                onClick={() => {
                  this._vm.approveResultsByHoD();
                  document.getElementById("approvebtn").style.visibility =
                    "hidden";
                }}
              >
                APPROVE
              </button>
              <button class="sp-btn sp-btn-default" id="submit">
                VIEW
              </button>
              <button
                class="sp-btn sp-btn-default "
                id="download"
                onClick={() => {
                  this._vm.generateBroadSheet(
                    academicYear,
                    program,
                    level,
                    semester
                  );
                }}
              >
                DOWNLOAD
              </button>
            </div>
            <div class="check">
              <label
                class="check-content"
                style="margin-bottom: 0px;margin-top: 10px; width:20%;"
              >
                Show Marks
                <input
                  id="checkme"
                  type="checkbox"
                  name="checkbox"
                  onChange={(evt: Event) => {
                    evt.preventDefault();
                    const checked = (evt.target as HTMLInputElement).checked;
                    this._vm.showMarks(checked);
                    new BroadSheetTableRow(this._vm, checked).render();
                  }}
                ></input>
                <span class="checkmark"></span>
              </label>
            </div>

            <div class="horizontal2">
              <table
                id="approveTable"
                class="table"
                style="font-weight: normal; font-size:10px;"
              >
                <thead id="generateHead" class="table"></thead>
                <tbody id="results1" data-repeat=""></tbody>
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
      academicYear = (elements[0] as HTMLSelectElement).value;
      program = (elements[1] as HTMLSelectElement).value;
      level = (elements[2] as HTMLSelectElement).value;
      semester = (elements[3] as HTMLSelectElement).value;
      // setFilters;
      this._vm.getStudentResults(program, academicYear, level, semester);
      debugger;
      document.getElementById("approvebtn").style.visibility = "visible";
    };
    document.getElementById("submit").onclick = getCourses;
  }
}
