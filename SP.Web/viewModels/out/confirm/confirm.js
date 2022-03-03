import { createElement } from "tsx-create-element";
export class Confirm {
    constructor(options) {
        this.options = options;
    }
    open() {
        let html = (createElement("div", { class: "mountcourse-modal", id: "modal" },
            createElement("div", { class: "modal-content", style: { padding: `${this.options.padding}` } },
                createElement("div", { class: "sp-box" },
                    createElement("div", { class: "sp-row" },
                        createElement("h1", null, this.options.title),
                        createElement("div", { class: "mountcourses-form" },
                            createElement("span", null, this.options.message),
                            createElement("div", { class: "sp-btn-row" },
                                createElement("button", { class: "sp-btn sp-btn-primary" }, this.options.okText),
                                createElement("button", { class: "sp-btn sp-btn-default" }, this.options.cancelText))))))));
        this.options = Object.assign({}, {
            title: "",
            message: "",
            okText: "OK",
            cancelText: "Cancel",
            modalPadding: "0% 26% 0% 26%",
            onok: function () { },
            oncancel: function () {
                document.getElementById("route-outlet").removeChild(html);
            },
        }, this.options);
        let button = html.getElementsByTagName("button");
        button[0].addEventListener("click", (e) => {
            e.preventDefault();
            this.options.onok();
            this.options.oncancel();
        });
        button[1].addEventListener("click", (e) => {
            e.preventDefault();
            this.options.oncancel();
        });
        document.getElementById("route-outlet").appendChild(html);
    }
    close() {
        this.options.oncancel();
    }
}
{
    /* <div class="confirm-window">
            <div class="confirm-titlebar">
              <span class="confirm-title">{this.options.title}</span>
              <button class="confirm-close">&times;</button>
            </div>
          </div>
          <div class="confirm-content">{this.options.message}</div>
          <div class="confirm-buttons">
            <button class="sp-btn sp-btn-default btn-small">{this.options.okText}</button>
            <button class="sp-btn sp-btn-primary btn-small">{this.options.cancelText}</button>
          </div> */
}
//# sourceMappingURL=confirm.js.map