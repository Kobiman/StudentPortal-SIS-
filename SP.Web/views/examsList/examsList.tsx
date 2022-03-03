import { createElement } from "tsx-create-element";
import { CustomRenderer } from "../../customRenderer";
import { _ } from "../../group";
import { IView } from "../../IView";
import { ExamsListVm } from "../../viewModels/examsListVm";

export class examsListView implements IView {
  constructor(private _vm: ExamsListVm) {}

  async oninitialized(): Promise<void> {
  }

  render = (elementId: string) => {
    let temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Examination List</h1>
          <div class="search-details">
            <input
              type="text"
              name="answer"
              required
              placeholder="search here."
              class="searchTerm"
              onkeyup={() => {
                tableSearch();
                CustomRenderer.renderElements("examsListBody", new ExamsListTableRow(this._vm).create());
              }}
              id="searchByCCode"
            />
          </div>
          <div class="mountcourses-form">
            <div class="exams-list-filter">
              <div class="" id="examsListFilter">
              <select filters>
                <option value="">ACADEMIC YEAR</option>
                {this._vm.getAcademicYear().map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
                </select>
              </div>
              <div id="examsListFilter">
              <select filters>
                <option value="">SEMESTER</option>
                {this._vm.getSemester().map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
                </select>
              </div>
              <div>
                <button class="sp-btn sp-btn-default " id="submit" onClick={async (evt: Event) => {
                  debugger
                  evt.preventDefault();
                  const element = document.querySelectorAll("[filters]");
                  let academicYear = (element[0] as HTMLSelectElement).value;
                  let semester = (element[1] as HTMLSelectElement).value;
                  await this._vm.getExamsList(academicYear, semester);
                  CustomRenderer.renderElements("examsListBody", new ExamsListTableRow(this._vm).create());
                    }}>
                  Submit
                </button>
              </div>
            </div>
            </div>
            <div>
              <div class="exam-horizontal">
                <table class="table css-serial" id="examView">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Download</th>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Prog of Study</th>
                      <th>Level</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody id="examsListBody">
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

    function tableSearch() {
      debugger
      let input, filter, table, tr, td, txtValue;
      input = document.getElementById("searchByCCode");
      filter = input.value.toUpperCase();
      table = document.getElementById("examView");
      tr = table.querySelectorAll("tr");
      for (let i = 0; i < tr.length; ++i) {
        td = tr[i].getElementsByTagName("td");
        tr[i].style.display = "none";
        for (let j = 0; j < td.length; j++) {
          if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          }
        }
      }
    }
  }
  };
  // addClickEvent(){
  //     let showModal = async (evt: Event) => {
  //         evt.preventDefault();
  //         let row = (evt.target as HTMLButtonElement).parentElement.parentElement as HTMLTableRowElement;
  //         const cCode = row.cells[2].innerText;
  //         this._vm.cCode = cCode;
  //       };
  //     const elements = document.querySelectorAll("[button]");
  //       elements.forEach(function (element) {
  //       (element as HTMLElement).onclick = showModal;
  //       });
  // }


export class ExamsListTableRow {
  constructor(private _vm: ExamsListVm) {}
  create() {
    return this._vm.courses.map((x) => (
      <tr>
        <td></td>
        <td>
            <button
            class="sp-btn sp-btn-default btn-small"
            style="border: none;margin-left: -28px;background: transparent;"
            title="click to download"
              button
              onClick={(evt: Event) => {
                evt.preventDefault();
                let row = (evt.target as HTMLButtonElement)
                  .parentElement
                  .parentElement as HTMLTableRowElement;
                const cCode = row.cells[2].innerText;
                this._vm.generateExamsList(cCode);
              }}
            >
              <i class="fas fa-file-pdf" style="margin-right:5px; color:red"></i>
              PDF
            </button>
          </td>
          <td>{x.courseCode}</td>
          <td>{x.courseTitle}</td>
          <td>{x.program}</td>
          <td>{x.level}</td>
          <td>{x.semester}</td>
      </tr>
    ));
  }
}