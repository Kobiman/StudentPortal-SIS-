import { createElement } from "tsx-create-element";
import { _ } from "../../group";

export class RegisteredCoursesRow {
  constructor() {
    this.tr = document.getElementById("courseList");
    this.tr.textContent = "";
  }

  tr: any;
  render(registeredCourse: any) {
    let element: HTMLTableRowElement = (
      <tr>
        <td>{_.formatDate(new Date(registeredCourse.registrationDate))}</td>
        <td>{registeredCourse.courseCode}</td>
        <td>{registeredCourse.courseCode}</td>
        <td>{registeredCourse.courseName}</td>
        <td>{registeredCourse.credit}</td>
      </tr>
    );

    // let elements = element.querySelectorAll("[binding]");
    // elements.forEach((e) => {
    //   if (e.tagName === "INPUT") {
    //     let el = e as HTMLInputElement;

    //     el.addEventListener("change", (e) => {
    //       e.preventDefault();
    //       let courseCode = element.cells[0].textContent;
    //       if (el.checked) {
    //         this._vm.addCourse(courseCode);
    //       } else if (!el.checked) {
    //         this._vm.removeCourse(courseCode);
    //       }
    //     });
    //   }
    // });

    this.tr.append(element);
  }
}
