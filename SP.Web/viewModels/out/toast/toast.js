import { createElement } from "tsx-create-element";
export class Toast {
    constructor() { }
    static success(message) {
        let el = (createElement("div", { class: "toast toast-success" },
            createElement("h3", null, "Success"),
            createElement("div", { style: "margin-top: 10px;" },
                createElement("h5", null, message))));
        document.getElementById("header").appendChild(el);
        setTimeout(() => {
            document.getElementById("header").removeChild(el);
        }, 3000);
    }
    static warning(message) {
        let el = (createElement("div", { class: "toast toast-warning" },
            createElement("h3", null, "Warning"),
            createElement("div", { style: "margin-top: 10px;" },
                createElement("h5", null, message))));
        document.getElementById("header").appendChild(el);
        setTimeout(() => {
            document.getElementById("header").removeChild(el);
        }, 3000);
    }
    static error(message) {
        let el = (createElement("div", { class: "toast toast-error" },
            createElement("h3", null, "Error"),
            createElement("div", { style: "margin-top: 10px;" },
                createElement("h5", null, message))));
        document.getElementById("header").appendChild(el);
        setTimeout(() => {
            document.getElementById("header").removeChild(el);
        }, 3000);
    }
}
//# sourceMappingURL=toast.js.map