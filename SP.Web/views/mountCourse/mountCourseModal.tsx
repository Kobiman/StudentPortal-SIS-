import { createElement } from "tsx-create-element";
import { MountCourseViewModel } from "../../viewModels/mountCourseVm";
import { IView } from "../../IView";
import { Confirm } from "../../confirm/confirm";
import { HtmlSelect } from "../HtmlSelect";
import { CustomRenderer } from "../../customRenderer";

export class MountCourseModal implements IView {
  constructor(private _vm: MountCourseViewModel) {
    
    this._vm.programUpdatedCommand.add(
      ()=>{
        let elem = HtmlSelect.create(this._vm.mountedCourse.program,
          this._vm.programs.map(x=><option value={x.name}>{x.name}</option>),
          "",
         "Please Select Program"
         );
         elem.onchange = (evt:Event)=>{
          evt.preventDefault();
          this._vm.mountedCourse.program = (evt.target as HTMLSelectElement).value
        };
        CustomRenderer.render("program",elem)
      });

      this._vm.specializationUpdatedCommand.add(
        ()=>{
          let elem = HtmlSelect.create(this._vm.mountedCourse.specialization,
            this._vm.specializations.map(x=><option value={x.specializationId}>{x.name}</option>),
            "SelectedCourse.specialization",
            "Please Select Specialization");
            elem.onchange = (evt:Event)=>{
              evt.preventDefault();
              let elem = (evt.target as HTMLSelectElement);
              this._vm.mountedCourse.specialization = elem.value;
            };
        CustomRenderer.render("specialization",elem)
        }
      );

      this._vm.courseAddedCommand.add(()=>{
        let course = (document.getElementById("course") as HTMLInputElement);
        let lecturer = (document.getElementById("lecturer") as HTMLInputElement);
        if(course && lecturer){
          course.value = "";
          lecturer.value = "";
        }
      });
  }
  async oninitialized(): Promise<void> {
  }
  render = (elementId: string) => {
    let temp = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content">
          <div class="sp-box">
            <div class="sp-row">
              <button class="modal-btn" id="close">
                <li class="fa fa-times"></li>
              </button>
              <h1>Mount Courses</h1>
              <div class="mountcourses-form">
                <p>
                  <select binding="SelectedCourse.enrollmentOption" value={this._vm.mountedCourse.enrollmentOption}>
                    <option>Please Select EnrollmentOption</option>
                    {this._vm.getEnrollmentOption().map((x) => (
                      <option value={x.name}>{x.name}</option>
                    ))}
                  </select>
                  <div errors="enrollmentOption"></div>
                </p>
                <p>
                  <select value={this._vm.mountedCourse.department} 
                    onChange={(evt:Event)=>{
                        this._vm.getProgramsByDepartment((evt.target as HTMLSelectElement).value);
                     }}>
                    <option>Please Select Department</option>
                    {this._vm.getDepartments().map((x) => (
                      <option value={x.departmentId}>{x.name}</option>
                    ))}
                  </select>
                  <div errors="department"></div>
                </p>
                <p id="program">
                  {
                    HtmlSelect.create(this._vm.mountedCourse.program,
                                <option>Please Select Program</option>,
                                "")
                  }
                  <div errors="program"></div>
                </p>
                <div class="sp-row-col-1-1-3">
                <p>
                    <select value={this._vm.mountedCourse.category} onChange={(evt:Event)=>{
                      evt.preventDefault();
                      let elem = (evt.target as HTMLSelectElement);
                      this._vm.mountedCourse.category = elem.value;
                    }}>
                      <option>Please Select Categry</option>
                      {this._vm.getCourseTypes().map((x) => (
                        <option value={x.name}>{x.name}</option>
                      ))}
                    </select>
                    <div errors="type"></div>
                  </p>
                  <p>
                    <select value={this._vm.mountedCourse.level} onChange={(evt:Event)=>{
                        evt.preventDefault();
                        this._vm.getSpecializations((evt.target as HTMLSelectElement).value);
                      }}>
                      <option>Please Select Level</option>
                      {this._vm.getLevels().map((x) => (
                        <option value={x.name}>{x.name}</option>
                      ))}
                    </select>
                    <div errors="level"></div>
                  </p>
                  <p id="specialization">
                    {
                       HtmlSelect.create(this._vm.mountedCourse.specialization,
                        <option value="">Please Select Specialization</option>,
                        "SelectedCourse.specialization")
                    }
                    <div errors="specialization"></div>
                  </p>
                </div>
                 <p>
                 <input id="course" type="text" placeholder="search course" style="margin-bottom: 0;width: -webkit-fill-available;" onKeyup={async(evt:Event) => {
                  evt.preventDefault();
                  showAllcourses(evt);
                 }}/>
                  <div class="autocom-box">
                    <ul id="suggestions">
                   </ul>
                  </div>
                  <div errors="course"></div>
                 </p>
                 <p>
                    <input id="lecturer" type="text" placeholder="Assign to" style="margin-bottom: 0px;width: -webkit-fill-available;" onKeyup={async(evt:Event)=>{
                      showLecturers(evt);
                    }}/>
                    <div class="autocom-box">
                    <ul id="lecturers">
                    </ul>
                    </div>
                    <div errors="assignedTo"></div>
                 </p>
                 <p>
                    <label class="check-content margin-0">
                      Scoring
                      <input id="scoring" type="checkbox" checked={true} value={true} onChange={(evt:Event)=>{
                        this._vm.mountedCourse.scoring = (evt.target as HTMLInputElement).checked;
                      }}/>
                      <span class="checkmark"></span>
                    </label>
                 </p>
                 <p>
                    <button class="sp-btn sp-btn-primary" onClick={(evt:Event)=>{
                           evt.preventDefault();
                           this._vm.addCourse();
                    }}>
                       Add
                    </button>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const doc = document.getElementById(elementId);
    //doc.textContent = "";
    doc.appendChild(temp);

    let hideModal = async (evt: Event) => {
      evt.preventDefault();
      //App.navigate("/app/#mountCourse");
      let elem = document.getElementById("modal");
      let doc = document.getElementById("route-outlet");
      doc.removeChild(elem);
    };

    let getSpecializations = async (evt: Event) => {
      evt.preventDefault();
      let value = (evt.target as HTMLSelectElement).value;
      this._vm.getSpecializations(value);
      this._vm.mountedCourse["level"] = value;
      let specializations = document.getElementById("specializations");
      specializations.textContent = "";
      specializations.appendChild(<option></option>);
      this._vm.specializations.map((x) => specializations.appendChild(<option>{x.name}</option>));
    };

    let showAllcourses = async(evt: Event) => {
      let textbox = (evt.target as HTMLInputElement);
        let courses = [];
        if(textbox.value !== ''){
          courses = await this._vm.getAllCourses(textbox.value);
        }
        let suggestions = document.getElementById("suggestions");
        suggestions.textContent = '';
        for(var c of courses){
          let li = (<li>{c.code} : {c.courseName} : {c.credit}</li> as HTMLLinkElement);
          li.onclick = ()=>{
            textbox.value = li.innerHTML.split(':')[1].trim();
            suggestions.textContent = '';
            this._vm.mountedCourse.course = textbox.value;
          }
          suggestions.appendChild(li);
        }
    }

    let showLecturers = async(evt: Event) => {
      let textbox = (evt.target as HTMLInputElement);
        let lecturers = [];
        if(textbox.value !== ''){
          lecturers = await this._vm.getLecturers(textbox.value);
        }
        let suggestions = document.getElementById("lecturers");
        suggestions.textContent = '';
        for(var l of lecturers){
          let li = (<li>{l.name} : {l.email}</li> as HTMLLinkElement);
          li.onclick = ()=>{
            textbox.value = li.innerHTML.split(':')[0].trim();
            suggestions.textContent = '';
            this._vm.mountedCourse.assignedTo = textbox.value;
          }   
          suggestions.appendChild(li);
        }
    }
    
    this._vm.bind();

    document.getElementById("close").onclick = hideModal;
    //document.getElementById("levels").onchange = getSpecializations;
  };
}

