import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { StudentListVm } from "../../viewModels/StudentListVm";
import { _ } from "../../group";
import { CustomRenderer } from "../../customRenderer";
import { StudentDetails } from "./studentDetails";
import { Student } from "./../../models/student";

export class StudentListView implements IView {
  constructor(private _vm: StudentListVm) {
    this._vm.updateStudentListCommand.add(() => {
      CustomRenderer.renderElements(
        "students",
        new StudentListTr(this._vm).create()
      );
      this.addClickEvent();
    });
  }
  async oninitialized(): Promise<void> {
    await this._vm.getStudents();
    await this._vm.getStudent();
  }
  render(elementId: string): void {
    this._vm.student.dateOfEntry = (this._vm.student?.dateOfEntry)
      .split(",")[0]
      .replaceAll("/", "-");
    this._vm.student.dateofBirth = (this._vm.student?.dateofBirth)
      .split(",")[0]
      .replaceAll("/", "-");
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Student List</h1>
          <div class="mountcourses-form">
            <div class="search-student">
              <input
                type="text"
                name="answer"
                required
                placeholder="SEARCH BY INDEX NUMBER OR NAME ."
                autofocus
                class="searchTerm"
                onkeyup={() => {
                  tableSearch();
                }}
                id="searchByIndexNumber"
              />
            </div>
          </div>
          <div class="">
            <table class="table-hd" id="studentListHead">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Index Number</th>
                  <th>Reference No.</th>
                  <th>Surname</th>
                  <th>Othernames</th>
                  <th>Level</th>
                  <th>Program</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
            </table>
            <div class="horizontal-edit" id="v-scroll">
              <table class="table css-serial" id="studentList">
                <thead hidden>
                  <tr>
                    <th>No.</th>
                    <th>Index Number</th>
                    <th>Reference No.</th>
                    <th>Surname</th>
                    <th>Othernames</th>
                    <th>Level</th>
                    <th>Program</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                  </tr>
                </thead>
                <tbody id="students" data-repeat="students">
                  {new StudentListTr(this._vm).create()}
                </tbody>
              </table>
            </div>
            <div id="studentDetails">
              {new StudentDetails(this._vm).render()}
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
    this.addClickEvent();

    let scroller = document.getElementById("v-scroll");
    scroller.onscroll = (evt: Event) => {
      var scrollTop = (evt as any).target.scrollTop;
      var maxScroll = scroller.getBoundingClientRect().height;
      this._vm.onScroll(scrollTop, maxScroll);
    };

    document.getElementById("surname").onkeyup = (evt: Event) => {
      evt.preventDefault();
      this._vm.student.surname = (evt.target as HTMLInputElement).value;
    };

    _.syncTable("studentListHead", "studentList");

    function tableSearch() {
      let input, filter, table, tr, td, txtValue;
      input = document.getElementById("searchByIndexNumber");
      filter = input.value.toUpperCase();
      table = document.getElementById("students");
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

  addClickEvent = async () => {
    let showStudent = async (evt: Event) => {
      evt.preventDefault();
      let row = (evt.target as HTMLButtonElement)
        .parentElement as HTMLTableRowElement;
      const indexNumber = row.cells[1].innerText;
      this._vm.indexNumber = indexNumber;
      this._vm.getStudent();
      CustomRenderer.render(
        "studentDetails",
        new StudentDetails(this._vm).render()
      );
    };

    const elements = document.querySelectorAll("td");
    elements.forEach(function (element) {
      (element as HTMLElement).onclick = showStudent;
    });
  };
}
export class StudentListTr {
  constructor(private _vm: StudentListVm) {}
  create() {
    return this._vm.students.map((x) => (
      <tr>
        <td width="5.1%"></td>
        <td width="15.7%">{x.indexNumber}</td>
        <td width="15.3%">{x.referenceNumber}</td>
        <td width="10.5%">{x.surname.toUpperCase()}</td>
        <td width="13.7%">{x.othernames.toUpperCase()}</td>
        <td width="6.9%">{x.level.toUpperCase()}</td>
        <td width="10.5%">{x.programId}</td>
        <td width="9%">{x.gender === "M" ? "MALE" : "FEMALE"}</td>
        <td>{x.dateofBirth.split("/")}</td>
      </tr>
    ));
  }
}
