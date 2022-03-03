import { createElement } from "tsx-create-element";
export class StudentDetails {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        function openTab(evt, header) {
            var i, content, tabClick;
            content = document.getElementsByClassName("content");
            for (i = 0; i < content.length; i++) {
                content[i].style.display = "none";
            }
            tabClick = document.getElementsByClassName("tabClick");
            for (i = 0; i < tabClick.length; i++) {
                tabClick[i].className = tabClick[i].className.replace(" active", "");
            }
            document.getElementById(header).style.display = "block";
            evt.currentTarget.className += " active";
        }
        return createElement("div", { class: "edit-content" },
            createElement("div", { class: "profile-form" },
                createElement("div", { class: "sp-row-col-2-2-1" },
                    createElement("div", { class: "user-info" },
                        createElement("img", { id: "uploaded-img", src: "../assets/avatar.png", alt: "" }),
                        createElement("input", { id: "imgUpload", class: "img-upload", type: "file", name: "Edit" }),
                        createElement("div", { class: "studentList-profile-info" },
                            createElement("div", { class: "upload-img" },
                                createElement("span", null, this._vm.student.studentName)),
                            createElement("h3", { class: "info-headers" }, "Student Details:"),
                            createElement("label", null,
                                "Student ID:",
                                createElement("span", null, this._vm.student.indexNumber)),
                            createElement("label", null,
                                "Reference Number:",
                                createElement("span", null,
                                    "  ",
                                    this._vm.student.referenceNumber)),
                            createElement("label", null,
                                "   DOB (yyyy/mm/dd):",
                                createElement("span", null, this._vm.student.dateOfBirth)),
                            createElement("label", null,
                                "Gender:",
                                createElement("span", null, this._vm.student.gender === "M" ? "Male" : "Female")),
                            createElement("label", null,
                                "Contact:",
                                createElement("span", null, this._vm.student.contact1)),
                            createElement("label", null,
                                "Program:",
                                createElement("span", null, this._vm.student.program)),
                            createElement("label", null,
                                "Level:",
                                createElement("span", null, this._vm.student.level)))),
                    createElement("div", { clas: "profile-fields" },
                        createElement("div", { class: "tab" },
                            createElement("button", { class: "tabClick", onClick: (evt) => {
                                    openTab(evt, 'personal');
                                } }, "Personal Details"),
                            createElement("button", { class: "tabClick", onClick: (evt) => {
                                    openTab(evt, 'academic');
                                } }, " Academic Details"),
                            createElement("button", { class: "tabClick", onClick: (evt) => {
                                    openTab(evt, 'guardian');
                                } }, " Guardian Details"),
                            createElement("button", { style: "width:12%;", onclick: () => {
                                    document.getElementById("btnEdit").style.visibility = "visible";
                                    let input = document.querySelectorAll("[input]");
                                    input.forEach(function (item) {
                                        item.toggleAttribute("disabled");
                                    });
                                    this._vm.update();
                                } },
                                createElement("i", { class: "fas fa-save" }),
                                "Save"),
                            createElement("button", { id: "btnEdit", value: "yes", style: "visibility:hidden; width:12%;", onclick: () => {
                                    let input = document.querySelectorAll("[input]");
                                    input.forEach(function (item) {
                                        item.toggleAttribute("disabled");
                                    });
                                } },
                                createElement("i", { class: "fas fa-edit" }),
                                "Edit")),
                        createElement("div", { class: "content active", id: "personal" },
                            createElement("form", { class: "student-edit-details" },
                                createElement("div", { class: "left-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "Surname"),
                                        createElement("input", { id: "surname", type: "text", class: "edit-text-field", value: this._vm.student.surname, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Contact 1"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "referenceNumber", value: this._vm.student.contact1, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Marital Status"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: this._vm.student.maritalStatus, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Country"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "department", value: this._vm.student.country, input: true }))),
                                createElement("div", { class: "middle-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "Other Names"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "contact1", value: this._vm.student.othernames, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Contact 2"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "contact2", value: this._vm.student.contact2, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Personal Email"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "personalEmail", value: this._vm.student.personalEmail, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Gender"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "maritalStatus", value: this._vm.student.gender === "M" ? "Male" : "Female", input: true }))),
                                createElement("div", { class: "right-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "DOB (yyyy/mm/dd)"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "school", value: this._vm.student.dateofBirth, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Region"),
                                        createElement("input", { type: "text", class: "edit-text-field editTable", id: "country", value: this._vm.student.region, input: true }))))),
                        createElement("div", { class: "content", id: "academic" },
                            createElement("form", { class: "student-edit-details" },
                                createElement("div", { class: "left-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "Index Number"),
                                        createElement("input", { id: "indexNumber", type: "text", class: "edit-text-field", disabled: true, value: this._vm.student.indexNumber, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Reference Number"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "referenceNumber", disabled: true, value: this._vm.student.referenceNumber, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Program"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: this._vm.student.program, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Department"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "department", value: this._vm.student.department, input: true }))),
                                createElement("div", { class: "middle-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "University Email"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "universityEmail", value: this._vm.student.universityEmail, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Level"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "level", value: this._vm.student.level, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Enrollment Option"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "enrollmentOption", value: this._vm.student.enrollmentOption, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Enrollment Date"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "enrollmentDate", disabled: true, value: this._vm.student.dateOfEntry, input: true }))),
                                createElement("div", { class: "right-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "School"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "school", disabled: true, value: this._vm.student.school, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Program Status"),
                                        createElement("select", { class: "edit-text-field", id: "progStatus", style: "height:37px; width: 101%;", filter: true },
                                            createElement("option", { value: "" }, "Program Status"),
                                            this._vm.progStatus.map((x) => (createElement("option", { value: x }, x))),
                                            " "))))),
                        createElement("div", { class: "content", id: "guardian" },
                            createElement("form", { class: "student-edit-details" },
                                createElement("div", { class: "left-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "Surname"),
                                        createElement("input", { id: "indexNumber", type: "text", class: "edit-text-field", value: `Tendani`, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Other Names"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "referenceNumber", value: `Aborapia`, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Contact"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "program", value: `0000000000`, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Email"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "department", value: `toomuchmoney@gmail.com`, input: true }))),
                                createElement("div", { class: "middle-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "Address"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "universityEmail", value: `TMA 051`, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Hometown"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "level", value: `Techiman`, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Region"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "enrollmentOption", value: `Bono east`, input: true })),
                                    createElement("p", null,
                                        createElement("label", null, "Country"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "enrollmentDate", value: `Ghana`, input: true }))),
                                createElement("div", { class: "right-profile-edit" },
                                    createElement("p", null,
                                        createElement("label", null, "Relation"),
                                        createElement("input", { type: "text", class: "edit-text-field", id: "school", value: `Father`, input: true })))))))));
    }
}
//# sourceMappingURL=studentDetails.js.map