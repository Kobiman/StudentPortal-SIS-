import { IView } from "../../IView";
import { LecturerVm } from "../../viewModels/lecturerVm";
import { createElement } from "tsx-create-element";
import { LecturerModal } from "./lecturerModal";
import { App } from "../../app";
import { _ } from "../../group";

export class LecturerView implements IView {
  constructor(private _vm: LecturerVm) {
    this._vm.lecturerChangedCommand.add(() => {
      let tr = document.getElementById("lecturers");
      tr.textContent = "";
      for (var x of this._vm.results) {
        tr.appendChild(
          <tr id={x.departmentId}>
            <td></td>
            <td binding="name">{x.name}</td>
            <td binding="staffId">{x.staffId}</td>
            <td binding="department">{x.departments}</td>
            <td binding="telephone">{x.telephone}</td>
            <td binding="email">{x.email}</td>
            <td binding="address" width="8%">
              {x.address}
            </td>
          </tr>
        );
      }
    });
  }
  async oninitialized(): Promise<void> {
    await this._vm.getLecturers();
    await this._vm.getDepartments();
  }
  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Lecturers</h1>
          <div class="sp-btn-row">
            <button class="sp-btn sp-btn-default" id="addLecturer">
              Add
            </button>
          </div>

          <div class="mountcourses-form">
            <div class="sp-row-col-4-4-4">
              <div>
                <select
                  value={this._vm.departments}
                  id="department"
                  binding="Object.lecturers"
                  style="border: 1.4px solid #59b379; border-radius: 4px;box-shadow: none"
                >
                  {this._vm.departments.map((x) => (
                    <option value={x.departmentId}>{x.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="answer"
                  placeholder="SEARCH BY STAFF NAME"
                  style="border-radius: 4px"
                  autofocus
                  onkeyup={() => {
                    tableSearch();
                  }}
                  id="searchByName"
                />
              </div>
              <button
                class=" sp-btn-default"
                style="float:right;border-radius: 4px"
                id="lectExcelButton"
                onClick={() => {
                  this._vm.download_csv();
                }}
              >
                <i class="fas fa-arrow-circle-down" style="margin-right: 5%;">
                  {" "}
                </i>
                Excel
              </button>
            </div>
          </div>
          <div>
            <table class="table-hd" id="lecturerViewHead">
              <thead>
                <th>No.</th>
                <th>Name</th>
                <th>StaffId</th>
                <th>Department</th>
                <th>Telephone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
              </thead>
            </table>
            <div class="lect-horizontal">
              <table class="table css-serial" id="lecturerView">
                <thead hidden>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>StaffId</th>
                    <th>Department</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="lecturers" data-repeat="results">
                  {this._vm.lecturers.map((x) => (
                    <tr id={x.departmentId}>
                      <td></td>
                      <td>{x.name}</td>
                      <td>{x.staffId}</td>
                      <td>{(x as any).departmentName}</td>
                      <td>{x.telephone}</td>
                      <td>{x.email}</td>
                      <td width="8%">{x.address}</td>
                      <td>{new StatusButton(this._vm).create(x.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );

    let departmentChanged = async (evt: Event) => {
      evt.preventDefault();
      const innerTable = document.getElementById("lecturers");
      innerTable.textContent = "";
      innerTable.appendChild(
        <tr>
          <td></td>
          <td binding="name"></td>
          <td binding="departmentId"></td>
          <td binding="staffId"></td>
          <td binding="telephone"></td>
          <td binding="email"></td>
          <td binding="address" width="8%"></td>
        </tr>
      );
      const value = (evt.target as HTMLSelectElement).value;
      this._vm.buidQuery("departmentId", value);
    };

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    function tableSearch() {
      let input, filter, table, tr, td, txtValue;
      input = document.getElementById("searchByName");
      filter = input.value.toUpperCase();
      table = document.getElementById("lecturers");
      tr = table.querySelectorAll("tr");
      for (let i = 0; i < tr.length; ++i) {
        td = tr[i].cells[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }

    // function countLecturer(){
    //   let lectcount = document.getElementById("lecturers");
    //   let tr = lectcount.querySelectorAll("tr").length;
    //   document.getElementById("totalLecturers").textContent=`${tr}`
    // }

    _.syncTable("lecturerViewHead", "lecturerView");

    let showModal = async (evt: Event) => {
      evt.preventDefault();
      new LecturerModal(this._vm).render("route-outlet");
    };

    document.getElementById("addLecturer").onclick = showModal;
    document.getElementById("department").onchange = departmentChanged;
  }
}

export class StatusButton {
  constructor(private _vm: LecturerVm) {}
  create(status: boolean) {
    let btnText = status ? "Enabled" : "Disabled";
    let btnColor = status ? "#59b379" : "#8B0000";
    let btn = (
      <button
        class="sp-btn sp-btn-default btn-small"
        id="enabled"
        onClick={(evt: Event) => {
          evt.preventDefault();
          let row = (evt.target as HTMLButtonElement).parentElement
            .parentElement as HTMLTableRowElement;
          const staffId = row.cells[2].innerText;
          this._vm.staffId = staffId;
          if (row.cells[7].textContent.indexOf("Enabled") != -1) {
            this._vm.lectStatus = false;
            this._vm.update();
            (row.cells[7].children[0] as any).style.color = "#8B0000";
            row.cells[7].children[0].innerHTML = "Disabled";
          } else {
            this._vm.lectStatus = true;
            this._vm.update();
            row.cells[7].children[0].innerHTML = "Enabled";
            (row.cells[7].children[0] as any).style.color = "#59b379";
          }
        }}
      >
        {btnText}
      </button>
    );
    btn.style.color = btnColor;
    return btn;
  }
}
