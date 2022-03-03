import { createElement } from "tsx-create-element";
export class SelectedCourseView {
    constructor() { }
    render() {
        return (createElement("tr", null,
            createElement("td", { binding: true },
                createElement("input", { binding: "name", type: "text", placeholder: "Name", style: "margin-bottom: 0px;" }),
                createElement("div", { errors: "name" })),
            createElement("td", { binding: true }),
            createElement("td", { binding: true },
                createElement("input", { binding: "name", type: "text", placeholder: "Name", style: "margin-bottom: 0px;" }),
                createElement("div", { errors: "name" })),
            createElement("td", null,
                createElement("label", { class: "check-content margin-0" },
                    "Scoring",
                    createElement("input", { id: "scoring", type: "checkbox", checked: true, binding: "SelectedCourse.scoring", value: true }),
                    createElement("span", { class: "checkmark" }))),
            createElement("td", null,
                createElement("button", { class: "sp-btn sp-btn-default btn-small", click: "", binding: true, value: "" }, "Add"))));
    }
}
//# sourceMappingURL=selectedCourse.js.map