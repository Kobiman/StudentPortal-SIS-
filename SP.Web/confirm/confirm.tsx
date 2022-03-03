import { createElement } from "tsx-create-element";

export class Confirm {
  constructor(private options) {}

  open() {
    let html = (
      <div class="mountcourse-modal" id="modal">
        <div class="modal-content" style={{padding: `${this.options.padding}`}}>
          <div class="sp-box">
            <div class="sp-row">
              <h1>{this.options.title}</h1>
              <div class="mountcourses-form">
                <span>{this.options.message}</span>
                <div class="sp-btn-row">
                  <button class="sp-btn sp-btn-primary">{this.options.okText}</button>
                  <button class="sp-btn sp-btn-default">{this.options.cancelText}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    this.options = Object.assign(
      {},
      {
        title: "",
        message: "",
        okText: "OK",
        cancelText: "Cancel",
        modalPadding: "0% 26% 0% 26%",
        onok: function () {},
        oncancel: function () {
          document.getElementById("route-outlet").removeChild(html);
        },
      },
      this.options
    );

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
