var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { App } from "../app";
import { HttpService } from "./httpService";
export class CourseRegistrationService {
    constructor() {
        this.registeredCourses = [];
        this.hasRegisterd = false;
        this.mountedCourses = [];
        this.trailCourses = [];
        this.getStudent = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield new HttpService().get(`Student/GetStudent/${App.user.profile.userId}`);
                this.student = data.value;
                yield this.getSchoolByProgram(this.student.programId);
                return this.student;
            }
            catch (error) { }
        });
        this.getSchoolByProgram = (program) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield new HttpService().get("School/GetSchoolByProgram/" + program);
                this.school = data.value;
                yield this.getRegisteredCourses(this.school.academicYear, this.school.semester, this.student.indexNumber);
                yield this.getMountedCourses(this.school.academicYear, this.school.semester, this.student.programId, this.student.level, this.student.enrollmentOption);
                yield this.getTrailCourses(this.school.semester, this.student.indexNumber, this.school.academicYear);
            }
            catch (error) { }
        });
        this.getRegisteredCourses = (academicYear, semester, indexNumber) => __awaiter(this, void 0, void 0, function* () {
            let request = { academicYear: academicYear, semester: semester, indexNumber: indexNumber };
            const res = yield new HttpService().post("Department/GetRegisteredCourses", request);
            if (res.isSucessful) {
                this.registeredCourses = res.value;
                this.hasRegisterd = true;
                //new RegisteredCoursesView(new RegisteredCoursesVm(this)).render(this.elementId);
                //new RegisterCourseView(new RegisterCourseVm(this)).render(this.elementId);
            }
        });
        this.getMountedCourses = (academicYear, semester, program, level, erollmentOption) => __awaiter(this, void 0, void 0, function* () {
            let request = { academicYear: academicYear, semester: semester, program: program, level: level, erollmentOption: erollmentOption };
            const res = yield new HttpService().post("Department/GetMountedCoursesForRegistration", request);
            this.mountedCourses = res.value;
        });
        this.getTrailCourses = (semester, indexNumber, academicYear) => __awaiter(this, void 0, void 0, function* () {
            let request = { semester: semester, indexNumber: indexNumber, academicYear: academicYear };
            const res = yield new HttpService().post("Department/GetTrailList", request);
            if (res.isSucessful) {
                this.trailCourses = res.value;
            }
        });
    }
    setElementId(elementId) {
        this.elementId = elementId;
    }
}
//# sourceMappingURL=courseRegistrationService.js.map