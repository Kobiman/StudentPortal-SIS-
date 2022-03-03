export class RegisteredCoursesVm {
    constructor(_courseRegistrationService, commonService) {
        this._courseRegistrationService = _courseRegistrationService;
        this.commonService = commonService;
        this.registeredCourses = [];
        this.totalCredit = 0;
    }
    getRegisteredCourses() {
        var _a;
        // let r = new RegisteredCoursesRow();
        // this._mainvm.registeredCourses.map((x) => r.render(x));
        debugger;
        this.totalCredit = this._courseRegistrationService.registeredCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0);
        return (_a = this._courseRegistrationService.registeredCourses) !== null && _a !== void 0 ? _a : [];
    }
}
//# sourceMappingURL=registeredCoursesVm.js.map