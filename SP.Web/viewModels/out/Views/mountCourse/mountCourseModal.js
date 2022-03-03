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
import { HtmlSelect } from "../HtmlSelect";
import { CustomRenderer } from "../../customRenderer";
export class MountCourseModal {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            let temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
                createElement("div", { class: "modal-content" },
                    createElement("div", { class: "sp-box" },
                        createElement("div", { class: "sp-row" },
                            createElement("button", { class: "modal-btn", id: "close" },
                                createElement("li", { class: "fa fa-times" })),
                            createElement("h1", null, "Mount Courses"),
                            createElement("div", { class: "mountcourses-form" },
                                createElement("p", null,
                                    createElement("select", { binding: "SelectedCourse.enrollmentOption", value: this._vm.mountedCourse.enrollmentOption },
                                        createElement("option", null, "Please Select EnrollmentOption"),
                                        this._vm.getEnrollmentOption().map((x) => (createElement("option", { value: x.name }, x.name)))),
                                    createElement("div", { errors: "enrollmentOption" })),
                                createElement("p", null,
                                    createElement("select", { value: this._vm.mountedCourse.department, onChange: (evt) => {
                                            this._vm.getProgramsByDepartment(evt.target.value);
                                        } },
                                        createElement("option", null, "Please Select Department"),
                                        this._vm.getDepartments().map((x) => (createElement("option", { value: x.departmentId }, x.name)))),
                                    createElement("div", { errors: "department" })),
                                createElement("p", { id: "program" },
                                    HtmlSelect.create(this._vm.mountedCourse.program, createElement("option", null, "Please Select Program"), ""),
                                    createElement("div", { errors: "program" })),
                                createElement("div", { class: "sp-row-col-1-1-3" },
                                    createElement("p", null,
                                        createElement("select", { value: this._vm.mountedCourse.category, onChange: (evt) => {
                                                evt.preventDefault();
                                                let elem = evt.target;
                                                this._vm.mountedCourse.category = elem.value;
                                            } },
                                            createElement("option", null, "Please Select Categry"),
                                            this._vm.getCourseTypes().map((x) => (createElement("option", { value: x.name }, x.name)))),
                                        createElement("div", { errors: "type" })),
                                    createElement("p", null,
                                        createElement("select", { value: this._vm.mountedCourse.level, onChange: (evt) => {
                                                evt.preventDefault();
                                                this._vm.getSpecializations(evt.target.value);
                                            } },
                                            createElement("option", null, "Please Select Level"),
                                            this._vm.getLevels().map((x) => (createElement("option", { value: x.name }, x.name)))),
                                        createElement("div", { errors: "level" })),
                                    createElement("p", { id: "specialization" },
                                        HtmlSelect.create(this._vm.mountedCourse.specialization, createElement("option", { value: "" }, "Please Select Specialization"), "SelectedCourse.specialization"),
                                        createElement("div", { errors: "specialization" }))),
                                createElement("p", null,
                                    createElement("input", { id: "course", type: "text", placeholder: "search course", style: "margin-bottom: 0;width: -webkit-fill-available;", onKeyup: (evt) => __awaiter(this, void 0, void 0, function* () {
                                            evt.preventDefault();
                                            showAllcourses(evt);
                                        }) }),
                                    createElement("div", { class: "autocom-box" },
                                        createElement("ul", { id: "suggestions" })),
                                    createElement("div", { errors: "course" })),
                                createElement("p", null,
                                    createElement("input", { id: "lecturer", type: "text", placeholder: "Assign to", style: "margin-bottom: 0px;width: -webkit-fill-available;", onKeyup: (evt) => __awaiter(this, void 0, void 0, function* () {
                                            showLecturers(evt);
                                        }) }),
                                    createElement("div", { class: "autocom-box" },
                                        createElement("ul", { id: "lecturers" })),
                                    createElement("div", { errors: "assignedTo" })),
                                createElement("p", null,
                                    createElement("label", { class: "check-content margin-0" },
                                        "Scoring",
                                        createElement("input", { id: "scoring", type: "checkbox", checked: true, value: true, onChange: (evt) => {
                                                this._vm.mountedCourse.scoring = evt.target.checked;
                                            } }),
                                        createElement("span", { class: "checkmark" }))),
                                createElement("p", null,
                                    createElement("button", { class: "sp-btn sp-btn-primary", onClick: (evt) => {
                                            evt.preventDefault();
                                            this._vm.addCourse();
                                        } }, "Add"))))))));
            const doc = document.getElementById(elementId);
            //doc.textContent = "";
            doc.appendChild(temp);
            let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                //App.navigate("/app/#mountCourse");
                let elem = document.getElementById("modal");
                let doc = document.getElementById("route-outlet");
                doc.removeChild(elem);
            });
            let getSpecializations = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let value = evt.target.value;
                this._vm.getSpecializations(value);
                this._vm.mountedCourse["level"] = value;
                let specializations = document.getElementById("specializations");
                specializations.textContent = "";
                specializations.appendChild(createElement("option", null));
                this._vm.specializations.map((x) => specializations.appendChild(createElement("option", null, x.name)));
            });
            let showAllcourses = (evt) => __awaiter(this, void 0, void 0, function* () {
                let textbox = evt.target;
                let courses = [];
                if (textbox.value !== '') {
                    courses = yield this._vm.getAllCourses(textbox.value);
                }
                let suggestions = document.getElementById("suggestions");
                suggestions.textContent = '';
                for (var c of courses) {
                    let li = createElement("li", null,
                        c.code,
                        " : ",
                        c.courseName,
                        " : ",
                        c.credit);
                    li.onclick = () => {
                        textbox.value = li.innerHTML.split(':')[1].trim();
                        suggestions.textContent = '';
                        this._vm.mountedCourse.course = textbox.value;
                    };
                    suggestions.appendChild(li);
                }
            });
            let showLecturers = (evt) => __awaiter(this, void 0, void 0, function* () {
                let textbox = evt.target;
                let lecturers = [];
                if (textbox.value !== '') {
                    lecturers = yield this._vm.getLecturers(textbox.value);
                }
                let suggestions = document.getElementById("lecturers");
                suggestions.textContent = '';
                for (var l of lecturers) {
                    let li = createElement("li", null,
                        l.name,
                        " : ",
                        l.email);
                    li.onclick = () => {
                        textbox.value = li.innerHTML.split(':')[0].trim();
                        suggestions.textContent = '';
                        this._vm.mountedCourse.assignedTo = textbox.value;
                    };
                    suggestions.appendChild(li);
                }
            });
            this._vm.bind();
            document.getElementById("close").onclick = hideModal;
            //document.getElementById("levels").onchange = getSpecializations;
        };
        this._vm.programUpdatedCommand.add(() => {
            let elem = HtmlSelect.create(this._vm.mountedCourse.program, this._vm.programs.map(x => createElement("option", { value: x.name }, x.name)), "", "Please Select Program");
            elem.onchange = (evt) => {
                evt.preventDefault();
                this._vm.mountedCourse.program = evt.target.value;
            };
            CustomRenderer.render("program", elem);
        });
        this._vm.specializationUpdatedCommand.add(() => {
            let elem = HtmlSelect.create(this._vm.mountedCourse.specialization, this._vm.specializations.map(x => createElement("option", { value: x.specializationId }, x.name)), "SelectedCourse.specialization", "Please Select Specialization");
            elem.onchange = (evt) => {
                evt.preventDefault();
                let elem = evt.target;
                this._vm.mountedCourse.specialization = elem.value;
            };
            CustomRenderer.render("specialization", elem);
        });
        this._vm.courseAddedCommand.add(() => {
            let course = document.getElementById("course");
            let lecturer = document.getElementById("lecturer");
            if (course && lecturer) {
                course.value = "";
                lecturer.value = "";
            }
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=mountCourseModal.js.map