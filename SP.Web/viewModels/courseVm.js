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
exports.CourseVm = void 0;
var BindingList2_1 = require("../BindingList2");
var viewModelHelper_1 = require("../viewModelHelper");
var validator_1 = require("../validator");
var Course_1 = require("../models/Course");
var ballLoader_1 = require("../loader/ballLoader");
var toast_1 = require("../toast/toast");
var app_1 = require("../app");
var CourseVm = /** @class */ (function () {
    function CourseVm() {
        var _this = this;
        this.course = new Course_1.Course();
        this.departments = [];
        this.courses = [];
        this.getDepartments = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(app_1.App.baseUri + "/api/Department/GetDepartments")];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        this.departments = data.value;
                        this.departments.unshift({
                            departmentId: "",
                            name: "Please Select Department",
                            code: "",
                            schoolId: "",
                            schoolName: ""
                        });
                        this.bindList("departments");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getCourses = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(app_1.App.baseUri + "/api/Course/GetCourses")];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        this.courses = data.value;
                        new BindingList2_1.BindingList2().bind(this, "courses");
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.viewModelHelper = new viewModelHelper_1.ViewModelHelper();
        this.validator = new validator_1.Validator();
        this.getDepartments();
        this.getCourses();
    }
    CourseVm.prototype.setupRules = function () {
        return [
            new validator_1.Rules("name", [new validator_1.Required(this.course.courseName), new validator_1.MinLength(this.course.courseName, 2)]),
            //new Rules("category", [new Required(this.course.category)]),
            new validator_1.Rules("code", [new validator_1.Required(this.course.code)]),
            new validator_1.Rules("credit", [new validator_1.Required(this.course.credit)]),
        ];
    };
    CourseVm.prototype.save = function () {
        var _this = this;
        var rules = this.setupRules();
        var errors = this.validator.addRules(rules).validate();
        this.viewModelHelper.showErrors(errors);
        if (!this.validator.hasErrors) {
            var department = this.departments.find(function (x) { return x.name === _this.course.department; });
            this.course.departmentId = department.departmentId;
            var options = {
                method: "POST",
                body: JSON.stringify(this.course),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*"
                }
            };
            ballLoader_1.BallLoader.show();
            fetch(app_1.App.baseUri + "/api/Course/AddCourse", options)
                .then(function (res) { return res.json(); })
                .then(function (res) {
                _this.course = new Course_1.Course();
                _this.bind();
                _this.getCourses();
                toast_1.Toast.success(res.message);
                ballLoader_1.BallLoader.hide();
            });
        }
    };
    CourseVm.prototype.bindList = function (id) {
        new BindingList2_1.BindingList2().bind(this, id);
    };
    CourseVm.prototype.bind = function () {
        this.course = this.viewModelHelper.addPropertyChangeNotification(this.course);
    };
    return CourseVm;
}());
exports.CourseVm = CourseVm;
