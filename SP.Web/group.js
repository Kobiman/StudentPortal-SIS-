"use strict";
exports.__esModule = true;
exports._ = void 0;
var _ = /** @class */ (function () {
    function _() {
    }
    _.groupBy = function (array, f) {
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return groups;
    };
    _.getElementByAttribute = function (element, attr) {
        var result = null;
        element.querySelectorAll("[binding]").forEach(function (elem) {
            var attribute = elem.getAttribute("binding");
            if (attribute === attr) {
                result = elem;
                return;
            }
        });
        return result;
    };
    _.formatDate = function (dateObj) {
        var month = dateObj.getMonth() + 1; //months from 1-12
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();
        return day + "-" + month + "-" + year;
    };
    ;
    return _;
}());
exports._ = _;
