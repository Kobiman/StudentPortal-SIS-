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
import { ApproveRegistrationModal } from "./approveRegistrationModal";
import { ApproveRegistrationTableRow } from "./ApproveRegistrationTableRow";
import { UnRegisteredMountedTableRow, UnRegisteredTrailTableRow } from "./UnRegisteredTableRow";
export class RegisteredCourseRow {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("results");
        doc.textContent = "";
        for (let r of this._vm.temporalRegistrationList) {
            var checkbox = (createElement("input", { id: "checkme", type: "checkbox", name: "checkbox", disabled: "true" }));
            if (r.status.value) {
                checkbox = (createElement("input", { id: "checkme", type: "checkbox", name: "checkbox", checked: "checked", disabled: "true" }));
            }
            if (!r.status.value) {
                let tr = (createElement("tr", null,
                    createElement("td", { style: "color:red;font-weight:bold" }, r.indexNumber),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.level),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.totalCourses),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.totalCredit),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.pendingTrails),
                    createElement("td", { style: "color:red;font-weight:bold" },
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true }, "View")),
                    createElement("td", { style: "color:red;font-weight:bold" },
                        createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                            checkbox,
                            createElement("span", { class: "checkmark" })))));
                doc.appendChild(tr);
            }
            else if (r.status.value) {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.indexNumber),
                    createElement("td", null, r.level),
                    createElement("td", null, r.totalCourses),
                    createElement("td", null, r.totalCredit),
                    createElement("td", null, r.pendingTrails),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true }, "View")),
                    createElement("td", null,
                        createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                            checkbox,
                            createElement("span", { class: "checkmark" })))));
                doc.appendChild(tr);
            }
            else if (r.totalCredit > this._vm.maximunCredit) {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.indexNumber),
                    createElement("td", null, r.level),
                    createElement("td", null, r.totalCourses),
                    createElement("td", { style: "color:red;font-weight:bold" }, r.totalCredit),
                    createElement("td", null, r.pendingTrails),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true }, "View")),
                    createElement("td", null,
                        createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                            checkbox,
                            createElement("span", { class: "checkmark" })))));
                doc.appendChild(tr);
            }
            else {
                let tr = (createElement("tr", null,
                    createElement("td", null, r.indexNumber),
                    createElement("td", null, r.level),
                    createElement("td", null, r.totalCourses),
                    createElement("td", null, r.totalCredit),
                    createElement("td", null, r.pendingTrails),
                    createElement("td", null,
                        createElement("button", { class: "sp-btn sp-btn-default btn-small", button: true }, "View")),
                    createElement("td", null,
                        createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                            checkbox,
                            createElement("span", { class: "checkmark" })))));
                doc.appendChild(tr);
            }
            let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
                evt.preventDefault();
                let row = evt.target.parentElement.parentElement;
                const indexNumber = row.cells[0].innerText;
                this._vm.indexNumber = indexNumber;
                this._vm.level = row.cells[1].innerText;
                new ApproveRegistrationModal(this._vm, indexNumber).render("route-outlet");
                this._vm.getAcademicYear();
                yield this._vm.getMountedCourses();
                // await this._vm.getTrailList();
                const registeredCourses = this._vm.getRegisteredCourses(indexNumber);
                new ApproveRegistrationTableRow(this._vm).render(registeredCourses, indexNumber);
                new UnRegisteredMountedTableRow(this._vm, indexNumber).render(registeredCourses);
                new UnRegisteredTrailTableRow(this._vm, indexNumber).render(registeredCourses);
            });
            const elements = document.querySelectorAll("[button]");
            elements.forEach(function (element) {
                element.onclick = showModal;
            });
        }
    }
}
//# sourceMappingURL=RegisteredCourseRow.js.map