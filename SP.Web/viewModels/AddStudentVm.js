"use strict";
exports.__esModule = true;
exports.AddStudentVm = void 0;
var student_1 = require("../models/student");
var viewModelHelper_1 = require("../viewModelHelper");
var validator_1 = require("../validator");
var app_1 = require("../app");
var AddStudentVm = /** @class */ (function () {
    function AddStudentVm() {
        var _this = this;
        this.maritalStatus = ["Single", "Married", "Widoowed"];
        this.bindData = function () {
            _this.student = _this.viewModelHelper.addPropertyChangeNotification(_this.student);
        };
        this.save = function (rules) {
            var errors = _this.validator.addRules(rules).validate();
            _this.viewModelHelper.showErrors(errors);
            if (!_this.validator.hasErrors) {
                var options = {
                    method: "POST",
                    body: JSON.stringify(_this.student),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*"
                    }
                };
                ;
                fetch(app_1.App.baseUri + "/api/Student/AddStudent", options)
                    .then(function (res) { return res.json(); })
                    .then(function (res) {
                    ;
                    _this.student = new student_1.Student();
                    app_1.App.navigate("/app/#studentList");
                });
            }
        };
        this.student = new student_1.Student();
        this.validator = new validator_1.Validator();
        this.viewModelHelper = new viewModelHelper_1.ViewModelHelper();
    }
    AddStudentVm.prototype.stage1_rules = function () {
        return [
            new validator_1.Rules("IndexNumber", [new validator_1.Required(this.student.IndexNumber), new validator_1.MinLength(this.student.IndexNumber, 8)]),
            new validator_1.Rules("Othernames", [new validator_1.Required(this.student.Othernames), new validator_1.MinLength(this.student.Othernames, 2)]),
            new validator_1.Rules("ReferenceNumber", [new validator_1.Required(this.student.ReferenceNumber), new validator_1.MinLength(this.student.ReferenceNumber, 8)]),
            new validator_1.Rules("Surname", [new validator_1.Required(this.student.Surname), new validator_1.MinLength(this.student.Surname, 2)]),
            new validator_1.Rules("DateofBirth", [new validator_1.Required(this.student.DateofBirth)]),
            new validator_1.Rules("Gender", [new validator_1.Required(this.student.Gender)]),
            new validator_1.Rules("MaritalStatus", [new validator_1.Required(this.student.MaritalStatus)]),
        ];
    };
    AddStudentVm.prototype.stage2_rules = function () {
        return [
            new validator_1.Rules("Country", [new validator_1.Required(this.student.Country), new validator_1.MinLength(this.student.Country, 2)]),
            new validator_1.Rules("Region", [new validator_1.Required(this.student.Region), new validator_1.MinLength(this.student.Region, 2)]),
            new validator_1.Rules("HomeTown", [new validator_1.Required(this.student.HomeTown), new validator_1.MinLength(this.student.HomeTown, 2)]),
            new validator_1.Rules("Address1", [new validator_1.Required(this.student.Address1), new validator_1.MinLength(this.student.Address1, 3)]),
            new validator_1.Rules("Address2", [new validator_1.Required(this.student.Address1), new validator_1.MinLength(this.student.Address1, 3)]),
            new validator_1.Rules("Contact1", [new validator_1.Required(this.student.Contact1), new validator_1.MinLength(this.student.Contact1, 10)]),
            new validator_1.Rules("PersonalEmail", [new validator_1.Required(this.student.PersonalEmail), new validator_1.Email(this.student.PersonalEmail)]),
            new validator_1.Rules("UniversityEmail", [new validator_1.Email(this.student.UniversityEmail)]),
            new validator_1.Rules("ResidentialStatus", [new validator_1.Required(this.student.ResidentialStatus)]),
        ];
    };
    AddStudentVm.prototype.stage3_rules = function () {
        return [
            new validator_1.Rules("ProgramId", [new validator_1.Required(this.student.ProgramId), new validator_1.MinLength(this.student.ProgramId, 5)]),
            new validator_1.Rules("ProgramStatus", [new validator_1.Required(this.student.ProgramStatus), new validator_1.MinLength(this.student.ProgramStatus, 2)]),
            new validator_1.Rules("Level", [new validator_1.Required(this.student.Level), new validator_1.MinLength(this.student.Level, 3)]),
            new validator_1.Rules("StudentType", [new validator_1.Required(this.student.StudentType), new validator_1.MinLength(this.student.StudentType, 3)]),
            new validator_1.Rules("EnrolmentOption", [new validator_1.Required(this.student.EnrolmentOption), new validator_1.MinLength(this.student.EnrolmentOption, 4)]),
            new validator_1.Rules("DateOfEntry", [new validator_1.Required(this.student.DateOfEntry)]),
        ];
    };
    AddStudentVm.prototype.validate = function (route, rules) {
        var errors = this.validator.addRules(rules).validate();
        this.viewModelHelper.showErrors(errors);
        if (!this.validator.hasErrors) {
            app_1.App.navigate(route);
        }
    };
    return AddStudentVm;
}());
exports.AddStudentVm = AddStudentVm;
