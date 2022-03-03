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
import { PermissionsModal } from "./permissionsModal";
export class PermissionTable {
    constructor(_vm) {
        this._vm = _vm;
    }
    render() {
        const doc = document.getElementById("userPermission");
        doc.textContent = "";
        for (let rows of this._vm.userPermission) {
            let tr = (createElement("tr", null,
                createElement("td", null),
                createElement("td", null, rows.staffName),
                createElement("td", null, rows.staffEmail),
                createElement("td", null,
                    createElement("button", { class: "sp-btn td-btn", onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                            evt.preventDefault();
                            let row = evt.target.parentElement.parentElement;
                            this._vm.id = row.cells[2].innerText;
                            this._vm.staffId = rows.staffId;
                            yield this._vm.getPermissions(rows.staffId);
                            new PermissionsModal(this._vm).render("route-outlet");
                        }) },
                        createElement("i", { class: "fas fa-edit" }, " "),
                        "Edit"))));
            doc.appendChild(tr);
            _.syncTable("permissionViewHead", "permissionView");
        }
    }
}
//# sourceMappingURL=permissionTable.js.map