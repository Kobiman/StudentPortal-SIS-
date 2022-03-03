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
exports.MountedCourseVm = void 0;
var BindingList2_1 = require("../BindingList2");
var viewModelHelper_1 = require("../viewModelHelper");
var mountedCoursesView_1 = require("../views/mountCourse/mountedCoursesView");
var ballLoader_1 = require("../loader/ballLoader");
var group_1 = require("../group");
var app_1 = require("../app");
var MountedCourseVm = /** @class */ (function () {
    function MountedCourseVm(commonService) {
        var _this = this;
        this.commonService = commonService;
        this.programs = [];
        this.courseList = [];
        this.enrollmentOptions = [];
        this.categories = [];
        this.levels = [];
        this.scoring = [{ name: "Please Select Scoring" }, { name: "" }, { name: "True" }, { name: "False" }];
        this.filter = {};
        this.querys = [];
        this.getMountedCourses = function () { return __awaiter(_this, void 0, void 0, function () {
            var options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.request.academicYear && this.request.program)) return [3 /*break*/, 2];
                        options = {
                            method: "POST",
                            body: JSON.stringify(this.request),
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "*/*"
                            }
                        };
                        ballLoader_1.BallLoader.show();
                        return [4 /*yield*/, fetch(app_1.App.baseUri + "/api/Department/GetMountedCourses", options)
                                .then(function (res) { return res.json(); })
                                .then(function (res) {
                                _this.courseList = res.value;
                                for (var _i = 0, _a = _this.courseList; _i < _a.length; _i++) {
                                    var c = _a[_i];
                                    if (c.scoring === true) {
                                        c.isScoring = "True";
                                    }
                                    else if (c.scoring === false) {
                                        c.isScoring = "False";
                                    }
                                }
                                var groups = group_1._.groupBy(_this.courseList, function (course) {
                                    return {
                                        enrollmentOption: course.enrollmentOption,
                                        category: course.category,
                                        program: course.program,
                                        level: course.level
                                    };
                                });
                                var courses = Object.keys(groups).map(function (group) {
                                    var j = JSON.parse(group);
                                    var g = groups[group];
                                    return {
                                        enrollmentOption: j.enrollmentOption,
                                        level: j.level,
                                        program: j.program,
                                        category: j.category,
                                        mountedCourses: g
                                    };
                                });
                                new mountedCoursesView_1.MountedRow(courses, _this).render();
                                ballLoader_1.BallLoader.hide();
                                //this.bindList("courses");
                                //App.navigate('/app/studentList');
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        this.getPrograms = function () {
            _this.programs = _this.commonService.programs;
        };
        this.getLookups = function () {
            _this.semesters = _this.commonService.lookups.filter(function (x) { return x.type === "SEMESTER"; });
            _this.semesters.unshift({ name: "" });
            _this.semesters.unshift({ name: "Please Select Semester" });
            _this.academicYears = _this.commonService.lookups.filter(function (x) { return x.type === "ACADEMIC YEAR"; });
            _this.enrollmentOptions = _this.commonService.lookups.filter(function (x) { return x.type === "ENROLLMENT OPTION"; });
            _this.enrollmentOptions.unshift({ name: "" });
            _this.enrollmentOptions.unshift({ name: "Please Select Enrollment Option" });
            _this.categories = _this.commonService.lookups.filter(function (x) { return x.type === "COURSE CATEGORY"; });
            _this.categories.unshift({ name: "" });
            _this.categories.unshift({ name: "Please Select Category" });
            _this.levels = _this.commonService.lookups.filter(function (x) { return x.type === "LEVEL"; });
            _this.levels.unshift({ name: "" });
            _this.levels.unshift({ name: "Please Select Level" });
        };
        this.viewModelHelper = new viewModelHelper_1.ViewModelHelper();
        this.getLookups();
        this.getPrograms();
        this.request = {};
    }
    MountedCourseVm.prototype.getLecturers = function () {
        return this.commonService.lecturers;
    };
    MountedCourseVm.prototype.bind = function () {
        this.request = this.viewModelHelper.addPropertyChangeNotification(this.request);
    };
    MountedCourseVm.prototype.bindList = function (id) {
        new BindingList2_1.BindingList2().bind(this, id);
    };
    MountedCourseVm.prototype.search = function () {
        var _this = this;
        this.courses = this.courseList.filter(function (a) { return _this.executeQuery(a, _this.querys); });
        this.bindList("courses");
    };
    MountedCourseVm.prototype.IsEqualTo = function (source, propertyName, parameter) {
        return source[propertyName] === parameter;
    };
    MountedCourseVm.prototype.buidQuery = function (propertyName, parameter) {
        var item = this.querys.find(function (x) { return x.propertyName === propertyName; });
        if (item != null) {
            var index = this.querys.indexOf(item);
            this.querys.splice(index, 1);
        }
        if (parameter != "") {
            this.querys.push({ propertyName: propertyName, parameter: parameter });
        }
        this.search();
    };
    MountedCourseVm.prototype.executeQuery = function (source, querys) {
        var result = true;
        for (var _i = 0, querys_1 = querys; _i < querys_1.length; _i++) {
            var query = querys_1[_i];
            result = result && this.IsEqualTo(source, query.propertyName, query.parameter);
        }
        return result;
    };
    return MountedCourseVm;
}());
exports.MountedCourseVm = MountedCourseVm;
