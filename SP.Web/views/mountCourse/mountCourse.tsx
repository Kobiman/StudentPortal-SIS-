import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { MountCourseViewModel } from "../../viewModels/mountCourseVm";
import { MountCourseModal } from "./mountCourseModal";

export class MountCourseView implements IView {
  constructor(private _vm: MountCourseViewModel) {
    this._vm.courseAddedCommand.add(()=>{
      this.nestedTable();
    });
  }
  async oninitialized(): Promise<void> {

  }

  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Mount Courses</h1>
          <div class="mountcourses-form">
            <div class="sp-btn-row" >
            <button id="Save" class="sp-btn sp-btn-primary btn-small" style ="float:right"  >
                Save
              </button>
              <button class="sp-btn sp-btn-default btn-small" id="mountCourese" style="float:right" >
                Mount
              </button>
             
            </div>
            <div>
              <table class="table-hd" id="mountCourseHead">
                <thead>
                  <th>EnrollmentOption</th>
                    <th>Program</th>
                    <th>Level</th>
                    <th>Specialization</th>
                    <th>Category</th>
                </thead>
              </table>
              
              <div class="horizontal">
                <table class="table" id="mountCourse">
                  {/* <thead>
                    <th>EnrollmentOption</th>
                    <th>Program</th>
                    <th>Level</th>
                    <th>Specialization</th>
                    <th>Category</th>
                  </thead> */}
                  {
                    <tbody id="nestedTable">
                      
                    </tbody>
                  }
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let showModal = async (evt: Event) => {
      evt.preventDefault();
      new MountCourseModal(this._vm).render("route-outlet");
    };

    let save = async(evt: Event) => {
      evt.preventDefault();
      await this._vm.save();
    };

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    document.getElementById("mountCourese").onclick = showModal;
    document.getElementById("Save").onclick = save;
    this._vm.bindList("selectedCourses");
  }


  nestedTable(){
    let courses = this._vm.mountedCourses;
    let doc = document.getElementById("nestedTable");
    doc.textContent = "";
    for (let course of courses) {
      let tr: HTMLTableRowElement = (
        <tr>
          <td>{course.enrollmentOption}</td>
          <td>{course.program}</td>
          <td>{course.level}</td>
          <td>{course.specialization}</td>
          <td>{course.category}</td>
        </tr>
      );
      doc.appendChild(tr);
      let innertable: HTMLTableElement = (
        <tr>
          <td colspan="5">
            <table class="table">
              <tr>
                <td style="background:#A4CCA4;color:#fff;">EnrollmentOption</td>
                <td style="background:#A4CCA4;color:#fff;">Courses</td>
                <td style="background:#A4CCA4;color:#fff;">Category</td>
                <td style="background:#A4CCA4;color:#fff;">Level</td>
                <td style="background:#A4CCA4;color:#fff;">Scoring</td>
                <td style="background:#A4CCA4;color:#fff;">AssignedTo</td>
                <td style="background:#A4CCA4;color:#fff;">Action</td>
              </tr>
              <tbody></tbody>
            </table>
          </td>
        </tr>
      );

      for (let c of course.mountedCourses) {
        let input = "";
        if (c.scoring) {
          input = <input type="checkbox" checked={c.scoring} value={c.scoring} disabled="true" />;
        } else {
          input = <input type="checkbox" value={c.scoring} disabled="true" />;
        }
        innertable.getElementsByTagName("tbody")[0].appendChild(
          <tr style="background:#fbfbfb">
            <td>{c.enrollmentOption}</td>
            <td>
              {c.courseCode} - {c.course} - {c.credit}
            </td>
            <td>{c.category}</td>
            <td>{c.level}</td>
            <td>
              <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
                {input}
                <span class="checkmark"></span>
              </label>
            </td>
            <td>{c.assignedTo}</td>
            <td>
              <button class="sp-btn sp-btn-default btn-small" onClick={(evt:Event)=>{
                  evt.preventDefault();
                  let elem = (((evt.target as HTMLInputElement).parentElement.parentElement) as HTMLTableRowElement);
                  elem.parentElement.removeChild(elem);
                  this._vm.removeCourse(elem.rowIndex);
              }}>Del</button>
            </td>
          </tr>
        );
        doc.appendChild(innertable);
      }
    }
  }
}
