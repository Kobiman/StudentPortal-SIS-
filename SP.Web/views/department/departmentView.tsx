import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { DepartmentVm } from "../../viewModels/departmentVm";
import { DepartmentModal } from "./departmentModal";
import { App } from "../../app";
import { _ } from "../../group";
import { DepartmentTableRow } from "./departmentHeadRow";
import { DepartmentTableHead } from "./departmentTableHead";
import { Department } from "../../models/department";

export class DepartmentView implements IView {
  constructor(private _vm: DepartmentVm) {
    this._vm.departmentUpdatedCommand.add(() => {
      document.getElementById(this._vm.department.departmentId).innerHTML =
        this._vm.department.name;
    });
  }
  async oninitialized(): Promise<void> {
    await this._vm.getDepartments();
  }
  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Departments</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row">
              <button
                class="sp-btn sp-btn-default btn-small"
                id="addDepartment"
              >
                Add
              </button>
            </div>
            <div>
              <table class="table-hd" id="departmentViewHead">
                <thead>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Code</th>
                </thead>
              </table>
              <div class="horizontal-edit">
                <table class="table css-serial" id="departmentView">
                  <thead hidden>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Code</th>
                    </tr>
                  </thead>
                  <tbody id="departments" data-repeat="departments">
                    {this._vm.departments.map((x) => (
                      <tr>
                        <td></td>
                        <td id={x.departmentId} binding="name">
                          {x.name}
                        </td>
                        <td binding="code">{x.code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="edit-content">
                <div class="profile-form">
                  <div class="sp-row-col-2-2-2">
                    <div class="user-info">
                      <h3 class="edit-info-headers">Department Details:</h3>
                      <div class="dept-specific-table">
                        <button
                          value="yes"
                          onclick={() => {
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
                            //new DepartmentView(this._vm).render("route-outlet");
                          }}
                        >
                          {" "}
                          <i class="fas fa-save"></i>
                          Save
                        </button>
                      </div>
                      <div class="edit-profile-info">
                        <p>
                          <label>Code</label>
                          <input
                            id="code"
                            type="text"
                            class="edit-text-field"
                            disabled="disabled"
                          />
                        </p>
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
                          <label>School</label>
                          <input
                            id="schoolName"
                            type="text"
                            class="edit-text-field"
                            disabled="disabled"
                            input
                          />
                        </p>
                        <p>
                          <label>Head of Department</label>
                          <input
                            id="HoD"
                            type="text"
                            class="edit-text-field"
                            style="margin-bottom: 0px;"
                            onKeyup={async (evt: Event) => {
                              // evt.preventDefault();
                              showLecturers(evt);
                            }}
                            disabled="disabled"
                            input
                          />
                          <div class="autocom-box2">
                            <ul id="HoDList"></ul>
                          </div>
                        </p>
                      </div>
                      <div class="left-profile-edit"></div>
                    </div>
                    <div clas="profile-fields">
                      <div class="horizontal-edit-dept">
                        <table class="table edit-table">
                          <thead id="generateHead"></thead>
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

    _.syncTable("departmentViewHead", "departmentView");

    document.getElementById("name").onkeyup = (evt: Event) => {
      evt.preventDefault();
      this._vm.department.name = (evt.target as HTMLInputElement).value;
    };
    document.getElementById("schoolName").onkeyup = (evt: Event) => {
      evt.preventDefault();
      this._vm.department.schoolName = (evt.target as HTMLInputElement).value;
    };
    // document.getElementById("HoD").onkeyup = (evt: Event) => {
    //   evt.preventDefault();
    //   this._vm.lecturerName = (evt.target as HTMLInputElement).value;
    // }

    let showModal = async (evt: Event) => {
      evt.preventDefault();
      this._vm.department = new Department();
      this._vm.bind();
      new DepartmentModal(this._vm).render("route-outlet");
    };

    let showLecturers = async (evt: Event) => {
      let textbox = evt.target as HTMLInputElement;
      let lecturers = [];
      if (textbox.value !== "") {
        lecturers = await this._vm.getLecturer(textbox.value);
      }
      let suggestions = document.getElementById("HoDList");
      suggestions.textContent = "";
      for (var l of lecturers) {
        let li = (<li>{l.name}</li>) as HTMLLinkElement;
        li.onclick = () => {
          textbox.value = li.innerHTML.trim();
          suggestions.textContent = "";
          this._vm.department.lecturerId = l.lecturerId;
        };
        suggestions.appendChild(li);
      }
    };

    this._vm.bind();
    document.getElementById("addDepartment").onclick = showModal;
  }

  addClickEvent = async () => {
    let showStudent = async (evt: Event) => {
      evt.preventDefault();

      let row = (evt.target as HTMLButtonElement)
        .parentElement as HTMLTableRowElement;
      const code = row.cells[2].innerText;
      this._vm.deptCode = code;
      await this._vm.getDeptEditDetails();
      (document.getElementById("code") as HTMLInputElement).value =
        this._vm.department.code;
      (document.getElementById("name") as HTMLInputElement).value =
        this._vm.department.name;
      (document.getElementById("schoolName") as HTMLInputElement).value =
        this._vm.department.schoolName;
      (document.getElementById("HoD") as HTMLInputElement).value =
        this._vm.lecturerName;
      new DepartmentTableHead(this._vm).render();
      new DepartmentTableRow(this._vm).render();
    };

    const elements = document.querySelectorAll("td");
    elements.forEach(function (element) {
      (element as HTMLElement).onclick = showStudent;
    });
  };
}
