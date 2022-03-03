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
export class ResultsAmmendmentModal {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    render(elementId) {
        const temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
            createElement("div", { class: "modal-content" },
                createElement("div", { class: "sp-box", style: "margin-top:90px;" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, "Result Ammendment"),
                        createElement("form", { class: "mountcourses-form" },
                            createElement("div", { class: "academyear" },
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Commission Date:12/12/2022")),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Semester:1"))),
                            createElement("div", { class: "department" },
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Department:Computer Science and Infomatics")),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Index Number:UE20004312"))),
                            createElement("div", { class: "coursecode" },
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Course Code:Comp404")),
                                createElement("p", { id: "gradeModalTextEdit" },
                                    createElement("label", null, "Course Title:Programming for Novics"))),
                            createElement("h4", null, "Previous Mark"),
                            createElement("div", null,
                                createElement("table", { class: "table css-serial", id: "courseView" },
                                    createElement("thead", null,
                                        createElement("tr", null,
                                            createElement("th", null, "CA"),
                                            createElement("th", null, "Final Exam"),
                                            createElement("th", null, "Total"))),
                                    createElement("tbody", { id: "courses", "data-repeat": "courses" }, createElement("tr", null,
                                        createElement("td", null, 45),
                                        createElement("td", null, 56),
                                        createElement("td", null, 67))
                                    // this._vm.result.map(x => <tr>
                                    //     <td>{x.CA}</td>
                                    //     <td>{x.Exam}</td>
                                    //     <td>{x.Total}</td>
                                    // </tr>)
                                    ))),
                            createElement("h4", null, "New Mark"),
                            createElement("div", null,
                                createElement("table", { class: "table css-serial", id: "courseView" },
                                    createElement("thead", null,
                                        createElement("tr", null,
                                            createElement("th", null, "CA"),
                                            createElement("th", null, "Final Exam"),
                                            createElement("th", null, "Total"))),
                                    createElement("tbody", { id: "courses", "data-repeat": "courses" }, createElement("tr", null,
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null))))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-primary", id: "save", onClick: (evt) => {
                                        evt.preventDefault();
                                        const elements = document.querySelectorAll("[filter]");
                                        const cDate = elements[0].value;
                                        const type = elements[1].value;
                                        const uLimit = elements[2].value;
                                        const lLimit = elements[3].value;
                                        const grade = elements[4].value;
                                        const gradePoint = elements[5].value;
                                        const remarks = elements[6].value;
                                        this._vm.save(cDate, type, uLimit, lLimit, grade, gradePoint, remarks);
                                    } }, "Update"),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        document.getElementById("close").onclick = hideModal;
    }
}
//# sourceMappingURL=resultAmmendmentModal.js.map