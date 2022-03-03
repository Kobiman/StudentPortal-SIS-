import { IView } from "../../IView";
import { createElement } from "tsx-create-element";
import { MountCourseViewModel } from "../../viewModels/mountCourseVm";
import { SelectedCourse } from "../../models/SelectedCourse";

export class MountedCourseView {
  constructor(private _vm: MountCourseViewModel) {}
  render() {
    let temp = (
      <tr>
        <td binding="EnrollmentOption"></td>
        <td binding="Course"></td>
        <td binding="Category"></td>
        <td binding="Level"></td>
        <td binding="Scoring"></td>
        <td binding="AssignedTo"></td>
      </tr>
    );

    var doc = document.getElementById("selectedCourses") as HTMLTableElement;
    doc.textContent = "";
    doc.appendChild(temp);
  }
}
