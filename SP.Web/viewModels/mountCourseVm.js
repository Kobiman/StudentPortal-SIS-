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
exports.MountCourseViewModel = void 0;
var SelectedCourse_1 = require("../models/SelectedCourse");
var viewModelHelper_1 = require("../viewModelHelper");
var BindingList2_1 = require("../BindingList2");
var validator_1 = require("../validator");
var group_1 = require("../group");
var toast_1 = require("../toast/toast");
var app_1 = require("../app");
var MountCourseViewModel = /** @class */ (function () {
    function MountCourseViewModel(commonService) {
        var _this = this;
        this.commonService = commonService;
        this.mountedCourse = new SelectedCourse_1.SelectedCourse();
        this.enrollmentOptions = [];
        this.levels = [];
        this.lecturers = [];
        this.courses = [];
        this.selectedCourses = [];
        this.categories = [];
        this.programs = [];
        this.lookups = [];
        this.specializations = [];
        this.departments = [];
        this.muntedCourseList = [];
        this.getCourses = function (department) { return __awaiter(_this, void 0, void 0, function () {
            var d;
            return __generator(this, function (_a) {
                d = this.departments.find(function (x) { return x.name === department; });
                this.courses = d.courses;
                this.mountedCourse.department = department;
                this.setProgramsInDepartment(d.departmentId);
                return [2 /*return*/];
            });
        }); };
        this.setProgramsInDepartment = function (departmentId) {
            _this.programs = _this.commonService.programs.filter(function (x) { return x.departmentId === departmentId; });
        };
        this.addCourse = function (course) {
            var rules = _this.setupRules();
            var errors = _this.validator.addRules(rules).validate();
            _this.viewModelHelper.showErrors(errors);
            if (!_this.validator.hasErrors) {
                var selectedCourse_1 = {
                    enrollmentOption: _this.mountedCourse.enrollmentOption,
                    course: course,
                    courseCode: _this.courses.find(function (x) { return x.courseName === course; }).code,
                    credit: _this.courses.find(function (x) { return x.courseName === course; }).credit,
                    specialization: _this.mountedCourse.specialization,
                    category: _this.getSpecialization(_this.mountedCourse.level, _this.mountedCourse.specialization).type,
                    level: _this.mountedCourse.level,
                    scoring: _this.mountedCourse.scoring,
                    assignedTo: _this.mountedCourse.assignedTo,
                    department: _this.mountedCourse.department,
                    program: _this.mountedCourse.program
                };
                var c = _this.selectedCourses.find(function (x) {
                    return x.level === selectedCourse_1.level &&
                        x.enrollmentOption === selectedCourse_1.enrollmentOption &&
                        x.courseCode === selectedCourse_1.courseCode &&
                        x.course === selectedCourse_1.course;
                });
                if (!c) {
                    _this.selectedCourses.push(selectedCourse_1);
                    var groups_1 = group_1._.groupBy(_this.selectedCourses, function (course) {
                        return {
                            enrollmentOption: course.enrollmentOption,
                            category: course.category,
                            program: course.program,
                            level: course.level
                        };
                    });
                    var courses = Object.keys(groups_1).map(function (group) {
                        var j = JSON.parse(group);
                        var g = groups_1[group];
                        return {
                            enrollmentOption: j.enrollmentOption,
                            level: j.level,
                            program: j.program,
                            category: j.category,
                            mountedCourses: g
                        };
                    });
                    return courses;
                }
                else {
                    toast_1.Toast.warning("Course Already Exist");
                }
                return null;
            }
        };
        this.viewModelHelper = new viewModelHelper_1.ViewModelHelper();
        this.validator = new validator_1.Validator();
        //this.getMountedCourses();
    }
    MountCourseViewModel.prototype.getEnrollmentOption = function () {
        this.enrollmentOptions = this.commonService.lookups.filter(function (x) { return x.type === "ENROLLMENT OPTION"; });
        this.departments = this.commonService.departments;
        return this.enrollmentOptions;
    };
    MountCourseViewModel.prototype.getLecturers = function () {
        return this.commonService.lecturers;
    };
    MountCourseViewModel.prototype.getLevels = function () {
        return this.commonService.lookups.filter(function (x) { return x.type === "LEVEL"; });
    };
    MountCourseViewModel.prototype.getDepartments = function () {
        this.departments = this.commonService.departments;
        return this.departments;
    };
    MountCourseViewModel.prototype.getSpecializations = function (level) {
        var _this = this;
        var program = this.commonService.programs.find(function (x) { return x.name === _this.mountedCourse.program; });
        this.specializations = program.specializations.filter(function (x) { return x.level === level; });
    };
    MountCourseViewModel.prototype.getSpecialization = function (level, name) {
        var _this = this;
        var program = this.commonService.programs.find(function (x) { return x.name === _this.mountedCourse.program; });
        return program.specializations.find(function (x) { return x.level === level && x.name === name; });
    };
    MountCourseViewModel.prototype.setupRules = function () {
        return [
            new validator_1.Rules("enrollmentOption", [new validator_1.Required(this.mountedCourse.enrollmentOption)]),
            new validator_1.Rules("specialization", [new validator_1.Required(this.mountedCourse.specialization)]),
            new validator_1.Rules("level", [new validator_1.Required(this.mountedCourse.level)]),
            new validator_1.Rules("assignedTo", [new validator_1.Required(this.mountedCourse.assignedTo)]),
            new validator_1.Rules("department", [new validator_1.Required(this.mountedCourse.department)]),
            new validator_1.Rules("program", [new validator_1.Required(this.mountedCourse.program)]),
        ];
    };
    MountCourseViewModel.prototype.removeCourse = function (rowIndex) {
        this.selectedCourses.splice(rowIndex, 1);
    };
    MountCourseViewModel.prototype.bind = function () {
        this.mountedCourse = this.viewModelHelper.addPropertyChangeNotification(this.mountedCourse);
    };
    MountCourseViewModel.prototype.save = function () {
        var _this = this;
        if (this.selectedCourses.length === 0) {
        }
        else {
            var courses = this.selectedCourses.map(function (x) { return _this.mapCourses(x); });
            var j = JSON.stringify(courses);
            var options = {
                method: "POST",
                body: j,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*"
                }
            };
            fetch(app_1.App.baseUri + "/api/Department/MountCourse", options)
                .then(function (res) { return res.json(); })
                .then(function (res) {
                _this.selectedCourses = [];
                toast_1.Toast.success(res.message);
            });
        }
    };
    MountCourseViewModel.prototype.mapCourses = function (x) {
        var department = this.departments.find(function (d) { return d.name === x.department; });
        return new Object({
            EnrollmentOption: x.enrollmentOption,
            Category: x.category,
            Specialization: x.specialization,
            Level: x.level,
            Scoring: x.scoring,
            CourseName: x.course,
            CourseCode: x.courseCode,
            Credit: x.credit,
            ProgramId: this.commonService.programs.find(function (p) { return p.name === x.program; }).programId,
            Semester: department.semester,
            AssignedTo: x.assignedTo,
            AcademicYear: department.academicYear,
            AssignedBy: "hhj"
        });
    };
    MountCourseViewModel.prototype.bindList = function (id) {
        new BindingList2_1.BindingList2().bind(this, id);
    };
    return MountCourseViewModel;
}());
exports.MountCourseViewModel = MountCourseViewModel;
