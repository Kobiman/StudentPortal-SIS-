"use strict";
exports.__esModule = true;
exports.MapValue = exports.InterpolateSelect = exports.Interpolate = exports.BindingList2 = void 0;
var BindingList2 = /** @class */ (function () {
    function BindingList2() {
    }
    BindingList2.prototype.bindCollection = function (self) {
        var elements = document.querySelectorAll("[data-repeat]");
        if (elements && elements.length > 0) {
            elements.forEach(function (element) {
                var html = "";
                var attr = element.getAttribute("data-repeat");
                if (Array.isArray(self[attr])) {
                    self[attr].forEach(function (item) {
                        var template = element.cloneNode(true);
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
    };
    BindingList2.prototype.bind = function (self, id) {
        var element = document.getElementById(id);
        if (element) {
            var html = "";
            var attr = element.getAttribute("data-repeat");
            if (Array.isArray(self[attr])) {
                self[attr].forEach(function (item) {
                    var template = element.cloneNode(true);
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
    };
    return BindingList2;
}());
exports.BindingList2 = BindingList2;
var Interpolate = /** @class */ (function () {
    function Interpolate() {
    }
    Interpolate.prototype.interpolate = function (self, template, obj) {
        var child = null;
        if (template.children.length > 0) {
            child = template.children[0];
        }
        else {
            child = template;
        }
        var tag = child.getAttribute("binding");
        if (tag) {
            if (child.tagName === "SELECT") {
                child.value = obj[tag];
            }
            else if (child.type === "checkbox") {
                child.value = obj[tag];
                var v = obj[tag];
                if (v === true) {
                    child.outerHTML = child.outerHTML.replace(">", "checked=" + v + " value=" + v + ">");
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
    };
    Interpolate.prototype.interpolateChild = function (self, template, obj) {
        for (var c = 0; c < template.children.length; c++) {
            var child = template.children[c];
            var tag = child.getAttribute("binding");
            if (tag) {
                if (child.tagName === "SELECT") {
                    child.value = obj[tag];
                    this.bindSelect(self, child);
                }
                else if (child.type === "checkbox") {
                    child.value = obj[tag];
                    var v = obj[tag];
                    if (v) {
                        child.outerHTML = child.outerHTML.replace(">", "checked=" + v + " value=" + v + ">");
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
    };
    Interpolate.prototype.bindSelect = function (self, element) {
        var html = "";
        var attr = element.getAttribute("data-repeat");
        if (Array.isArray(self[attr])) {
            self[attr].forEach(function (item) {
                if (element.tagName === "SELECT") {
                    html += new InterpolateSelect().interpolate(element, item);
                }
            });
        }
        else {
            throw new Error("Content should be an Array of objects.");
        }
        element.innerHTML = html;
    };
    return Interpolate;
}());
exports.Interpolate = Interpolate;
var InterpolateSelect = /** @class */ (function () {
    function InterpolateSelect() {
    }
    InterpolateSelect.prototype.interpolate = function (template, obj) {
        var child = null;
        if (template.children.length > 0) {
            child = template.children[0];
        }
        var tag = child.getAttribute("binding");
        if (tag) {
            child.value = obj[tag];
            child.innerHTML = obj[tag];
        }
        return template.innerHTML;
    };
    return InterpolateSelect;
}());
exports.InterpolateSelect = InterpolateSelect;
var MapValue = /** @class */ (function () {
    function MapValue() {
    }
    MapValue.prototype.map = function (c, self) {
        var html = "";
        var attr = c.getAttribute("data-repeat");
        if (attr != null) {
            if (Array.isArray(self[attr])) {
                self[attr].forEach(function (item) {
                    html += new Interpolate().interpolate(self, c.innerHTML, item);
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
