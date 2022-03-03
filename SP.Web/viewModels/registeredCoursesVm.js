"use strict";
exports.__esModule = true;
exports.RegisteredCoursesVm = void 0;
var registeredCoursesRow_1 = require("../views/registration/registeredCoursesRow");
var RegisteredCoursesVm = /** @class */ (function () {
    function RegisteredCoursesVm(_mainvm) {
        this._mainvm = _mainvm;
    }
    RegisteredCoursesVm.prototype.getRegisteredCourses = function () {
        var r = new registeredCoursesRow_1.RegisteredCoursesRow();
        this._mainvm.registeredCourses.map(function (x) { return r.render(x); });
    };
    return RegisteredCoursesVm;
}());
exports.RegisteredCoursesVm = RegisteredCoursesVm;
