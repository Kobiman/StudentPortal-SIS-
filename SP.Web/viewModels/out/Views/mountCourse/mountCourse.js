var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createElement } from "tsx-create-element";
import { MountCourseModal } from "./mountCourseModal";
export class MountCourseView {
    constructor(_vm) {
        this._vm = _vm;
        this._vm.courseAddedCommand.add(() => {
            this.nestedTable();
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Mount Courses"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-btn-row" },
                        createElement("button", { id: "Save", class: "sp-btn sp-btn-primary btn-small", style: "float:right" }, "Save"),
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "mountCourese", style: "float:right" }, "Mount")),
                    createElement("div", null,
                        createElement("table", { class: "table-hd", id: "mountCourseHead" },
                            createElement("thead", null,
                                createElement("th", null, "EnrollmentOption"),
                                createElement("th", null, "Program"),
                                createElement("th", null, "Level"),
                                createElement("th", null, "Specialization"),
                                createElement("th", null, "Category"))),
                        createElement("div", { class: "horizontal" },
                            createElement("table", { class: "table", id: "mountCourse" }, createElement("tbody", { id: "nestedTable" }))))))));
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            new MountCourseModal(this._vm).render("route-outlet");
        });
        let save = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            yield this._vm.save();
        });
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        document.getElementById("mountCourese").onclick = showModal;
        document.getElementById("Save").onclick = save;
        this._vm.bindList("selectedCourses");
    }
    nestedTable() {
        let courses = this._vm.mountedCourses;
        let doc = document.getElementById("nestedTable");
        doc.textContent = "";
        for (let course of courses) {
            let tr = (createElement("tr", null,
                createElement("td", null, course.enrollmentOption),
                createElement("td", null, course.program),
                createElement("td", null, course.level),
                createElement("td", null, course.specialization),
                createElement("td", null, course.category)));
            doc.appendChild(tr);
            let innertable = (createElement("tr", null,
                createElement("td", { colspan: "5" },
                    createElement("table", { class: "table" },
                        createElement("tr", null,
                            createElement("td", { style: "background:#A4CCA4;color:#fff;" }, "EnrollmentOption"),
                            createElement("td", { style: "background:#A4CCA4;color:#fff;" }, "Courses"),
                            createElement("td", { style: "background:#A4CCA4;color:#fff;" }, "Category"),
                            createElement("td", { style: "background:#A4CCA4;color:#fff;" }, "Level"),
                            createElement("td", { style: "background:#A4CCA4;color:#fff;" }, "Scoring"),
                            createElement("td", { style: "background:#A4CCA4;color:#fff;" }, "AssignedTo"),
                            createElement("td", { style: "background:#A4CCA4;color:#fff;" }, "Action")),
                        createElement("tbody", null)))));
            for (let c of course.mountedCourses) {
                let input = "";
                if (c.scoring) {
                    input = createElement("input", { type: "checkbox", checked: c.scoring, value: c.scoring, disabled: "true" });
                }
                else {
                    input = createElement("input", { type: "checkbox", value: c.scoring, disabled: "true" });
                }
                innertable.getElementsByTagName("tbody")[0].appendChild(createElement("tr", { style: "background:#fbfbfb" },
                    createElement("td", null, c.enrollmentOption),
                    createElement("td", null,
                        c.courseCode,
                        " - ",
                        c.course,
                        " - ",
                        c.credit),
                    createElement("td", null, c.category),
                    createElement("td", null, c.level),
                    createElement("td", null,
                        createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                            input,
                            createElement("span", { class: "checkmark" }))),
                    createElement("td", null, c.assignedTo),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", onClick: (evt) => {
                                evt.preventDefault();
                                let elem = (evt.target.parentElement.parentElement);
                                elem.parentElement.removeChild(elem);
                                this._vm.removeCourse(elem.rowIndex);
                            } }, "Del"))));
                doc.appendChild(innertable);
            }
        }
    }
}
//# sourceMappingURL=mountCourse.js.map