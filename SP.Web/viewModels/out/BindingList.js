export class BindingList {
    bindCollection(self) {
        const elements = document.querySelectorAll("[data-repeat]");
        if (elements && elements.length > 0) {
            //elements.forEach(function(element){
            var element = elements[0];
            var html = "";
            var attr = element.getAttribute("data-repeat");
            if (Array.isArray(self[attr])) {
                self[attr].forEach((item) => {
                    html += new Interpolate().interpolate(element.outerHTML, item);
                });
            }
            else {
                throw new Error("Content should be an Array of objects.");
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
    interpolate(template, obj) {
        if (typeof obj == "object") {
            for (var key in obj) {
                const find = "${" + key + "}";
                if (template.indexOf(find) > -1) {
                    /* var t = template.split(find);
                  template = t.join(obj[key]); */
                    template = template.replace(find, obj[key]);
                    //delete obj[key];
                }
            }
        }
        return template;
    }
}
export class MapValue {
    map(c, self) {
        var html = "";
        var attr = c.getAttribute("data-repeat");
        if (attr != null) {
            if (Array.isArray(self[attr])) {
                self[attr].forEach((item) => {
                    html += new Interpolate().interpolate(c.innerHTML, item);
                });
            }
            else {
                throw new Error("Content should be an Array of objects.");
            }
            c.innerHTML = html;
        }
    }
}
//# sourceMappingURL=BindingList.js.map