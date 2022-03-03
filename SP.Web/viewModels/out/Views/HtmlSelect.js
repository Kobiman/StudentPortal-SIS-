import { createElement } from "tsx-create-element";
export class HtmlSelect {
    static create(value, option, binding, placeholder) {
        return (createElement("select", { binding: binding, value: value },
            createElement("option", null, placeholder),
            option));
    }
}
//# sourceMappingURL=HtmlSelect.js.map