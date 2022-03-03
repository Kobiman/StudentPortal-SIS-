import { createElement } from "tsx-create-element";
export class MountedCourseView {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        let temp = (createElement("tr", null,
            createElement("td", { binding: "EnrollmentOption" }),
            createElement("td", { binding: "Course" }),
            createElement("td", { binding: "Category" }),
            createElement("td", { binding: "Level" }),
            createElement("td", { binding: "Scoring" }),
            createElement("td", { binding: "AssignedTo" })));
        var doc = document.getElementById("selectedCourses");
        doc.textContent = "";
        doc.appendChild(temp);
    }
}
//# sourceMappingURL=mountedCourse.js.map