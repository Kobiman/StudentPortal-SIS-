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
import { LecturerModal } from "./lecturerModal";
import { _ } from "../group";
export class LecturerView {
    constructor(_vm) {
        this._vm = _vm;
        this._vm.lecturerChangedCommand.add(() => {
            let tr = document.getElementById("lecturers");
            tr.textContent = "";
            for (var x of this._vm.results) {
                tr.appendChild(createElement("tr", { id: x.departmentId },
                    createElement("td", null),
                    createElement("td", { binding: "name" }, x.name),
                    createElement("td", { binding: "staffId" }, x.staffId),
                    createElement("td", { binding: "department" }, x.departments),
                    createElement("td", { binding: "telephone" }, x.telephone),
                    createElement("td", { binding: "email" }, x.email),
                    createElement("td", { binding: "address", width: "8%" }, x.address)));
            }
        });
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getLecturers();
            yield this._vm.getDepartments();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Lecturers"),
                createElement("div", { class: "sp-btn-row" },
                    createElement("button", { class: "sp-btn sp-btn-default", id: "addLecturer" }, "Add")),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-row-col-4-4-4" },
                        createElement("div", null,
                            createElement("select", { value: this._vm.departments, id: "department", binding: "Object.lecturers", style: "border: 1.4px solid #59b379; border-radius: 4px;box-shadow: none" }, this._vm.departments.map((x) => (createElement("option", { value: x.departmentId }, x.name))))),
                        createElement("div", null,
                            createElement("input", { type: "text", name: "answer", placeholder: "SEARCH BY STAFF NAME", style: "border-radius: 4px", autofocus: true, onkeyup: () => {
                                    tableSearch();
                                }, id: "searchByName" })),
                        createElement("button", { class: " sp-btn-default", style: "float:right;border-radius: 4px", id: "lectExcelButton", onClick: () => {
                                this._vm.download_csv();
                            } },
                            createElement("i", { class: "fas fa-arrow-circle-down", style: "margin-right: 5%;" }, " "),
                            "Excel"))),
                createElement("div", null,
                    createElement("table", { class: "table-hd", id: "lecturerViewHead" },
                        createElement("thead", null,
                            createElement("th", null, "No."),
                            createElement("th", null, "Name"),
                            createElement("th", null, "StaffId"),
                            createElement("th", null, "Department"),
                            createElement("th", null, "Telephone"),
                            createElement("th", null, "Email"),
                            createElement("th", null, "Address"),
                            createElement("th", null, "Status"))),
                    createElement("div", { class: "lect-horizontal" },
                        createElement("table", { class: "table css-serial", id: "lecturerView" },
                            createElement("thead", { hidden: true },
                                createElement("tr", null,
                                    createElement("th", null, "No."),
                                    createElement("th", null, "Name"),
                                    createElement("th", null, "StaffId"),
                                    createElement("th", null, "Department"),
                                    createElement("th", null, "Telephone"),
                                    createElement("th", null, "Email"),
                                    createElement("th", null, "Address"),
                                    createElement("th", null, "Status"))),
                            createElement("tbody", { id: "lecturers", "data-repeat": "results" }, this._vm.lecturers.map(x => createElement("tr", { id: x.departmentId },
                                createElement("td", null),
                                createElement("td", null, x.name),
                                createElement("td", null, x.staffId),
                                createElement("td", null, x.departmentName),
                                createElement("td", null, x.telephone),
                                createElement("td", null, x.email),
                                createElement("td", { width: "8%" }, x.address),
                                createElement("td", null, new StatusButton(this._vm).create(x.status)))))))))));
        let departmentChanged = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const innerTable = document.getElementById("lecturers");
            innerTable.textContent = "";
            innerTable.appendChild(createElement("tr", null,
                createElement("td", null),
                createElement("td", { binding: "name" }),
                createElement("td", { binding: "departmentId" }),
                createElement("td", { binding: "staffId" }),
                createElement("td", { binding: "telephone" }),
                createElement("td", { binding: "email" }),
                createElement("td", { binding: "address", width: "8%" })));
            const value = evt.target.value;
            this._vm.buidQuery("departmentId", value);
        });
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        function tableSearch() {
            let input, filter, table, tr, td, txtValue;
            input = document.getElementById("searchByName");
            filter = input.value.toUpperCase();
            table = document.getElementById("lecturers");
            tr = table.querySelectorAll("tr");
            for (let i = 0; i < tr.length; ++i) {
                td = tr[i].cells[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
        // function countLecturer(){
        //   let lectcount = document.getElementById("lecturers");
        //   let tr = lectcount.querySelectorAll("tr").length;
        //   document.getElementById("totalLecturers").textContent=`${tr}`
        // }
        _.syncTable("lecturerViewHead", "lecturerView");
        let showModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            new LecturerModal(this._vm).render("route-outlet");
        });
        document.getElementById("addLecturer").onclick = showModal;
        document.getElementById("department").onchange = departmentChanged;
    }
}
export class StatusButton {
    constructor(_vm) {
        this._vm = _vm;
    }
    create(status) {
        let btnText = status ? "Enabled" : "Disabled";
        let btnColor = status ? "#59b379" : "#8B0000";
        let btn = createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "enabled", onClick: (evt) => {
                evt.preventDefault();
                let row = evt.target.parentElement.parentElement;
                const staffId = row.cells[2].innerText;
                this._vm.staffId = staffId;
                if (row.cells[7].textContent.indexOf("Enabled") != -1) {
                    this._vm.lectStatus = false;
                    this._vm.update();
                    row.cells[7].children[0].style.color = "#8B0000";
                    row.cells[7].children[0].innerHTML = "Disabled";
                }
                else {
                    this._vm.lectStatus = true;
                    this._vm.update();
                    row.cells[7].children[0].innerHTML = "Enabled";
                    row.cells[7].children[0].style.color = "#59b379";
                }
            } }, btnText);
        btn.style.color = btnColor;
        return btn;
    }
}
//# sourceMappingURL=lecturerView.js.map