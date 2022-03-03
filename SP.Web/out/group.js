export class _ {
    static groupBy(array, f) {
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return groups;
    }
    static querySelectorAll(element, attr) {
        let result = null;
        element.querySelectorAll("[" + attr + "]").forEach(function (elem) {
            var attribute = elem.getAttribute(attr);
            if (attribute === attr) {
                result = elem;
            }
        });
        return result;
    }
    static getElementByAttribute(element, attr) {
        let result = null;
        element.querySelectorAll("[binding]").forEach(function (elem) {
            var attribute = elem.getAttribute("binding");
            if (attribute === attr) {
                result = elem;
                return;
            }
        });
        return result;
    }
    static formatDate(dateObj) {
        var month = dateObj.getMonth() + 1; //months from 1-12
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();
        return day + "-" + month + "-" + year;
    }
    ;
    static syncTable(header, body) {
        let _header = document.getElementById(header);
        let _body = document.getElementById(body);
        for (var i = 0; i < _header.childNodes.length; i++) {
            for (var j = 0; j < _header.childNodes[i].childNodes.length; j++) {
                let width = _body.childNodes[1].childNodes[i].childNodes[j];
                _header.childNodes[i].childNodes[j].setAttribute("width", `${width.clientWidth}px`);
            }
        }
    }
}
//# sourceMappingURL=group.js.map