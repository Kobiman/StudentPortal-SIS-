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
import { _ } from "../../group";
import { PagesModal } from "./pagesModal";
export class PagesView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getPages();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Pages View "),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "permission-filter" },
                        createElement("div", { id: "pagesSearch" },
                            createElement("input", { type: "text", name: "answer", placeholder: "search here.", autofocus: true, onkeyup: () => {
                                    this.tableSearch();
                                }, id: "searchPagesByTitle" })),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default", id: "addPages", onClick: (evt) => {
                                    evt.preventDefault();
                                    new PagesModal(this._vm).render("route-outlet");
                                } }, "Add"))),
                    createElement("div", null,
                        createElement("table", { class: "table-hd", id: "pagesViewHead" },
                            createElement("thead", null,
                                createElement("th", null, "No."),
                                createElement("th", null, "Title"),
                                createElement("th", null, "Route"),
                                createElement("th", null, "Edit"))),
                        createElement("div", { class: "horizontal-edit" },
                            createElement("table", { class: "table css-serial", id: "pagesView" },
                                createElement("thead", { hidden: true },
                                    createElement("tr", null,
                                        createElement("th", null, "No."),
                                        createElement("th", null, "Title"),
                                        createElement("th", null, "Route"),
                                        createElement("th", null, "Edit"))),
                                createElement("tbody", { id: "userPages" }, this._vm.userPages.map(x => createElement("tr", null,
                                    createElement("td", null),
                                    createElement("td", null, x.title),
                                    createElement("td", null, x.route),
                                    createElement("td", null,
                                        createElement("button", { class: "sp-btn td-btn", onClick: (evt) => {
                                                evt.preventDefault();
                                                let row = evt.target.parentElement.parentElement;
                                                const userId = row.cells[2].innerText;
                                                new PagesModal(this._vm).render("route-outlet");
                                            } },
                                            createElement("i", { class: "fas fa-edit" }, " "),
                                            "Edit"))))))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        _.syncTable("pagesViewHead", "pagesView");
    }
    tableSearch() {
        let input, filter, table, tr, td, txtValue;
        input = document.getElementById("searchPagesByTitle");
        filter = input.value.toUpperCase();
        table = document.getElementById("userPages");
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
        // countLecturer();
    }
}
//# sourceMappingURL=pages.js.map