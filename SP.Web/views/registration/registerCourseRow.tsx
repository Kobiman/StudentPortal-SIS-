import { RegisterCourseVm } from "../../viewModels/registerCourseVm";
import { createElement } from "tsx-create-element";

export class RegisterCourseRow {
  sum=0;
  constructor(private _vm: RegisterCourseVm) {

  }

  create(registeredCourse: any) {
    let checkBox = "";
    if (registeredCourse && registeredCourse.category !== "ELECTIVE") {
      checkBox = <input type="checkbox" binding="selected" checked="true" disabled />;
    } else {
      checkBox = <input type="checkbox" binding="selected" onChange={(evt:Event)=>{
        let elem = (evt.target as HTMLInputElement);
        if (elem.checked) {
                  this._vm.addCourse(registeredCourse);
                } else if (!elem.checked) {
                  this._vm.removeCourse(registeredCourse);
                }
      }}/>;
    }

    return (
      <tr>
        <td>
          {registeredCourse.courseCode} - {registeredCourse.courseName} - {registeredCourse.credit}
        </td>
        <td>{registeredCourse.lecturer}</td>
        <td>{registeredCourse.category}</td>
        <td>
          <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
            {checkBox}
            <span class="checkmark"></span>
          </label>
        </td>
      </tr>
    );
    
  }

  createTrail(registeredCourse: any) {
    let checkBox = "";
      checkBox = <input type="checkbox" binding="selected" onChange={(evt:Event)=>{
        let elem = (evt.target as HTMLInputElement);
        if (elem.checked) {
                  this._vm.addCourse(registeredCourse);
                } else if (!elem.checked) {
                  this._vm.removeCourse(registeredCourse);
                }
      }}/>;
    return (
      <tr>
        <td>
          {registeredCourse.courseCode} - {registeredCourse.courseName} - {registeredCourse.credit}
        </td>
        <td>{registeredCourse.lecturer}</td>
        <td>{registeredCourse.category}</td>
        <td>
          <label class="check-content" style="margin-bottom: 0px;margin-top: 0px;padding-top: 0px;">
            {checkBox}
            <span class="checkmark"></span>
          </label>
        </td>
      </tr>
    );
    
  }
  
}
