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
import { BallLoader } from "../../loader/ballLoader";
export class transcriptGenerationView {
    constructor(_vm) {
        this._vm = _vm;
        this.render = (elementId) => {
            let temp = (createElement("div", { class: "sp-box" },
                createElement("div", { class: "mc-row" },
                    createElement("h1", null, "Transcript and statement of result generation"),
                    createElement("div", { class: "mountcourses-form", id: "transcript-container" },
                        createElement("div", { class: "sp-row-trans", id: "sp-m" },
                            createElement("input", { type: "text", name: "answer", required: "true", placeholder: "search by INDEX NUMBER.", autofocus: true, id: "searchfild" }),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-default", onClick: () => __awaiter(this, void 0, void 0, function* () {
                                        BallLoader.show();
                                        debugger;
                                        const searchField = document.getElementById("searchfild");
                                        const indexNumber = searchField.value;
                                        yield this._vm.getStudentResults(indexNumber);
                                        BallLoader.hide();
                                        var doc = document.getElementById("studentListTable");
                                        doc.textContent = "";
                                        // for(const dr of this._vm.student){
                                        let row = (createElement("tr", null,
                                            createElement("td", null, this._vm.student.indexNmber),
                                            createElement("td", null, this._vm.student.name),
                                            createElement("td", null, this._vm.student.gender == "M" ? "Male" : "Female"),
                                            createElement("td", null, this._vm.student.universityEmail),
                                            createElement("td", null, this._vm.student.personalEmail),
                                            createElement("td", null, this._vm.student.dateOfBirth.substring(0, 10)),
                                            createElement("td", null,
                                                createElement("button", { id: "", class: "sp-btn sp-btn-stOfResult ", onClick: (evt) => {
                                                        evt.preventDefault();
                                                        this._vm.generateTranscript();
                                                    } },
                                                    createElement("i", { class: "fa fa-download" }),
                                                    "Gen.tans"),
                                                createElement("button", { id: "", class: "sp-btn sp-btn-stOfResult ", onClick: (evt) => {
                                                        evt.preventDefault();
                                                        this._vm.generateTranscript();
                                                    } },
                                                    createElement("i", { class: "fa fa-download" }),
                                                    "St.Result"))));
                                        doc.appendChild(row);
                                        // }
                                        let th = document.getElementsByTagName("th");
                                        for (let i = 0; i < th.length; i++) {
                                            th[i].addEventListener("click", function () { });
                                        }
                                    }), id: "submit" }, "Submit")))),
                    createElement("div", { class: "sp-form-col1" },
                        createElement("div", { class: "horizontal" },
                            createElement("table", { class: "table striped" },
                                createElement("thead", { class: "table" },
                                    createElement("th", null, "IndexNumber"),
                                    createElement("th", null, "FullName"),
                                    createElement("th", null, "Gender"),
                                    createElement("th", null, "University Email"),
                                    createElement("th", null, "Personal Email"),
                                    createElement("th", null, "DOB(yyyy/mm/dd)"),
                                    createElement("th", null, " Action")),
                                createElement("tbody", { "data-repeat": "studentList", id: "studentListTable" })))))));
            const doc = document.getElementById(elementId);
            doc.textContent = "";
            doc.appendChild(temp);
        };
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=transcriptGenerationView.js.map