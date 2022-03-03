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
export class CourseModal {
    constructor(_vm) {
        this._vm = _vm;
    }
    oninitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._vm.getCourses();
        });
    }
    render(elementId) {
        const temp = (createElement("div", { class: "mountcourse-modal", id: "modal" },
            createElement("div", { class: "modal-content" },
                createElement("div", { class: "sp-box" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, "Course"),
                        createElement("div", { class: "mountcourses-form" },
                            createElement("p", null,
                                createElement("label", null, "Department"),
                                createElement("select", { id: "departments", binding: "Course.department", value: this._vm.course.department, "data-repeat": "departments" },
                                    createElement("option", { binding: "name" })),
                                createElement("div", { errors: "department" })),
                            createElement("p", null,
                                createElement("label", null, "Name"),
                                createElement("input", { binding: "Course.courseName", type: "text", value: this._vm.course.courseName }),
                                createElement("div", { errors: "name" })),
                            createElement("p", null,
                                createElement("label", null, "Code"),
                                createElement("input", { type: "text", binding: "Course.code", value: this._vm.course.code }),
                                createElement("div", { errors: "code" })),
                            createElement("p", null,
                                createElement("label", null, "Credit"),
                                createElement("input", { type: "number", binding: "Course.credit", value: this._vm.course.credit }),
                                createElement("div", { errors: "credit" })),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { id: "Save", class: "sp-btn sp-btn-primary" },
                                    "Save ",
                                    createElement("i", { class: "fas fa-save" })),
                                createElement("button", { class: "sp-btn sp-btn-default", id: "close" }, "Cancel"))))))));
        const doc = document.getElementById(elementId);
        doc.appendChild(temp);
        let save = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            this._vm.save();
        });
        let hideModal = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            doc.removeChild(temp);
        });
        this._vm.bind();
        this._vm.bindList("departments");
        document.getElementById("close").onclick = hideModal;
        document.getElementById("Save").onclick = save;
    }
}
//# sourceMappingURL=courseModal.js.map