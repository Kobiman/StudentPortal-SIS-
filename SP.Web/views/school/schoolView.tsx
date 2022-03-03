import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { SchoolVm } from "../../viewModels/schoolVm";
import { SchoolModal } from "./schoolModal";
import { _ } from "../../group";
import { SchoolTableRow } from "./schoolStatisticsView";
import { School } from "../../models/school";

export class SchoolView implements IView {
  constructor(private _vm: SchoolVm) {
    this._vm.schoolUpdatedCommand.add(() => {
      document.getElementById(this._vm.school.schoolId).innerHTML =
        this._vm.school.name;
    });
  }
  async oninitialized(): Promise<void> {
    await this._vm.getSchools();
  }
  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>School List</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row">
              <button class="sp-btn sp-btn-default btn-small" id="addSchool">
                Add
              </button>
            </div>
            <div>
              <table class="table-hd" id="schoolViewHead">
                <thead>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Academic Year</th>
                  <th>Semester</th>
                </thead>
              </table>

              <div class="horizontal">
                <table class="table css-serial" id="schoolView">
                  <thead class="table" hidden>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Academic Year</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody id="schools">
                    {this._vm.schools.map((x) => (
                      <tr>
                        <td></td>
                        <td id={x.schoolId}>{x.name}</td>
                        <td>{x.academicYear}</td>
                        <td>{x.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="edit-content">
                <div class="profile-form">
                  <div class="sp-row-col-2-2-2">
                    <div class="user-info">
                      <h3 class="edit-info-headers">School Details:</h3>
                      <div class="dept-specific-table">
                        <button
                          value="yes"
                          onclick={(evt: Event) => {
                            evt.preventDefault();
                            this._vm.EnableTextBox();
                          }}
                        >
                          <i class="fas fa-edit"></i>
                          Edit
                        </button>
                        <button
                          id="btnSave"
                          style="visibility:hidden"
                          onclick={async (evt: Event) => {
                            evt.preventDefault();
                            this._vm.DisableTextBox();
                            await this._vm.update();
                          }}
                        >
                          {" "}
                          <i class="fas fa-save"></i>
                          Save
                        </button>
                      </div>
                      <div class="edit-profile-info">
                        <p>
                          <label>Name</label>
                          <input
                            id="name"
                            type="text"
                            class="edit-text-field"
                            disabled="disabled"
                            input
                          />
                        </p>
                        <p>
                          <label>Dean of School</label>
                          <input
                            id="dean"
                            type="text"
                            class="edit-text-field"
                            style="margin-bottom: 0px;"
                            onKeyup={async (evt: Event) => {
                              evt.preventDefault();
                              showLecturers(evt);
                            }}
                            disabled="disabled"
                            input
                          />
                          <div class="autocom-box2">
                            <ul id="deanList"></ul>
                          </div>
                          <div errors="assignedTo"></div>
                        </p>
                        <p>
                          <label>Academic Year</label>
                          <select
                            class="edit-text-field"
                            id="academicYear"
                            style="height:37px; width: 101%;"
                            disabled="disabled"
                            input
                          >
                            <option value="">Academic Year</option>
                            {this._vm.academicYears.map((x) => (
                              <option value={x.name}>{x.name}</option>
                            ))}{" "}
                          </select>
                        </p>
                        <p>
                          <label>Semester</label>
                          <select
                            class="edit-text-field"
                            id="semester"
                            style="height:37px; width: 101%;"
                            disabled="disabled"
                            input
                          >
                            <option value="">Semester</option>
                            {this._vm.semesters.map((x) => (
                              <option value={x.name}>{x.name}</option>
                            ))}{" "}
                          </select>
                        </p>
                      </div>
                      <div class="left-profile-edit"></div>
                    </div>
                    <div clas="profile-fields">
                      <div class="horizontal-edit-dept">
                        <table class="table edit-table">
                          <thead id="generateHead" style="visibility:hidden">
                            <tr>
                              <th>No.</th>
                              <th>Department Name</th>
                              <th>No. of Stds</th>
                              <th>Male Number</th>
                              <th>Female Number</th>
                              <th>Download</th>
                            </tr>
                          </thead>
                          <tbody id="statistics"></tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);
    this.addClickEvent();

    _.syncTable("schoolViewHead", "schoolView");
    document.getElementById("name").onkeyup = (evt: Event) => {
      evt.preventDefault();
      this._vm.school.name = (evt.target as HTMLInputElement).value;
    };

    document.getElementById("academicYear").onchange = (evt: Event) => {
      evt.preventDefault();
      this._vm.school.academicYear = (evt.target as HTMLSelectElement).value;
    };

    document.getElementById("semester").onchange = (evt: Event) => {
      evt.preventDefault();
      this._vm.school.semester = (evt.target as HTMLSelectElement).value;
      debugger;
    };

    let showModal = async (evt: Event) => {
      evt.preventDefault();
      this._vm.school = new School();
      this._vm.bind();
      new SchoolModal(this._vm).render("route-outlet");
    };

    let showLecturers = async (evt: Event) => {
      let textbox = evt.target as HTMLInputElement;
      let lecturers = [];
      if (textbox.value !== "") {
        lecturers = await this._vm.getLecturer(textbox.value);
      }
      let suggestions = document.getElementById("deanList");
      suggestions.textContent = "";
      for (var l of lecturers) {
        let li = (<li>{l.name}</li>) as HTMLLinkElement;
        li.onclick = () => {
          textbox.value = li.innerHTML.trim();
          this._vm.lecturerName = textbox.value;
          suggestions.textContent = "";
          this._vm.school.lecturerId = lecturers.find(
            (x) => x.name === li.innerHTML.trim()
          ).lecturerId;
        };
        suggestions.appendChild(li);
      }
    };

    this._vm.bind();
    document.getElementById("addSchool").onclick = showModal;
  }

  addClickEvent = async () => {
    let showStudent = async (evt: Event) => {
      evt.preventDefault();
      let row = (evt.target as HTMLButtonElement)
        .parentElement as HTMLTableRowElement;
      const name = row.cells[1].innerText;
      this._vm.schoolName = name;
      await this._vm.getSchoolEditDetails();
      (document.getElementById("name") as HTMLInputElement).value =
        this._vm.school.name;
      (document.getElementById("dean") as HTMLInputElement).value =
        this._vm.lecturerName;
      (document.getElementById("academicYear") as HTMLSelectElement).value =
        this._vm.school.academicYear;
      (document.getElementById("semester") as HTMLInputElement).value =
        this._vm.school.semester;
      document.getElementById("generateHead").style.visibility = "visible";
      new SchoolTableRow(this._vm).render();
    };

    const elements = document.querySelectorAll("td");
    elements.forEach(function (element) {
      (element as HTMLElement).onclick = showStudent;
    });
  };
}
