import { createElement } from "tsx-create-element";
import { ApproveRegistrationTableRow } from "./ApproveRegistrationTableRow";
export class UnRegisteredMountedTableRow {
    constructor(_vm, indexNumber) {
        this._vm = _vm;
        this.indexNumber = indexNumber;
    }
    render(registered) {
        const doc = document.getElementById("unregisteredMountedCourses");
        doc.textContent = "";
        for (let r of this._vm.mountedCourses) {
            const mountedCourse = registered.find(x => x.courseCode === r.courseCode);
            if (!mountedCourse) {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.courseCode),
                    createElement("td", null, r.courseName),
                    createElement("td", null, r.credit),
                    createElement("td", null, r.category),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => {
                                evt.preventDefault();
                                let row = evt.target.parentElement.parentElement;
                                this._vm.addMountedCourse(r.courseCode, this.indexNumber);
                                row.remove();
                                const registeredCourses = this._vm.getRegisteredCourses(this.indexNumber);
                                new ApproveRegistrationTableRow(this._vm).render(registeredCourses, this.indexNumber);
                            } }, "Add"))));
                doc.appendChild(tr);
            }
        }
    }
}
export class UnRegisteredTrailTableRow {
    constructor(_vm, indexNumber) {
        this._vm = _vm;
        this.indexNumber = indexNumber;
    }
    render(registered) {
        const doc = document.getElementById("unregisteredTrailCourses");
        doc.textContent = "";
        for (let r of this._vm.temporalRegistrationList.find(x => x.indexNumber === this.indexNumber).trailCourses) {
            const trailCourse = registered.find(x => x.courseCode === r.courseCode);
            if (!trailCourse) {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.courseCode),
                    createElement("td", null, r.courseName),
                    createElement("td", null, r.credit),
                    createElement("td", null, r.category),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => {
                                evt.preventDefault();
                                let row = evt.target.parentElement.parentElement;
                                this._vm.addTrailCourse(r.courseCode, this.indexNumber);
                                row.remove();
                                const registeredCourses = this._vm.getRegisteredCourses(this.indexNumber);
                                new ApproveRegistrationTableRow(this._vm).render(registeredCourses, this.indexNumber);
                            } }, "Add"))));
                doc.appendChild(tr);
            }
        }
    }
}
//# sourceMappingURL=UnRegisteredTableRow.js.map