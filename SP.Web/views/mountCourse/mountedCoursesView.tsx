import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { MountedCourseVm } from "../../viewModels/mountedCourseVm";
import { _ } from "../../group";
import { Confirm } from "../../confirm/confirm";
import { CustomRenderer } from "../../customRenderer";
// import { assignCourseModal } from "../assignCourseModal";

export class MountedCoursesView implements IView {
  constructor(private _vm: MountedCourseVm) {
    this._vm.updateCourseRowCommand.add(()=>{
      CustomRenderer.renderElements("courses",new MountedRow(this._vm).create());
    });
  }
  async oninitialized(): Promise<void> {

  }

  render(elementId: string): void {
    var temp = (
      <div class="sp-box">
        <div class="mc-row">
          <h1>Mounted Courses</h1>
          <div class="mountcourses-form">
            <div class="sp-row-col-2-5" id="lessFilters">
              <select id="academicYears" binding="Object.academicYear">
                <option value="">Please Select Academic Year</option>
                {this._vm.academicYears.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
              </select>
              <select id="programs" binding="Object.program">
                <option value="">Please Select Program</option>
                {this._vm.programs.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
              </select>
              <div class="sp-btn-row">
              <button class="sp-btn sp-btn-default btn-small" id="showFilters" style ="float:right">
                  More
                </button>
                <button class="sp-btn sp-btn-default btn-small" id="submit" style ="float:right">
                  View
                </button>
                
              </div>
            </div>
            <div class="sp-row-col-3" id="moreFilters">
              <select id="enrollmentOption">
                {this._vm.enrollmentOptions.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
              </select>
              <select id="category">
                {this._vm.categories.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
              </select>
              <select id="semester">
                {this._vm.semesters.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
              </select>
              <select id="level">
                {this._vm.levels.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
              </select>
              <select id="isScoring">
                {this._vm.scoring.map((x) => (
                  <option value={x.name}>{x.name}</option>
                ))}
              </select>

              <div class="sp-btn-row">
                <button class="sp-btn sp-btn-default btn-small" id="hideFilters">
                  Less
                </button>
              </div>
            </div>
            <div>
              <div class="mounted-horizontal">
                <table class="table">
                  <thead>
                    <th colspan="2">EnrollmentOption</th>
                    <th colspan="2">Level</th>
                    <th colspan="1">Category</th>
                    <th colspan="1">Specialization</th>
                  </thead>
                  <tbody id="courses">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let getCourses = async (evt: Event) => {
      evt.preventDefault();
      await this._vm.getMountedCourses();
    };

    let showFilters = async (evt: Event) => {
      evt.preventDefault();
      document.getElementById("moreFilters").style.removeProperty("display");
      document.getElementById("lessFilters").style.display = "none";
    };

    let hideFilters = async (evt: Event) => {
      evt.preventDefault();
      document.getElementById("moreFilters").style.display = "none";
      document.getElementById("lessFilters").style.removeProperty("display");
    };

    let buildQuery = async (evt: Event) => {
      evt.preventDefault();
      let tr = document.getElementById("courses");
      tr.textContent = "";
      let row = (
        <tr>
          <td binding="enrollmentOption"></td>
          <td binding="level"></td>
          <td binding="category"></td>
          <td binding="specialization"></td>
        </tr>
      );
      tr.appendChild(row);
      let el = evt.target as HTMLSelectElement;
      this._vm.buidQuery(el.id, el.value);
    };

    const doc = document.getElementById(elementId);
    doc.textContent = "";
    doc.appendChild(temp);

    document.getElementById("moreFilters").style.display = "none";

    document.getElementById("submit").onclick = getCourses;
    document.getElementById("showFilters").onclick = showFilters;
    document.getElementById("hideFilters").onclick = hideFilters;

    document.getElementById("enrollmentOption").onchange = buildQuery;
    document.getElementById("category").onchange = buildQuery;
    document.getElementById("semester").onchange = buildQuery;
    document.getElementById("level").onchange = buildQuery;
    document.getElementById("isScoring").onchange = buildQuery;

    this._vm.bind();
  }
}

export class MountedRow {
  constructor(private _vm: MountedCourseVm) {}
  
  private createRows(){
    let rows:HTMLTableRowElement[] = [];
    for(var course of this._vm.groupedCourses){
      let row:HTMLTableRowElement = <tr>
                   <td colspan="2">{course.enrollmentOption}</td>
                   <td colspan="2">{course.level}</td>
                   <td colspan="1">{course.category}</td>
                   <td colspan="1">{course.specialization}</td>
                </tr>;
        rows.push(row);
        rows.push(this.createHeader(course));       
    }
     return rows; 
  }

  private createHeader(course){
    return <tr>
             <td colspan="6">
                 <table class="table">
                 <thead style="background:#A4CCA4;color:#fff;">
                   <td>EnrollmentOption</td>
                   <td>Semester</td>
                   <td>Courses</td>
                   <td>Category</td>
                   <td>Level</td>
                   <td>Scoring</td>
                   <td>AssignedTo</td>
                   <td>Action</td>
                 </thead>
                 <tbody>
                   {
                    course.mountedCourses.map(c=>
                       <tr style="background:#fbfbfb ">
                       <td>{c.enrollmentOption}</td>
                       <td>{c.semester}</td>
                       <td>
                         {c.courseCode} - {c.courseName} - {c.credit}
                       </td>
                       <td>{c.category}</td>
                       <td>{c.level}</td>
                       <td>
                         <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
                          <input type="checkbox" checked={c.scoring} value={c.scoring} disabled="true" />
                           <span class="checkmark"></span>
                         </label>
                       </td>
                       <td onClick={(evt:Event)=>{
                         evt.preventDefault();
                         this.assignLecturer(evt,c);
                       }}>{c.assignedLecturer}</td>
                       <td>
                         <button class="sp-btn sp-btn-stOfResult btn-small" onClick={(evt:Event)=>{
                             evt.preventDefault();
                             let options = {
                              title: "Confirm",
                              message: `Are you sure you want to delete \n${c.courseName}?`,
                              okText: "Yes",
                              cancelText: "No",
                              onok: () => {
                                let row = (evt.target as HTMLButtonElement).parentElement.parentElement.parentElement;
                                debugger
                                row.parentElement.removeChild(row);
                                this._vm.deleteCourse(c);
                              },
                            };
                            new Confirm(options).open();
                         }}>
                           <i class="fa fa-trash" title="click to delete"></i>
                           </button>
                       </td>
                       </tr>)
                   }
                 </tbody>
               </table>
             </td>
           </tr>
  }

  create() {
    return this.createRows();
  }

  assignLecturer(e:Event,c){
    let assignedTo = (e.target as HTMLTableCellElement);
    let originalValue = (e.target as HTMLTableCellElement).textContent;
    let elem = e.target as HTMLTableCellElement;
    let tdAssignedTo = (
      <p class="assignedTo">
        <input id="lecturer" type="text" class="edit-text-field"  style="margin-bottom: 0px;max-width: 94%;"
          onKeyup={async (evt: Event) => {
            evt.preventDefault();
          showLecturers(evt);
          }} input />
         <div class="autocom-box3">
          <ul id="lecturerList">
          </ul>
          </div>        
        {/* <select value={c.assignedLecturer}>
          {this._vm.getLecturers().map((x) => (
            <option value={x.lecturerId}>{x.name}</option>
          ))}
        </select> */}
        <button class="tr-btn-primary" onClick={()=>{
          e.preventDefault();
          try{
            let newValue = assignedTo.getElementsByTagName("p")[0];
            let lecturerName = (newValue.children[0] as HTMLInputElement).value;
                const options = {
                  title: "Confirm",
                  message: `Are you sure you want to assign ${c.courseCode} to ${lecturerName}`,
                  okText: "Yes",
                  cancelText: "No",
                  padding: "0% 35% 0% 35%",
                  onok: async() => {
                    assignedTo.removeChild(assignedTo.getElementsByTagName("p")[0]);
                    assignedTo.innerText = lecturerName;
                    await this._vm.assignCourse(c.mountedCourseId,c.assignedTo);
                  }
                }
              new Confirm(options).open();
          }catch(err) {
          }
        }}>
          <li class="fa fa-check" style="height:16px;width:17px"></li>
        </button>
        <button class="tr-btn-default" onClick={()=>{
          e.preventDefault();
          assignedTo.removeChild(assignedTo.getElementsByTagName("p")[0]);
          assignedTo.innerText = originalValue;
        }}>
          <li class="fa fa-times" style="height:16px;width:17px"></li>
        </button>
      </p>
    );
    if (elem.tagName === "TD") {
      elem.textContent = "";
      elem.appendChild(tdAssignedTo);
      //let btns = tdAssignedTo.getElementsByTagName("button");
      // //SaveButton
      // (btns[0] as HTMLButtonElement).addEventListener("click", (e) => {
      //   e.preventDefault();
      //   try{
      //     let newValue = (((e.target as HTMLButtonElement).parentElement.parentElement as HTMLParagraphElement)
      //           .getElementsByTagName("select")[0] as HTMLSelectElement);
      //         const options = {
      //           title: "Confirm",
      //           message: `Are you sure you want to assign ${c.courseCode} to ${(newValue.selectedOptions as any)[0].innerHTML}`,
      //           okText: "Yes",
      //           cancelText: "No",
      //           padding: "0% 35% 0% 35%",
      //           onok: async() => {
                  
      //             let row = (e.target as HTMLButtonElement).parentElement.parentElement as HTMLParagraphElement;
      //             assignedTo.removeChild(row);
      //             debugger
      //             assignedTo.innerText = (newValue.selectedOptions as any)[0].innerHTML;
      //             await this._vm.assignCourse(c.mountedCourseId,(newValue.selectedOptions as any)[0].attributes.value.nodeValue);
      //           }
      //         }
      //       new Confirm(options).open();
      //   }catch{

      //   }
      // });

      // //CancelButton
      // btns[1].onclick = (e) => { 
      //   e.preventDefault();
      //   let row = (e.target as HTMLButtonElement).parentElement.parentElement as HTMLParagraphElement;
      //   assignedTo.removeChild(row);
      //   assignedTo.innerText = originalValue;
      // };
    }
     let showLecturers = async(evt: Event) => {
      let textbox = (evt.target as HTMLInputElement);
        let lecturers = [];
       if (textbox.value !== '') {
          lecturers = await this._vm.getLecturer(textbox.value);
        }
        let suggestions = document.getElementById("lecturerList");
        suggestions.textContent = '';
        for(var l of lecturers){
          let li = (<li>{l.name}</li> as HTMLLinkElement);
          li.onclick = ()=>{
            textbox.value = li.innerHTML.trim();
            c.assignedLecturer = textbox.value;
            suggestions.textContent = '';
           c.assignedTo = lecturers.find((x)=>x.name===li.innerHTML.trim()).lecturerId;
          }   
          suggestions.appendChild(li);
        }
    }
  }
}
