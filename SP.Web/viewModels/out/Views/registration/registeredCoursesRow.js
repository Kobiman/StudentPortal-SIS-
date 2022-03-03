import { createElement } from "tsx-create-element";
import { _ } from "../../group";
export class RegisteredCoursesRow {
    constructor() {
        this.tr = document.getElementById("courseList");
        this.tr.textContent = "";
    }
    render(registeredCourse) {
        let element = (createElement("tr", null,
            createElement("td", null, _.formatDate(new Date(registeredCourse.registrationDate))),
            createElement("td", null, registeredCourse.courseCode),
            createElement("td", null, registeredCourse.courseCode),
            createElement("td", null, registeredCourse.courseName),
            createElement("td", null, registeredCourse.credit)));
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
//# sourceMappingURL=registeredCoursesRow.js.map