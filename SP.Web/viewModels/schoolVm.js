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
exports.SchoolVm = void 0;
var school_1 = require("../models/school");
var validator_1 = require("../validator");
var viewModelHelper_1 = require("../viewModelHelper");
var BindingList2_1 = require("../BindingList2");
var ballLoader_1 = require("../loader/ballLoader");
var toast_1 = require("../toast/toast");
var app_1 = require("../app");
var SchoolVm = /** @class */ (function () {
    function SchoolVm(commonService) {
        var _this = this;
        this.commonService = commonService;
        this.school = new school_1.School();
        this.institutionList = [];
        this.institutions = [];
        this.schools = [];
        this.lookups = [];
        this.semesters = [];
        this.academicYears = [];
        this.getSchools = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(app_1.App.baseUri + "/api/School/GetSchools")];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        this.schools = data.value;
                        new BindingList2_1.BindingList2().bind(this, "schools");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getInstitutions = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(app_1.App.baseUri + "/api/Institution/GetInstitutions")];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        this.institutionList = data.value;
                        this.institutions = this.institutionList.map(function (x) { return ({ institutionNane: x.name, code: x.code }); });
                        this.institutions.unshift({ institutionNane: "Please select institution", code: "" });
                        new BindingList2_1.BindingList2().bind(this, "institutions");
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getLookups = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.semesters = this.commonService.lookups.filter(function (x) { return x.type === "SEMESTER"; });
                this.academicYears = this.commonService.lookups.filter(function (x) { return x.type === "ACADEMIC YEAR"; });
                return [2 /*return*/];
            });
        }); };
        this.viewModelHelper = new viewModelHelper_1.ViewModelHelper();
        this.validator = new validator_1.Validator();
        this.getInstitutions();
        this.getSchools();
        this.getLookups();
    }
    SchoolVm.prototype.setupRules = function () {
        return [
            new validator_1.Rules("name", [new validator_1.Required(this.school.name), new validator_1.MinLength(this.school.name, 2)]),
            new validator_1.Rules("academicYear", [new validator_1.Required(this.school.academicYear)]),
            new validator_1.Rules("semester", [new validator_1.Required(this.school.semester)]),
            new validator_1.Rules("institutionName", [new validator_1.Required(this.school.institutionName)]),
        ];
    };
    SchoolVm.prototype.save = function () {
        var _this = this;
        var rules = this.setupRules();
        var errors = this.validator.addRules(rules).validate();
        this.viewModelHelper.showErrors(errors);
        if (!this.validator.hasErrors) {
            var institution = this.institutionList.find(function (x) { return x.name === _this.school.institutionName; });
            this.school.institutionId = institution.institutionId;
            var options = {
                method: "POST",
                body: JSON.stringify(this.school),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*"
                }
            };
            ballLoader_1.BallLoader.show();
            fetch(app_1.App.baseUri + "/api/School/AddSchool", options)
                .then(function (res) { return res.json(); })
                .then(function (res) {
                _this.school = new school_1.School();
                _this.bind();
                _this.getSchools();
                toast_1.Toast.success(res.message);
                ballLoader_1.BallLoader.hide();
            });
        }
    };
    SchoolVm.prototype.bindList = function (id) {
        new BindingList2_1.BindingList2().bind(this, id);
    };
    SchoolVm.prototype.bind = function () {
        this.school = this.viewModelHelper.addPropertyChangeNotification(this.school);
    };
    return SchoolVm;
}());
exports.SchoolVm = SchoolVm;
