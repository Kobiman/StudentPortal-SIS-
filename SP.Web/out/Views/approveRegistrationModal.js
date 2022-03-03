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
export class ApproveRegistrationModal {
    constructor(_vm, indexNumber) {
        this._vm = _vm;
        this.indexNumber = indexNumber;
    }
    render(elementId) {
        const temp = (createElement("div", { class: "mountcourse-model", id: "modal" },
            createElement("div", { class: "modal-content" },
                createElement("div", { class: "sp-box" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, "Registered Courses"),
                        createElement("div", { class: "mountcourses-form" },
                            createElement("div", { class: "horizontal" },
                                createElement("table", { class: "table striped" },
                                    createElement("thead", { class: "table" },
                                        createElement("th", null, "Course Code"),
                                        createElement("th", null, "Course Title"),
                                        createElement("th", null, "Credit"),
                                        createElement("th", null, "Option"),
                                        createElement("th", null, "Remove")),
                                    createElement("tbody", { id: "approveRegistrationRow", "data-repeat": "results" }))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "reject" }, "Reject"),
                                createElement("button", { class: "sp-btn sp-btn-primary", id: "accept" },
                                    "Accept ",
                                    createElement("i", { class: "fa fa-save" }))),
                            createElement("div", { class: "mc-table" },
                                createElement("table", { class: "table" },
                                    createElement("tbody", { id: "unregisteredCourses" })))))))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        let accept = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            this._vm.aproveRegistration(this.indexNumber);
            doc.removeChild(temp);
        });
        let rejectRegistration = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        document.getElementById("close").onclick = hideModal;
        document.getElementById("accept").onclick = accept;
        document.getElementById("reject").onclick = rejectRegistration;
    }
}
export class ApproveRegistrationTableRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    render(registerdCourses, indexNumber) {
        const doc = document.getElementById("approveRegistrationRow");
        doc.textContent = "";
        for (let r of registerdCourses) {
            let tr = (createElement("tr", null,
                createElement("td", null, r.courseCode),
                createElement("td", null, r.courseTitle),
                createElement("td", null, r.credit),
                createElement("td", null, r.option),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => {
                            evt.preventDefault();
                            ;
                            this._vm.removeCourse(r.courseCode, indexNumber);
                            let row = evt.target.parentElement.parentElement;
                            const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                            new UnRegisteredTableRow(this._vm, indexNumber).render(registeredCourses);
                            row.remove();
                        } }, "Del"))));
            doc.appendChild(tr);
        }
    }
}
export class UnRegisteredTableRow {
    constructor(_vm, indexNumber) {
        this._vm = _vm;
        this.indexNumber = indexNumber;
    }
    render(registerdCourses) {
        ;
        const doc = document.getElementById("unregisteredCourses");
        doc.textContent = "";
        for (let r of this._vm.mountedCourses) {
            const mountedCourse = registerdCourses.find(x => x.courseCode === r.courseCode);
            if (!mountedCourse) {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.courseCode),
                    createElement("td", null, r.courseTitle),
                    createElement("td", null, r.credit),
                    createElement("td", null, r.option),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => {
                                evt.preventDefault();
                                let row = evt.target.parentElement.parentElement;
                                ;
                                this._vm.addCourse(r.courseCode, this.indexNumber);
                                row.remove();
                                const registeredCourses = this._vm.getRegisteredCourses(this.indexNumber);
                                new ApproveRegistrationTableRow(this._vm).render(registeredCourses, this.indexNumber);
                            } }, "Add"))));
                doc.appendChild(tr);
            }
        }
    }
}
//# sourceMappingURL=approveRegistrationModal.js.map