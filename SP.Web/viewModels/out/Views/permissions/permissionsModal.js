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
import { Toast } from "../../toast/toast";
export class PermissionsModal {
    constructor(_vm) {
        this._vm = _vm;
        this.showLecturers = (evt) => __awaiter(this, void 0, void 0, function* () {
            let textbox = evt.target;
            let lecturers = [];
            if (textbox.value !== '') {
                lecturers = yield this._vm.getLecturer(textbox.value);
            }
            let suggestions = document.getElementById("HoDList");
            suggestions.textContent = '';
            for (var l of lecturers) {
                let li = createElement("li", null, l.name);
                li.onclick = () => {
                    textbox.value = li.innerHTML.trim();
                    suggestions.textContent = '';
                    this._vm.department.lecturerId = l.lecturerId;
                };
                suggestions.appendChild(li);
            }
        });
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
                        createElement("h1", null, "Permissions Setup"),
                        createElement("form", { class: "mountcourses-form" },
                            createElement("p", null,
                                createElement("label", null, "User Name"),
                                createElement("input", { id: "staffId", type: "text", class: "edit-text-field", value: this._vm.staffId, style: "margin-bottom: 8px; margin-top: 8px", onKeyup: (evt) => __awaiter(this, void 0, void 0, function* () {
                                        this.showLecturers(evt);
                                    }), input: true }),
                                createElement("div", { class: "autocom-box" },
                                    createElement("ul", { id: "HoDList" }))),
                            createElement("p", null,
                                createElement("label", null, "Select Page Title"),
                                createElement("div", { class: "permissionOlist" },
                                    createElement("ol", { name: "setPermission", id: "permissions" }, this._vm.pages.map(x => createElement("li", null,
                                        createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px; width: 30%; display: inline-grid;" },
                                            createElement("input", { type: "checkbox", value: x }),
                                            createElement("span", { style: "margin-left: 3%;" }, x.title),
                                            createElement("span", { class: "checkmark" }))))))),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-default ", id: "set-permission", onClick: (evt) => __awaiter(this, void 0, void 0, function* () {
                                        evt.preventDefault();
                                        this.savePermission();
                                    }) }, "Set"),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        const doc = document.getElementById(elementId);
        //doc.textContent = "";
        doc.appendChild(temp);
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        document.getElementById("close").onclick = hideModal;
        if (this._vm.staffPermissionsList != undefined) {
            this.setSelectedPermission();
        }
    }
    setSelectedPermission() {
        debugger;
        let permissionList = document.getElementById("permissions").children;
        for (var i = 0; i < permissionList.length - 1; i++) {
            for (var j = 0; j < this._vm.staffPermissionsList.value.length - 1; j++) {
                debugger;
                if (this._vm.staffPermissionsList.value[j].pageId === permissionList[i].children[0].children[0].value.split(";")[0].split(":")[1]) {
                    permissionList[i].getElementsByTagName("input")[0].checked = true;
                    break;
                }
            }
        }
    }
    savePermission() {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionList = document.getElementById("permissions").children;
            let grantedList = [];
            for (var i = 0; i <= permissionList.length - 1; i++) {
                if (permissionList[i].children[0].children[0].checked) {
                    grantedList.push({
                        userId: this._vm.department.lecturerId,
                        pageId: permissionList[i].children[0].children[0].value.split(";")[0].split(":")[1],
                    });
                }
            }
            let res = yield this._vm.save(grantedList);
            if (res.isSucessful) {
                Toast.success(res.message);
                document.getElementById("staffId").value = "";
                let permissionList = document.getElementById("permissions").children;
                ;
                for (var i = 0; i <= permissionList.length - 1; i++) {
                    if (permissionList[i].children[0].children[0].checked) {
                        permissionList[i].children[0].children[0].checked = false;
                    }
                }
            }
            else {
                Toast.error(res.message);
            }
        });
    }
}
//# sourceMappingURL=permissionsModal.js.map