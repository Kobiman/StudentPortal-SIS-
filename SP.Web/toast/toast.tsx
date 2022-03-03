import { createElement } from "tsx-create-element";

export class Toast {
  constructor() {}

  static success(message) {
    let el = (
      <div class="toast toast-success">
        <h3>Success</h3>
        <div style="margin-top: 10px;">
          <h5>{message}</h5>
        </div>
      </div>
    );
    document.getElementById("header").appendChild(el);
    setTimeout(() => {
      document.getElementById("header").removeChild(el);
    }, 3000);
  }

  static warning(message) {
    let el = (
      <div class="toast toast-warning">
        <h3>Warning</h3>
        <div style="margin-top: 10px;">
          <h5>{message}</h5>
        </div>
      </div>
    );
    document.getElementById("header").appendChild(el);
    setTimeout(() => {
      document.getElementById("header").removeChild(el);
    }, 3000);
  }

  static error(message) {
    let el = (
      <div class="toast toast-error">
        <h3>Error</h3>
        <div style="margin-top: 10px;">
          <h5>{message}</h5>
        </div>
      </div>
    );
    document.getElementById("header").appendChild(el);
    setTimeout(() => {
      document.getElementById("header").removeChild(el);
    }, 3000);
  }
}
