export class BindingList2 {
    bindCollection(self) {
        const elements = document.querySelectorAll("[data-repeat]");
        if (elements && elements.length > 0) {
            elements.forEach(function (element) {
                var html = "";
                var attr = element.getAttribute("data-repeat");
                if (Array.isArray(self[attr])) {
                    self[attr].forEach((item) => {
                        let template = element.cloneNode(true);
                        html += new Interpolate().interpolate(self, template, item);
                    });
                }
                // else {
                //   throw new Error("Content should be an Array of objects.");
                // }
                element.innerHTML = html;
                if (element.children.length > 0) {
                    for (var c = 0; c < element.children.length; c++) {
                        new MapValue().map(element.children[c], self);
                    }
                }
            });
        }
    }
    bind(self, id) {
        const element = document.getElementById(id);
        if (element) {
            var html = "";
            var attr = element.getAttribute("data-repeat");
            if (Array.isArray(self[attr])) {
                self[attr].forEach((item) => {
                    let template = element.cloneNode(true);
                    html += new Interpolate().interpolate(self, template, item);
                });
            }
            element.innerHTML = html;
            if (element.children.length > 0) {
                for (var c = 0; c < element.children.length; c++) {
                    new MapValue().map(element.children[c], self);
                }
            }
        }
    }
}
export class Interpolate {
    interpolate(self, template, obj) {
        let child = null;
        if (template.children.length > 0) {
            child = template.children[0];
        }
        else {
            child = template;
        }
        const tag = child.getAttribute("binding");
        if (tag) {
            if (child.tagName === "SELECT") {
                child.value = obj[tag];
            }
            else if (child.type === "checkbox") {
                child.value = obj[tag];
                let v = obj[tag];
                if (v === true) {
                    child.outerHTML = child.outerHTML.replace(">", `checked=${v} value=${v}>`);
                }
            }
            else {
                child.textContent = obj[tag];
            }
        }
        if (child.children.length > 0) {
            this.interpolateChild(self, child, obj);
        }
        return template.outerHTML;
    }
    interpolateChild(self, template, obj) {
        for (var c = 0; c < template.children.length; c++) {
            const child = template.children[c];
            const tag = child.getAttribute("binding");
            if (tag) {
                if (child.tagName === "SELECT") {
                    child.value = obj[tag];
                    this.bindSelect(self, child);
                }
                else if (child.type === "checkbox") {
                    child.value = obj[tag];
                    let v = obj[tag];
                    if (v) {
                        child.outerHTML = child.outerHTML.replace(">", `checked=${v} value=${v}>`);
                    }
                }
                else {
                    child.textContent = obj[tag];
                }
            }
            else if (child.children.length > 0) {
                this.interpolate(self, child, obj);
            }
        }
        return template.outerHTML;
    }
    bindSelect(self, element) {
        var html = "";
        var attr = element.getAttribute("data-repeat");
        if (Array.isArray(self[attr])) {
            self[attr].forEach((item) => {
                if (element.tagName === "SELECT") {
                    html += new InterpolateSelect().interpolate(element, item);
                }
            });
        }
        else {
            throw new Error("Content should be an Array of objects.");
        }
        element.innerHTML = html;
    }
}
export class InterpolateSelect {
    interpolate(template, obj) {
        let child = null;
        if (template.children.length > 0) {
            child = template.children[0];
        }
        const tag = child.getAttribute("binding");
        if (tag) {
            child.value = obj[tag];
            child.innerHTML = obj[tag];
        }
        return template.innerHTML;
    }
}
export class MapValue {
    map(c, self) {
        var html = "";
        var attr = c.getAttribute("data-repeat");
        if (attr != null) {
            if (Array.isArray(self[attr])) {
                self[attr].forEach((item) => {
                    html += new Interpolate().interpolate(self, c.innerHTML, item);
                });
            }
            else {
                throw new Error("Content should be an Array of objects.");
            }
            c.innerHTML = html;
        }
    }
}
//# sourceMappingURL=BindingList2.js.map