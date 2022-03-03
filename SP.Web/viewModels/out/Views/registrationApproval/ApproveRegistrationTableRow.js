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
import { UnRegisteredMountedTableRow, UnRegisteredTrailTableRow } from "./UnRegisteredTableRow";
export class ApproveRegistrationTableRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    render(registerdCourses, indexNumber) {
        const doc = document.getElementById("approveRegistrationRow");
        doc.textContent = "";
        for (let r of registerdCourses) {
            if (r.category.toUpperCase() === "CORE") {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.courseCode),
                    createElement("td", null, r.courseName),
                    createElement("td", null, r.credit),
                    createElement("td", null, r.category),
                    createElement("td", null),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                evt.preventDefault();
                                this._vm.removeCourse(r.courseCode, indexNumber);
                                let row = evt.target.parentElement.parentElement;
                                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                                new UnRegisteredTrailTableRow(this._vm, indexNumber).render(registeredCourses);
                                row.remove();
                            }) }, "Defer"))));
                doc.appendChild(tr);
            }
            else if (r.category.toUpperCase() === "ELECTIVE") {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.courseCode),
                    createElement("td", null, r.courseName),
                    createElement("td", null, r.credit),
                    createElement("td", null, r.category),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                evt.preventDefault();
                                this._vm.removeCourse(r.courseCode, indexNumber);
                                let row = evt.target.parentElement.parentElement;
                                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                                new UnRegisteredTrailTableRow(this._vm, indexNumber).render(registeredCourses);
                                row.remove();
                            }) }, "Remove")),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                evt.preventDefault();
                                this._vm.removeCourse(r.courseCode, indexNumber);
                                let row = evt.target.parentElement.parentElement;
                                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                                new UnRegisteredTrailTableRow(this._vm, indexNumber).render(registeredCourses);
                                row.remove();
                            }) }, "Defer"))));
                doc.appendChild(tr);
            }
            else {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.courseCode),
                    createElement("td", null, r.courseName),
                    createElement("td", null, r.credit),
                    createElement("td", null, r.category),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true, onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                evt.preventDefault();
                                this._vm.removeCourse(r.courseCode, indexNumber);
                                let row = evt.target.parentElement.parentElement;
                                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                                new UnRegisteredTrailTableRow(this._vm, indexNumber).render(registeredCourses);
                                row.remove();
                            }) }, "Remove")),
                    createElement("td", null)));
                doc.appendChild(tr);
            }
        }
    }
}
//# sourceMappingURL=ApproveRegistrationTableRow.js.map