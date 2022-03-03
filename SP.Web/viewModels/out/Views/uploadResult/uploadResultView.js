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
import { UploadResultModal } from "./uploadResultModal";
export class UploadResultView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            const headers = [
                "No",
                "Index Number",
                "Name",
                "Level",
                "Course Code",
                "Class Score(40%)",
                "Exam Score(60%)",
                "Total",
                "Grade",
            ];
            let temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "mc-row" },
                    createElement("h1", null, "Upload Results"),
                    createElement("div", { class: "mountcourses-form" },
                        createElement("div", { class: "sp-row-col-4" },
                            createElement("p", null,
                                createElement("select", { filter: true }, this._vm.getAcademicYears().map((x) => (createElement("option", { binding: "MountedCourseForResultUploadRequest.AcademicYear", value: x.name }, x.name))))),
                            createElement("p", null,
                                createElement("select", { filter: true }, this._vm.getEnrollmentOptions().map((x) => (createElement("option", { binding: "MountedCourseForResultUploadRequest.EnrollmentOption", value: x.name }, x.name))))),
                            createElement("p", null,
                                createElement("select", { filter: true }, this._vm.getSemesters().map((x) => (createElement("option", { binding: "MountedCourseForResultUploadRequest.Semester", value: x.name }, x.name))))),
                            createElement("p", { id: "courses" },
                                createElement("select", { id: "mountedCoure", filter: true },
                                    createElement("option", { value: "" }, "Please Select Course"),
                                    this._vm.courses.map((x) => (createElement("option", { value: x.mountedCourseId },
                                        x.courseCode,
                                        ": ",
                                        x.courseName)))))),
                        createElement("div", { class: "sp-btn-container" },
                            createElement("p", { class: "sp-row-col-1" },
                                createElement("div", { class: "sp-btn-row", style: "float: right;" },
                                    createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "small-dec", style: "position: relative;" },
                                        createElement("label", { class: "btn-file" }, "Upload"),
                                        createElement("input", { type: "file", class: "file", accept: ".csv", id: "file", onChange: (evt) => {
                                                evt.preventDefault();
                                                this._vm.uploadResult(evt);
                                                //showTableData()
                                            } })),
                                    createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "small-dec", onClick: () => {
                                            new UploadResultModal(this._vm).render("route-outlet");
                                        } }, "Summary"),
                                    createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "small-dec", onClick: () => __awaiter(this, void 0, void 0, function* () {
                                            const elements = document.getElementsByTagName("select");
                                            const academicYear = elements[0];
                                            const mountedCourseId = elements[3];
                                            const enrollmentOption = elements[1];
                                            const semester = elements[2];
                                            yield this._vm.download_csv(academicYear.value, enrollmentOption.value, semester.value, mountedCourseId.value);
                                        }) }, "Download"),
                                    createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "small-dec", style: "margin-right: 0px;", onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                            evt.preventDefault();
                                            yield this._vm.save();
                                        }) }, "Submit")))),
                        createElement("div", { class: "uploadresults-tb-container" },
                            createElement("div", { class: "horizontal" },
                                createElement("table", { class: "table stretch", id: "resultsPDF" },
                                    createElement("thead", null,
                                        createElement("tr", null, headers.map((headerItem) => (createElement("th", null, headerItem))))),
                                    createElement("tbody", { id: "StudentResults" }))))))));
            var doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
            let getCourses = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                const elements = document.querySelectorAll("[filter]");
                const academicYear = elements[0];
                const enrollmentOption = elements[1];
                const semester = elements[2];
                if (enrollmentOption && academicYear && semester) {
                    this._vm.academicYear = academicYear.value;
                    this._vm.semester = semester.value;
                    yield this._vm.getMountedCourses(academicYear.value, semester.value, enrollmentOption.value);
                }
            });
            const elements = document.querySelectorAll("[filter]");
            elements.forEach(function (element) {
                element.onchange = getCourses;
            });
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            this._vm.updateCourseCommand.add(() => {
                var doc = document.getElementById("courses");
                doc.textContent = "";
                let select = (createElement("select", { onChange: (evt) => {
                        evt.preventDefault();
                        this._vm.getProgram(evt.target.value);
                    } },
                    createElement("option", { value: "" }, "Please Select Course"),
                    this._vm.courses.map((x) => (createElement("option", { value: x.mountedCourseId },
                        x.courseCode,
                        ": ",
                        x.courseName)))));
                doc.appendChild(select);
            });
            yield this._vm.getGradeSettings();
            yield this._vm.getStudentsEnteryLevel();
        });
    }
}
export class ResultRow {
    render(studentResults) {
        var doc = document.getElementById("StudentResults");
        doc.textContent = "";
        let i = 0;
        for (const r of studentResults) {
            if (!r.Isvalid) {
                let row = (createElement("tr", null,
                    createElement("td", null, ++i),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.IndexNumber),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.Name),
                    createElement("td", null, r.Level),
                    createElement("td", null, r.CourseCode),
                    createElement("td", null, r.ClassScore),
                    createElement("td", null, r.ExamsScore),
                    createElement("td", null, r.TotalScore),
                    createElement("td", null, r.Grade)));
                doc.appendChild(row);
            }
            else if (r.ExamsScore > 60 && r.ClassScore > 40) {
                let row = (createElement("tr", null,
                    createElement("td", null, ++i),
                    createElement("td", null, r.IndexNumber),
                    createElement("td", null, r.Name),
                    createElement("td", null, r.Level),
                    createElement("td", null, r.CourseCode),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.ClassScore),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.ExamsScore),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.TotalScore),
                    createElement("td", null, r.Grade)));
                doc.appendChild(row);
            }
            else if (r.ExamsScore > 60) {
                let row = (createElement("tr", null,
                    createElement("td", null, ++i),
                    createElement("td", null, r.IndexNumber),
                    createElement("td", null, r.Name),
                    createElement("td", null, r.Level),
                    createElement("td", null, r.CourseCode),
                    createElement("td", null, r.ClassScore),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.ExamsScore),
                    createElement("td", null, r.TotalScore),
                    createElement("td", null, r.Grade)));
                doc.appendChild(row);
            }
            else if (r.ClassScore > 40) {
                let row = (createElement("tr", null,
                    createElement("td", null, ++i),
                    createElement("td", null, r.IndexNumber),
                    createElement("td", null, r.Name),
                    createElement("td", null, r.Level),
                    createElement("td", null, r.CourseCode),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.ClassScore),
                    createElement("td", null, r.ExamsScore),
                    createElement("td", null, r.TotalScore),
                    createElement("td", null, r.Grade)));
                doc.appendChild(row);
            }
            else {
                let row = (createElement("tr", null,
                    createElement("td", null, ++i),
                    createElement("td", null, r.IndexNumber),
                    createElement("td", null, r.Name),
                    createElement("td", null, r.Level),
                    createElement("td", null, r.CourseCode),
                    createElement("td", null, r.ClassScore),
                    createElement("td", null, r.ExamsScore),
                    createElement("td", null, r.TotalScore),
                    createElement("td", null, r.Grade)));
                doc.appendChild(row);
            }
        }
    }
}
export class Courses {
    render(courses) {
        var doc = document.getElementById("courses");
        doc.textContent = "";
        let select = (createElement("select", null,
            createElement("option", { value: "" }, "Please Select Course"),
            courses.map((x) => (createElement("option", { value: x.mountedCourseId },
                x.courseCode,
                ": ",
                x.courseName)))));
        doc.appendChild(select);
    }
}
//# sourceMappingURL=uploadResultView.js.map