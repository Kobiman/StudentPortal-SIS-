"use strict";
exports.__esModule = true;
exports.Properties = exports.ViewModelHelper = void 0;
var app_1 = require("./app");
var ViewModelHelper = /** @class */ (function () {
    function ViewModelHelper() {
        this.addPropertyChangeNotification = function (object) {
            var elements = [];
            elements = document.querySelectorAll("[binding]");
            elements.forEach(function (element) {
                var propToBind = element.getAttribute("binding").split(".");
                if (propToBind[0] === object.constructor.name) {
                    new Properties().addScopeProp(object, propToBind, elements);
                    if (element.type === "text" || element.type === "textarea") {
                        element.onkeyup = function () {
                            object[propToBind[1]] = element.value;
                        };
                    }
                    else if (element.type === "checkbox") {
                        element.onchange = function () {
                            object[propToBind[1]] = element.checked;
                        };
                    }
                    else {
                        element.onchange = function () {
                            object[propToBind[1]] = element.value;
                        };
                    }
                }
            });
            return object;
        };
        this.notificationPropertyChange = function (object, elements) {
            elements.forEach(function (element) {
                var propToBind = element.getAttribute("binding").split(".");
                new Properties().addScopeProp(object, propToBind, elements);
                if (element.type === "text" || element.type === "textarea") {
                    element.onkeyup = function () {
                        object[propToBind] = element.value;
                    };
                }
                else if (element.type === "checkbox") {
                    element.onchange = function () {
                        object[propToBind] = element.checked;
                    };
                }
                else {
                    element.onchange = function () {
                        object[propToBind] = element.value;
                    };
                }
            });
            return object;
        };
    }
    ViewModelHelper.prototype.addEventListener = function (self, tag) {
        var elements = document.querySelectorAll("[" + tag + "]");
        elements.forEach(function (element) {
            element.addEventListener("click", function (evt) {
                evt.preventDefault();
                var route = element.getAttribute(tag);
                app_1.App.navigate(route);
            });
        });
    };
    ViewModelHelper.prototype.showErrors = function (results) {
        var elements = document.querySelectorAll("[errors]");
        elements.forEach(function (element) {
            element.innerHTML = "";
        });
        results.forEach(function (r) {
            elements.forEach(function (element) {
                r.errors.forEach(function (e) {
                    if (element.getAttribute("errors") === r.propertyName) {
                        element.innerHTML += "<p class=\"error\">" + e.error + "</p>";
                    }
                });
            });
        });
    };
    return ViewModelHelper;
}());
exports.ViewModelHelper = ViewModelHelper;
var Properties = /** @class */ (function () {
    function Properties() {
        this.addScopeProp = function (object, prop, elements) {
            if (!object.hasOwnProperty(prop)) {
                var value;
                Object.defineProperty(object, prop, {
                    set: function (newValue) {
                        value = newValue;
                        elements.forEach(function (element) {
                            var propName = prop.split(".");
                            if (propName[0] === object.constructor.name) {
                                if (element.getAttribute("binding") === propName[1]) {
                                    if (element.type && (element.type === "text" || element.type === "textarea")) {
                                        element.value = newValue;
                                    }
                                    else if (!element.type) {
                                        element.innerHTML = newValue;
                                    }
                                }
                            }
                        });
                    },
                    get: function () {
                        return value;
                    },
                    enumerable: true
                });
            }
        };
    }
    return Properties;
}());
exports.Properties = Properties;
