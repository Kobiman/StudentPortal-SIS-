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
import { ApproveRegistrationModal, ApproveRegistrationTableRow, UnRegisteredTableRow } from "./approveRegistrationModal";
export class ApproveRegistrationView {
    constructor(_vm) {
        this._vm = _vm;
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Approve Registration "),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-row-col-2-5" },
                        createElement("select", { id: "programs", binding: "SelectedCourse.program", value: this._vm.mountedCourse.program },
                            createElement("option", { value: "" }, "Programs"),
                            this._vm.getPrograms().map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "level", binding: "Object.level" },
                            createElement("option", { value: "" }, "Please Select Level"),
                            this._vm.levels.map((x) => (createElement("option", { value: x.name }, x.name))),
                            " "),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default ", id: "tryMe" }, "Approve All"))),
                    createElement("div", { class: "horizontal" },
                        createElement("table", { id: "approveTable", class: "table striped" },
                            createElement("thead", { class: "table" },
                                createElement("th", null, "Index Number"),
                                createElement("th", null, "Level"),
                                createElement("th", null, "Total Courses "),
                                createElement("th", null, "Total Credit"),
                                createElement("th", null, "Pending Trails"),
                                createElement("th", null, "View Registration"),
                                createElement("th", null, "Approval Status")),
                            createElement("tbody", { id: "results", "data-repeat": "temporalRegistrationList" })))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        this._vm.getStudentRegistration();
        this.addClickEvent();
        let programsChanged = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const innerTable = document.getElementById("results");
            innerTable.textContent = "";
            innerTable.appendChild(createElement("tr", null,
                createElement("td", { binding: "indexNumber" }),
                createElement("td", { binding: "level" }),
                createElement("td", { binding: "totalCourses" }),
                createElement("td", { binding: "totalCredit" }),
                createElement("td", { binding: "pendingTrails" }),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true }, "View")),
                createElement("td", { binding: "status" })));
            const value = evt.target.value;
            this._vm.buidQuery("program", value);
            this.addClickEvent();
        });
        let levelChanged = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const innerTable = document.getElementById("results");
            innerTable.textContent = "";
            innerTable.appendChild(createElement("tr", null,
                createElement("td", { binding: "indexNumber" }),
                createElement("td", { binding: "level" }),
                createElement("td", { binding: "totalCourses" }),
                createElement("td", { binding: "totalCredit" }),
                createElement("td", { binding: "pendingTrails" }),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true }, "View")),
                createElement("td", { binding: "status" })));
            const value = evt.target.value;
            this._vm.buidQuery("level", value);
            this.addClickEvent();
        });
        document.getElementById("programs").onchange = programsChanged;
        document.getElementById("level").onchange = levelChanged;
    }
    addClickEvent() {
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            let row = evt.target.parentElement.parentElement;
            const indexNumber = row.cells[0].innerText;
            new ApproveRegistrationModal(this._vm, indexNumber).render("route-outlet");
            const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
            new ApproveRegistrationTableRow(this._vm).render(registeredCourses, indexNumber);
            new UnRegisteredTableRow(this._vm, indexNumber).render(registeredCourses);
        });
        const elements = document.querySelectorAll("[button]");
        elements.forEach(function (element) {
            element.onclick = showModal;
        });
    }
}
export class RegisteredCourseRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("results");
        doc.textContent = "";
        for (let r of this._vm.temporalRegistrationList) {
            let tr = (createElement("tr", null,
                createElement("td", null, r.indexNumber),
                createElement("td", null, r.level),
                createElement("td", null, r.totalCourses),
                createElement("td", null, r.totalCredit),
                createElement("td", null, r.pendingTrails),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true }, "View")),
                createElement("td", null, r.status)));
            doc.appendChild(tr);
            let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target.parentElement.parentElement;
                const indexNumber = row.cells[0].innerText;
                new ApproveRegistrationModal(this._vm, indexNumber).render("route-outlet");
                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                new ApproveRegistrationTableRow(this._vm).render(registeredCourses, indexNumber);
                new UnRegisteredTableRow(this._vm, indexNumber).render(registeredCourses);
            });
            const elements = document.querySelectorAll("[button]");
            elements.forEach(function (element) {
                element.onclick = showModal;
            });
        }
    }
}
//# sourceMappingURL=approveRegistrationView.js.map