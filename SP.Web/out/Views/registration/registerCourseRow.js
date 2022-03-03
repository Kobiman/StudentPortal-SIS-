import { createElement } from "tsx-create-element";
export class RegisterCourseRow {
    constructor(_vm) {
        this._vm = _vm;
        this.sum = 0;
    }
    create(registeredCourse) {
        let checkBox = "";
        if (registeredCourse && registeredCourse.category !== "ELECTIVE") {
            checkBox = createElement("input", { type: "checkbox", binding: "selected", checked: "true", disabled: true });
        }
        else {
            checkBox = createElement("input", { type: "checkbox", binding: "selected", onChange: (evt) => {
                    let elem = evt.target;
                    if (elem.checked) {
                        this._vm.addCourse(registeredCourse);
                    }
                    else if (!elem.checked) {
                        this._vm.removeCourse(registeredCourse);
                    }
                } });
        }
        return (createElement("tr", null,
            createElement("td", null,
                registeredCourse.courseCode,
                " - ",
                registeredCourse.courseName,
                " - ",
                registeredCourse.credit),
            createElement("td", null, registeredCourse.lecturer),
            createElement("td", null, registeredCourse.category),
            createElement("td", null,
                createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                    checkBox,
                    createElement("span", { class: "checkmark" })))));
    }
    createTrail(registeredCourse) {
        let checkBox = "";
        checkBox = createElement("input", { type: "checkbox", binding: "selected", onChange: (evt) => {
                let elem = evt.target;
                if (elem.checked) {
                    this._vm.addCourse(registeredCourse);
                }
                else if (!elem.checked) {
                    this._vm.removeCourse(registeredCourse);
                }
            } });
        return (createElement("tr", null,
            createElement("td", null,
                registeredCourse.courseCode,
                " - ",
                registeredCourse.courseName,
                " - ",
                registeredCourse.credit),
            createElement("td", null, registeredCourse.lecturer),
            createElement("td", null, registeredCourse.category),
            createElement("td", null,
                createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                    checkBox,
                    createElement("span", { class: "checkmark" })))));
    }
}
//# sourceMappingURL=registerCourseRow.js.map