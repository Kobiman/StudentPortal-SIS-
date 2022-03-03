import { createElement } from "tsx-create-element";
export class BallLoader {
    static show() {
        let el = (createElement("div", { class: "wrapper", id: "loader" },
            createElement("div", { class: "loading-dots" },
                createElement("div", { class: "bounce1" }),
                createElement("div", { class: "bounce2" }),
                createElement("div", { class: "bounce3" }),
                createElement("p", null, "Loading"))));
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
//# sourceMappingURL=ballLoader.js.map