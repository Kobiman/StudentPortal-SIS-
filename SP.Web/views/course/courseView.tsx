import { IView } from "../../IView";
import { CourseVm } from "../../viewModels/courseVm";
import { createElement } from "tsx-create-element";
import { CourseModal } from "./courseModal";
import { _ } from "../../group";

export class CourseView implements IView {
  constructor(private _vm: CourseVm) {}
  async oninitialized(): Promise<void> {
    this._vm.updateCourseCommand.add(() => {
      var doc = document.getElementById("courses");
      doc.textContent = "";
      this._vm.courses.map((x) => (
        <tr>
          <td></td>
          <td>{x.code}</td>
          <td>{x.courseName}</td>
          <td width="7%">{x.credit}</td>
        </tr>
      ));
    });
    await this._vm.getCourses();
  }
  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Course List</h1>
          <div class="mountcourses-form">
            <div class="course-header">
              <input
                type="text"
                name="answer"
                required
                placeholder="SEARCH BY COURSE."
                class="searchTerm"
                onkeyup={() => {
                  tableSearch();
                }}
                id="searchByLectName"
              />
              <button class="sp-btn sp-btn-default btn-small" id="addCourse">
                Add
              </button>
            </div>
          </div>
          <div>
            <div>
              <table class="table-hd" id="courseViewHead">
                <thead>
                  <th>No.</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Credit</th>
                </thead>
              </table>
            </div>
            <div class="horizontal-edit">
              <table class="table css-serial" id="courseView">
                <thead hidden>
                  <tr>
                    <th>No.</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Credit</th>
                  </tr>
                </thead>
                <tbody id="courses" data-repeat="courses">
                  {this._vm.courses.map((x) => (
                    <tr>
                      <td></td>
                      <td>{x.code}</td>
                      <td>{x.courseName}</td>
                      <td width="7%">{x.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="edit-content">
              <div class="profile-form">
                <div class="sp-row-col-2-2-2">
                  <div class="user-info">
                    <h3 class="edit-info-headers">Cousre Details:</h3>
                    <div class="edit-profile-info">
                      <label>
                        Course Code:
                        <br /> <span id="code1"></span>
                      </label>
                      <label>
                        Course Name:
                        <br />
                        <span id="name1"></span>
                      </label>
                      <label>
                        Credit:
                        <br />
                        <span id="credit1"></span>
                      </label>
                      <label>
                        Department:
                        <br />
                        <span id="department1"></span>
                      </label>
                    </div>
                  </div>
                  <div clas="profile-fields">
                    <div class="edit-profile-btn">
                      <button
                        onclick={() => {
                          this._vm.DisableTextBox();
                          this._vm.update();
                        }}
                      >
                        {" "}
                        <i class="fas fa-save"></i>
                        Save
                      </button>

                      <button
                        id="btnEdit"
                        value="yes"
                        style="visibility:hidden"
                        onclick={() => {
                          this._vm.EnableTextBox();
                        }}
                      >
                        <i class="fas fa-edit"></i>
                        Edit
                      </button>
                    </div>

                    <form class="edit-details">
                      <div class="left-profile-edit">
                        <p>
                          <label>Course Code</label>
                          <input
                            type="text"
                            class="edit-text-field"
                            id="code"
                            input
                          />
                        </p>
                        <p>
                          <label>Course Name</label>
                          <input
                            type="text"
                            class="edit-text-field"
                            id="name"
                            input
                          />
                        </p>
                        <p>
                          <label>Credit</label>
                          <input
                            type="text"
                            class="edit-text-field"
                            id="credit"
                            input
                          />
                        </p>
                      </div>
                      <div class="middle-profile-edit">
                        <p>
                          <label>Department</label>
                          <input
                            type="text"
                            class="edit-text-field"
                            id="department"
                            input
                          />
                        </p>
                      </div>
                    </form>
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

    function tableSearch() {
      let input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("searchByLectName");
      filter = input.value.toUpperCase();
      table = document.getElementById("courses");
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

    let showModal = async (evt: Event) => {
      evt.preventDefault();
      new CourseModal(this._vm).render("route-outlet");
    };
    _.syncTable("courseViewHead", "courseView");

    document.getElementById("code").onkeyup = (evt: Event) => {
      evt.preventDefault();
      this._vm.course.code = (evt.target as HTMLInputElement).value;
    };
    document.getElementById("name").onchange = (evt: Event) => {
      evt.preventDefault();
      this._vm.course.courseName = (evt.target as HTMLInputElement).value;
    };
    document.getElementById("credit").onchange = (evt: Event) => {
      evt.preventDefault();
      this._vm.course.credit = (evt.target as HTMLInputElement).value;
    };

    this._vm.bind();
    document.getElementById("addCourse").onclick = showModal;
  }

  addClickEvent = async () => {
    let showStudent = async (evt: Event) => {
      evt.preventDefault();
      let row = (evt.target as HTMLButtonElement)
        .parentElement as HTMLTableRowElement;
      const code = row.cells[1].innerText;
      this._vm.courseCode = code;
      await this._vm.getDetails();
      (document.getElementById("code") as HTMLInputElement).value =
        this._vm.course.code;
      (document.getElementById("name") as HTMLInputElement).value =
        this._vm.course.courseName;
      (document.getElementById("credit") as HTMLInputElement).value =
        this._vm.course.credit.toString();
      (document.getElementById("department") as HTMLInputElement).value =
        this._vm.course.department;
      (document.getElementById("code1") as HTMLSpanElement).textContent =
        this._vm.course.code;
      (document.getElementById("name1") as HTMLSpanElement).textContent =
        this._vm.course.courseName;
      (document.getElementById("credit1") as HTMLSpanElement).textContent =
        this._vm.course.credit.toString();
      (document.getElementById("department1") as HTMLSpanElement).textContent =
        this._vm.course.department;
    };

    const elements = document.querySelectorAll("td");
    elements.forEach(function (element) {
      (element as HTMLElement).onclick = showStudent;
    });
  };
}
