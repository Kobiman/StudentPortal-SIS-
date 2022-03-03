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
import { Confirm } from "../../confirm/confirm";
import { CustomRenderer } from "../../customRenderer";
// import { assignCourseModal } from "../assignCourseModal";
export class MountedCoursesView {
    constructor(_vm) {
        this._vm = _vm;
        this._vm.updateCourseRowCommand.add(() => {
            CustomRenderer.renderElements("courses", new MountedRow(this._vm).create());
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Mounted Courses"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-row-col-2-5", id: "lessFilters" },
                        createElement("select", { id: "academicYears", binding: "Object.academicYear" },
                            createElement("option", { value: "" }, "Please Select Academic Year"),
                            this._vm.academicYears.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "programs", binding: "Object.program" },
                            createElement("option", { value: "" }, "Please Select Program"),
                            this._vm.programs.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "showFilters", style: "float:right" }, "More"),
                            createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "submit", style: "float:right" }, "View"))),
                    createElement("div", { class: "sp-row-col-3", id: "moreFilters" },
                        createElement("select", { id: "enrollmentOption" }, this._vm.enrollmentOptions.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "category" }, this._vm.categories.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "semester" }, this._vm.semesters.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "level" }, this._vm.levels.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "isScoring" }, this._vm.scoring.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "hideFilters" }, "Less"))),
                    createElement("div", null,
                        createElement("div", { class: "mounted-horizontal" },
                            createElement("table", { class: "table" },
                                createElement("thead", null,
                                    createElement("th", { colspan: "2" }, "EnrollmentOption"),
                                    createElement("th", { colspan: "2" }, "Level"),
                                    createElement("th", { colspan: "1" }, "Category"),
                                    createElement("th", { colspan: "1" }, "Specialization")),
                                createElement("tbody", { id: "courses" }))))))));
        let getCourses = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            yield this._vm.getMountedCourses();
        });
        let showFilters = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            document.getElementById("moreFilters").style.removeProperty("display");
            document.getElementById("lessFilters").style.display = "none";
        });
        let hideFilters = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            document.getElementById("moreFilters").style.display = "none";
            document.getElementById("lessFilters").style.removeProperty("display");
        });
        let buildQuery = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            let tr = document.getElementById("courses");
            tr.textContent = "";
            let row = (createElement("tr", null,
                createElement("td", { binding: "enrollmentOption" }),
                createElement("td", { binding: "level" }),
                createElement("td", { binding: "category" }),
                createElement("td", { binding: "specialization" })));
            tr.appendChild(row);
            let el = evt.target;
            this._vm.buidQuery(el.id, el.value);
        });
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
    constructor(_vm) {
        this._vm = _vm;
    }
    createRows() {
        let rows = [];
        for (var course of this._vm.groupedCourses) {
            let row = createElement("tr", null,
                createElement("td", { colspan: "2" }, course.enrollmentOption),
                createElement("td", { colspan: "2" }, course.level),
                createElement("td", { colspan: "1" }, course.category),
                createElement("td", { colspan: "1" }, course.specialization));
            rows.push(row);
            rows.push(this.createHeader(course));
        }
        return rows;
    }
    createHeader(course) {
        return createElement("tr", null,
            createElement("td", { colspan: "6" },
                createElement("table", { class: "table" },
                    createElement("thead", { style: "background:#A4CCA4;color:#fff;" },
                        createElement("td", null, "EnrollmentOption"),
                        createElement("td", null, "Semester"),
                        createElement("td", null, "Courses"),
                        createElement("td", null, "Category"),
                        createElement("td", null, "Level"),
                        createElement("td", null, "Scoring"),
                        createElement("td", null, "AssignedTo"),
                        createElement("td", null, "Action")),
                    createElement("tbody", null, course.mountedCourses.map(c => createElement("tr", { style: "background:#fbfbfb " },
                        createElement("td", null, c.enrollmentOption),
                        createElement("td", null, c.semester),
                        createElement("td", null,
                            c.courseCode,
                            " - ",
                            c.courseName,
                            " - ",
                            c.credit),
                        createElement("td", null, c.category),
                        createElement("td", null, c.level),
                        createElement("td", null,
                            createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                                createElement("input", { type: "checkbox", checked: c.scoring, value: c.scoring, disabled: "true" }),
                                createElement("span", { class: "checkmark" }))),
                        createElement("td", { onClick: (evt) => {
                                evt.preventDefault();
                                this.assignLecturer(evt, c);
                            } }, c.assignedLecturer),
                        createElement("td", null,
                            createElement("button", { class: "sp-btn sp-btn-stOfResult btn-small", onClick: (evt) => {
                                    evt.preventDefault();
                                    let options = {
                                        title: "Confirm",
                                        message: `Are you sure you want to delete \n${c.courseName}?`,
                                        okText: "Yes",
                                        cancelText: "No",
                                        onok: () => {
                                            let row = evt.target.parentElement.parentElement.parentElement;
                                            debugger;
                                            row.parentElement.removeChild(row);
                                            this._vm.deleteCourse(c);
                                        },
                                    };
                                    new Confirm(options).open();
                                } },
                                createElement("i", { class: "fa fa-trash", title: "click to delete" })))))))));
    }
    create() {
        return this.createRows();
    }
    assignLecturer(e, c) {
        let assignedTo = e.target;
        let originalValue = e.target.textContent;
        let elem = e.target;
        let tdAssignedTo = (createElement("p", { class: "assignedTo" },
            createElement("input", { id: "lecturer", type: "text", class: "edit-text-field", style: "margin-bottom: 0px;max-width: 94%;", onKeyup: (evt) => __awaiter(this, void 0, void 0, function* () {
                    evt.preventDefault();
                    showLecturers(evt);
                }), input: true }),
            createElement("div", { class: "autocom-box3" },
                createElement("ul", { id: "lecturerList" })),
            createElement("button", { class: "tr-btn-primary", onClick: () => {
                    e.preventDefault();
                    try {
                        let newValue = assignedTo.getElementsByTagName("p")[0];
                        let lecturerName = newValue.children[0].value;
                        const options = {
                            title: "Confirm",
                            message: `Are you sure you want to assign ${c.courseCode} to ${lecturerName}`,
                            okText: "Yes",
                            cancelText: "No",
                            padding: "0% 35% 0% 35%",
                            onok: () => __awaiter(this, void 0, void 0, function* () {
                                assignedTo.removeChild(assignedTo.getElementsByTagName("p")[0]);
                                assignedTo.innerText = lecturerName;
                                yield this._vm.assignCourse(c.mountedCourseId, c.assignedTo);
                            })
                        };
                        new Confirm(options).open();
                    }
                    catch (err) {
                    }
                } },
                createElement("li", { class: "fa fa-check", style: "height:16px;width:17px" })),
            createElement("button", { class: "tr-btn-default", onClick: () => {
                    e.preventDefault();
                    assignedTo.removeChild(assignedTo.getElementsByTagName("p")[0]);
                    assignedTo.innerText = originalValue;
                } },
                createElement("li", { class: "fa fa-times", style: "height:16px;width:17px" }))));
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
        let showLecturers = (evt) => __awaiter(this, void 0, void 0, function* () {
            let textbox = evt.target;
            let lecturers = [];
            if (textbox.value !== '') {
                lecturers = yield this._vm.getLecturer(textbox.value);
            }
            let suggestions = document.getElementById("lecturerList");
            suggestions.textContent = '';
            for (var l of lecturers) {
                let li = createElement("li", null, l.name);
                li.onclick = () => {
                    textbox.value = li.innerHTML.trim();
                    c.assignedLecturer = textbox.value;
                    suggestions.textContent = '';
                    c.assignedTo = lecturers.find((x) => x.name === li.innerHTML.trim()).lecturerId;
                };
                suggestions.appendChild(li);
            }
        });
    }
}
//# sourceMappingURL=mountedCoursesView.js.map