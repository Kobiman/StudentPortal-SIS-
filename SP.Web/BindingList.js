"use strict";
exports.__esModule = true;
exports.MapValue = exports.Interpolate = exports.BindingList = void 0;
var BindingList = /** @class */ (function () {
    function BindingList() {
    }
    BindingList.prototype.bindCollection = function (self) {
        var elements = document.querySelectorAll("[data-repeat]");
        if (elements && elements.length > 0) {
            //elements.forEach(function(element){
            var element = elements[0];
            var html = "";
            var attr = element.getAttribute("data-repeat");
            if (Array.isArray(self[attr])) {
                self[attr].forEach(function (item) {
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
    };
    return BindingList;
}());
exports.BindingList = BindingList;
var Interpolate = /** @class */ (function () {
    function Interpolate() {
    }
    Interpolate.prototype.interpolate = function (template, obj) {
        if (typeof obj == "object") {
            for (var key in obj) {
                var find = "${" + key + "}";
                if (template.indexOf(find) > -1) {
                    /* var t = template.split(find);
                  template = t.join(obj[key]); */
                    template = template.replace(find, obj[key]);
                    //delete obj[key];
                }
            }
        }
        return template;
    };
    return Interpolate;
}());
exports.Interpolate = Interpolate;
var MapValue = /** @class */ (function () {
    function MapValue() {
    }
    MapValue.prototype.map = function (c, self) {
        var html = "";
        var attr = c.getAttribute("data-repeat");
        if (attr != null) {
            if (Array.isArray(self[attr])) {
                self[attr].forEach(function (item) {
                    html += new Interpolate().interpolate(c.innerHTML, item);
                });
            }
            else {
                throw new Error("Content should be an Array of objects.");
            }
            c.innerHTML = html;
        }
    };
    return MapValue;
}());
exports.MapValue = MapValue;
