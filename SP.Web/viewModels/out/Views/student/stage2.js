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
import { App } from "../../app";
export class Stage2 {
    constructor(addStudentVm) {
        this.render = (elementId) => {
            var temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "sp-row" },
                    createElement("h1", null, "Contact Details"),
                    createElement("form", { class: "sp-form" },
                        createElement("div", { class: "left" },
                            createElement("p", null,
                                createElement("label", null, "Country"),
                                createElement("input", { type: "text", binding: "Student.Country", value: this._vm.student.Country }),
                                createElement("div", { errors: "Country" })),
                            createElement("p", null,
                                createElement("label", null, "Region"),
                                createElement("input", { type: "text", binding: "Student.Region", value: this._vm.student.Region }),
                                createElement("div", { errors: "Region" })),
                            createElement("p", null,
                                createElement("label", null, "HomeTown"),
                                createElement("input", { type: "text", binding: "Student.HomeTown", value: this._vm.student.HomeTown }),
                                createElement("div", { errors: "HomeTown" })),
                            createElement("p", null,
                                createElement("label", null, "Address1"),
                                createElement("input", { type: "text", binding: "Student.Address1", value: this._vm.student.Address1 })),
                            createElement("p", null,
                                createElement("label", null, "Address2"),
                                createElement("input", { type: "text", binding: "Student.StudentAddress2", value: this._vm.student.Address2 }),
                                createElement("div", { errors: "Address2" }))),
                        createElement("div", { class: "right" },
                            createElement("p", null,
                                createElement("label", null, "Contact1"),
                                createElement("input", { type: "text", binding: "Student.Contact1", value: this._vm.student.Contact1 }),
                                createElement("div", { errors: "Contact1" })),
                            createElement("p", null,
                                createElement("label", null, "Contact2"),
                                createElement("input", { type: "text", binding: "Student.Contact2", value: this._vm.student.Contact2 }),
                                createElement("div", { errors: "Contact2" })),
                            createElement("p", null,
                                createElement("label", null, "PersonalEmail"),
                                createElement("input", { type: "text", binding: "Student.PersonalEmail", value: this._vm.student.PersonalEmail }),
                                createElement("div", { errors: "PersonalEmail" })),
                            createElement("p", null,
                                createElement("label", null, "University Email"),
                                createElement("input", { type: "text", binding: "Student.UniversityEmail", value: this._vm.student.UniversityEmail }),
                                createElement("div", { errors: "UniversityEmail" })),
                            createElement("p", null,
                                createElement("label", null, "Residential Status"),
                                createElement("input", { type: "text", binding: "Student.ResidentialStatus", value: this._vm.student.ResidentialStatus }),
                                createElement("div", { errors: "ResidentialStatus" }))),
                        createElement("div", { class: "sp-btn-row" }),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { id: "Back", class: "sp-btn sp-btn-default", click: "/app/#addStudent/stage1" },
                                createElement("i", { class: "fa fa-chevron-circle-left" }),
                                " Back"),
                            createElement("button", { id: "Next", class: "sp-btn sp-btn-primary", click: "/app/#addStudent/stage3" },
                                "Next ",
                                createElement("i", { class: "fa fa-chevron-circle-right" })))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
            this._vm.bindData();
            let onNextButtonClicked = (evt) => {
                evt.preventDefault();
                var route = next.getAttribute("click");
                this._vm.validate(route, this._vm.stage2_rules());
            };
            const next = document.getElementById("Next");
            next.onclick = onNextButtonClicked;
            let onBackButtonClicked = (evt) => {
                evt.preventDefault();
                var route = back.getAttribute("click");
                App.navigate(route);
            };
            const back = document.getElementById("Back");
            back.onclick = onBackButtonClicked;
            //new ViewModelHelper().addEventListener(this,'click');
        };
        this._vm = addStudentVm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=stage2.js.map