"use strict";
exports.__esModule = true;
exports.UploadResultViewModel = void 0;
var lookupVm_1 = require("./lookupVm");
var viewModelHelper_1 = require("../viewModelHelper");
var UploadResultViewModel = /** @class */ (function () {
    function UploadResultViewModel(commonService) {
        this.commonService = commonService;
        this.viewModelHelper = new viewModelHelper_1.ViewModelHelper();
        this.lookupVm = new lookupVm_1.LookupVm();
    }
    UploadResultViewModel.prototype.getDepartments = function () {
        this.departments = this.commonService.departments;
        return this.departments;
    };
    UploadResultViewModel.prototype.getCourses = function (department) {
        var d = this.departments.find(function (x) { return x.name === department; });
        this.courses = d.courses;
    };
    ;
    UploadResultViewModel.prototype.getAcademicYears = function () {
        return this.lookupVm.lookups.filter(function (el) { return el.name === "ACADEMIC YEAR"; });
    };
    //<script>
    UploadResultViewModel.prototype.download_csv = function (data) {
        if (data === void 0) { data = []; }
        var csv = 'Name,Level Course, Class score, Exams score\n';
        data.forEach(function (row) {
            csv += row.join(',');
            csv += "\n";
        });
        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'Upload result template.csv';
        hiddenElement.click();
    };
    return UploadResultViewModel;
}());
exports.UploadResultViewModel = UploadResultViewModel;
