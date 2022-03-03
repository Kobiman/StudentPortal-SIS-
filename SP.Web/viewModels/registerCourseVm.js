"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RegisterCourseVm = void 0;
var app_1 = require("../app");
var toast_1 = require("../toast/toast");
var RegisterCourseVm = /** @class */ (function () {
    function RegisterCourseVm(_courseRegistrationService) {
        var _this = this;
        this._courseRegistrationService = _courseRegistrationService;
        this.selectedCourses = [];
        this.addCourse = function (courseCode) {
            var mountedCourse = _this.courseList.find(function (x) { return x.courseCode === courseCode; });
            var selectedCourse = {
                courseCode: courseCode,
                studentId: _this._courseRegistrationService.student.studentId,
                mountedCoureId: mountedCourse.mountedCoureId,
                indexNumber: _this._courseRegistrationService.student.indexNumber,
                semester: mountedCourse.semester,
                academicYear: mountedCourse.academicYear,
                approved: false
            };
            _this.selectedCourses.push(selectedCourse);
        };
        this.removeCourse = function (courseCode) {
            var selectedCourse = _this.selectedCourses.find(function (x) { return x.courseCode === courseCode; });
            if (selectedCourse) {
                var index = _this.selectedCourses.indexOf(selectedCourse);
                _this.selectedCourses.splice(index, 1);
            }
        };
        this.save = function () { return __awaiter(_this, void 0, void 0, function () {
            var courses, j, options;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.selectedCourses.length === 0) {
                }
                else {
                    courses = this.selectedCourses.map(function (x) {
                        return new Object({
                            studentId: x.studentId,
                            mountedCoureId: x.mountedCoureId,
                            indexNumber: x.indexNumber,
                            semester: x.semester,
                            academicYear: x.academicYear,
                            approved: x.approved
                        });
                    });
                    j = JSON.stringify(courses);
                    options = {
                        method: "POST",
                        body: j,
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*"
                        }
                    };
                    fetch(app_1.App.baseUri + "/api/Department/RegisterCourse", options)
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        _this.selectedCourses = [];
                        toast_1.Toast.success(res.message);
                    });
                }
                return [2 /*return*/];
            });
        }); };
    }
    RegisterCourseVm.prototype.getRegisteredCourses = function () {
        return this._courseRegistrationService.mountedCourses;
    };
    return RegisterCourseVm;
}());
exports.RegisterCourseVm = RegisterCourseVm;
