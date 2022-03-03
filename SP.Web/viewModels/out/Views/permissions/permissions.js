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
import { PermissionsModal } from "./permissionsModal";
import { PermissionTable } from "./permissionTable";
export class PermissionView {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getPages();
            yield this._vm.getUsers();
        });
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Permissions View "),
                createElement("div", { class: "sp-btn-row" },
                    createElement("button", { class: "sp-btn sp-btn-primary", id: "addPermission", onClick: (evt) => {
                            evt.preventDefault();
                            new PermissionsModal(this._vm).render("route-outlet");
                        } }, "Add")),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "permission-filter" },
                        createElement("div", { id: "permissionSearch" },
                            createElement("input", { type: "text", name: "answer", placeholder: "search here.", autofocus: true, onkeyup: () => {
                                }, id: "searchByUserId" })),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default", id: "addPermissions", style: "float:right", onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                    evt.preventDefault();
                                    //this.tableSearch();
                                    yield this._vm.getStaffDetails(document.getElementById("searchByUserId").value);
                                    new PermissionTable(this._vm).render();
                                }) }, "SEARCH"))),
                    createElement("div", null,
                        createElement("div", null,
                            createElement("table", { class: "table-hd", id: "permissionViewHead" },
                                createElement("thead", null,
                                    createElement("th", null, "No."),
                                    createElement("th", null, "STAFF NAME"),
                                    createElement("th", null, "EMAIL"),
                                    createElement("th", null, "Edit"))),
                            createElement("div", { class: "horizontal-edit" },
                                createElement("table", { class: "table css-serial", id: "permissionView" },
                                    createElement("thead", { class: "table", hidden: true },
                                        createElement("tr", null,
                                            createElement("th", null, "No."),
                                            createElement("th", null, "Username"),
                                            createElement("th", null, "User ID"),
                                            createElement("th", null, "Edit"))),
                                    createElement("tbody", { id: "userPermission" })))))))));
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
    }
    tableSearch() {
        const searchField = document.getElementById("searchByUserId");
        this._vm.id = searchField.value;
    }
}
//# sourceMappingURL=permissions.js.map