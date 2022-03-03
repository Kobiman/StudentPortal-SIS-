export class CustomRenderer {
    static render(domLocation, htmlElement) {
        let elem = document.getElementById(domLocation);
        elem.textContent = "";
        elem.appendChild(htmlElement);
    }
    static renderElements(domLocation, htmlElements) {
        let elem = document.getElementById(domLocation);
        if (elem) {
            elem.textContent = "";
            for (var html of htmlElements) {
                elem.appendChild(html);
            }
        }
    }
}
//# sourceMappingURL=customRenderer.js.map