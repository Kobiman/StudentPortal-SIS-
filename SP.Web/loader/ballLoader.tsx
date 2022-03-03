import { createElement } from "tsx-create-element";

export class BallLoader {
  static show() {
    let el = (
      <div class="wrapper" id="loader">
        <div class="loading-dots">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
          <p>Loading</p>
        </div>
      </div>
    );
    document.getElementById("route-outlet").appendChild(el);
    // setTimeout(() => {
    //   document.getElementById("header").removeChild(el);
    // }, 3000);
  }

  static hide() {
    let el = document.getElementById("loader");
    document.getElementById("route-outlet").removeChild(el);
  }
}
