var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Toast } from "../toast/toast";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
import { App } from "../app";
import { BallLoader } from "../loader/ballLoader";
export class RegisterCourseVm {
    constructor(_courseRegistrationService, commonService) {
        this._courseRegistrationService = _courseRegistrationService;
        this.commonService = commonService;
        this.selectedCourses = [];
        this.specializationId = this._courseRegistrationService.student.specialization;
        this.selectedCourseCommand = new Command();
        this.courseRegisteredCommand = new Command();
        this.setTotalCreditCommand = new Command();
        this.specializations = [];
        this.trailList = [];
        this.httpService = new HttpService();
        this.canRegister = false;
        this.addCourse = (c) => {
            let selectedCourse = {
                courseCode: c.courseCode,
                credit: c.credit,
                studentId: this._courseRegistrationService.student.studentId,
                mountedCourseId: c.mountedCourseId,
                indexNumber: this._courseRegistrationService.student.indexNumber,
                programId: this._courseRegistrationService.student.programId,
                semester: c.semester,
                academicYear: c.academicYear,
                approved: false,
            };
            this.selectedCourses.push(selectedCourse);
            this.setTotalCreditCommand.execute();
        };
        this.removeCourse = (c) => {
            let selectedCourse = this.selectedCourses.find((x) => x.courseCode === c.courseCode);
            if (selectedCourse) {
                let index = this.selectedCourses.indexOf(selectedCourse);
                this.selectedCourses.splice(index, 1);
                this.setTotalCreditCommand.execute();
            }
        };
        this.register = () => __awaiter(this, void 0, void 0, function* () {
            if (yield this.getControlStatus()) {
                if (this._courseRegistrationService.hasRegisterd) {
                    yield this.update();
                }
                else {
                    yield this.save();
                }
            }
            else {
                Toast.warning("Registration is closed");
            }
        });
        this.save = () => __awaiter(this, void 0, void 0, function* () {
            if (this.selectedCourses.length === 0) {
                Toast.warning("No course selected");
            }
            else if (!this.canRegister) {
                Toast.warning("You can't register because you have not fulfilled minimum fees requirement");
            }
            else {
                let courses = this.selectedCourses.map((x) => new Object({
                    studentId: x.studentId,
                    programId: x.programId,
                    mountedCourseId: x.mountedCourseId,
                    indexNumber: x.indexNumber,
                    semester: x.semester.toUpperCase(),
                    academicYear: x.academicYear,
                    approved: x.approved,
                }));
                let totalCredit = this.selectedCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0);
                let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
                let maxCreditLimit = program.creditLimits.find((x) => x.level === this._courseRegistrationService.student.level).maxCredit;
                if (totalCredit > parseInt(maxCreditLimit)) {
                    Toast.warning("Maximum credit limit exceeded");
                }
                else {
                    const result = yield new HttpService().post("Department/RegisterCourse", courses);
                    if (result.isSucessful) {
                        this.selectedCourses = [];
                        this.courseList = [];
                        Toast.success(result.message);
                        this.courseRegisteredCommand.execute();
                        yield this._courseRegistrationService.getSchoolByProgram(this._courseRegistrationService.student.programId);
                        App.navigate("/app/#registeredCourses");
                    }
                }
            }
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            if (this.selectedCourses.length === 0) {
                Toast.warning("No course selected");
            }
            else {
                let courses = this.selectedCourses.map((x) => new Object({
                    studentId: x.studentId,
                    programId: x.programId,
                    mountedCourseId: x.mountedCourseId,
                    indexNumber: x.indexNumber,
                    semester: x.semester.toUpperCase(),
                    academicYear: x.academicYear,
                    //registeredCourseId: x.registeredCourseId,
                    approved: x.approved,
                }));
                let totalCredit = this.selectedCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0);
                let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
                let maxCreditLimit = program.creditLimits.find((x) => x.level === this._courseRegistrationService.student.level).maxCredit;
                if (totalCredit > parseInt(maxCreditLimit)) {
                    Toast.warning("Maximum credit limit exceeded");
                }
                else {
                    const result = yield this.httpService.post("Department/UpdateRegisterCourse", courses);
                    if (result.isSucessful) {
                        this.selectedCourses = [];
                        this.courseList = [];
                        Toast.success(result.message);
                        this.courseRegisteredCommand.execute();
                        yield this._courseRegistrationService.getSchoolByProgram(this._courseRegistrationService.student.programId);
                        App.navigate("/app/#registeredCourses");
                    }
                }
            }
        });
    }
    getMountedCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            this.courseList = this._courseRegistrationService.mountedCourses.filter((x) => x.specialization === this._courseRegistrationService.student.specialization);
            this.selectedCourses = [];
            if (this.trailList.length > 0) {
                this.trailList = this._courseRegistrationService.trailCourses;
            }
            for (var c of this.courseList) {
                c.lecturer = this.commonService.lecturers.find((x) => x.lecturerId === c.assignedTo).name;
                if (c.category !== "ELECTIVE") {
                    let selectedCourse = {
                        courseCode: c.courseCode,
                        credit: c.credit,
                        studentId: this._courseRegistrationService.student.studentId,
                        mountedCourseId: c.mountedCourseId,
                        indexNumber: this._courseRegistrationService.student.indexNumber,
                        programId: this._courseRegistrationService.student.programId,
                        semester: c.semester.toUpperCase(),
                        academicYear: c.academicYear,
                        approved: false,
                    };
                    this.selectedCourses.push(selectedCourse);
                }
            }
            for (var c of this.trailList) {
                c.lecturer = this.commonService.lecturers.find((x) => x.lecturerId === c.assignedTo).name;
            }
            //this._courseRegistrationService.student.specialization = specializationId;
            this.selectedCourseCommand.execute();
            // await new HttpService().get(
            //   `Student/UpdateSpecialization/${this._courseRegistrationService.student.indexNumber}/${this._courseRegistrationService.student.specialization}`
            // );
        });
    }
    getSpecializations() {
        let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
        return program.specializations;
    }
    getFeeStatement() {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            let url = `Student/CanRegisterStudent/?indexNumber=${this._courseRegistrationService.student.indexNumber}&academicYear=${this.selectedCourses[0].academicYear}`;
            let data = yield this.httpService.get(url);
            this.canRegister = data.value;
            BallLoader.hide();
        });
    }
    getControlStatus() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let program = this.commonService.programs.find((x) => x.programId === this._courseRegistrationService.student.programId);
            let school = this.commonService.schools.find((x) => x.schoolId === program.schoolId);
            BallLoader.show();
            let res = yield this.httpService.get(`StatusControl/GetStatusControl/?academicYear=${school.academicYear}&programId=${program.programId}`);
            if (res.isSucessful) {
                BallLoader.hide();
                return (_a = res.value.active) !== null && _a !== void 0 ? _a : false;
            }
            BallLoader.hide();
            return false;
        });
    }
}
//# sourceMappingURL=registerCourseVm.js.map