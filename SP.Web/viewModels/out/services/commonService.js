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
export class CommonService {
    // permissions = [
    //   { title: "Add Student", route: "/app/#addStudent/stage1" },
    //   { title: "Student List", route: "/app/#studentList" },
    //   { title: "Check Results", route: "/app/#studentResults" },
    //   { title: "Mount Course", route: "/app/#mountCourse" },
    //   { title: "Mounted Courses", route: "/app/#mountedCourses" },
    //   { title: "Register Courses", route: "/app/#courseRegistration" },
    //   { title: "Institution", route: "/app/#institution" },
    //   { title: "School", route: "/app/#school" },
    //   { title: "Department", route: "/app/#department" },
    //   { route: "/app/#permission", title: "Permissions" },
    //   { route: "/app/#lecturerProfile", title: "My Profile" },
    // ];
    constructor() {
        this.lookups = [];
        this.lecturers = [];
        this.departments = [];
        this.programs = [];
        this.schools = [];
        this.getLookups = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.httpService.get(`Lookup/GetLookups`);
                this.lookups = data.value;
            }
            catch (error) { }
        });
        this.getLecturers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.httpService.get(`Lecturer/GetLecturers`);
                this.lecturers = data.value;
            }
            catch (error) { }
        });
        this.getDepartmentsWithCourses = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.httpService.get(`Department/GetDepartmentsWithCourses`);
                this.departments = data.value;
            }
            catch (error) { }
        });
        this.getPrograms = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.httpService.get(`Program/GetPrograms`);
                this.programs = data.value;
            }
            catch (error) { }
        });
        this.getSchools = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.httpService.get(`School/GetSchools`);
                this.schools = data.value;
            }
            catch (error) { }
        });
        this.getStudents = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.httpService.get("Student/GetStudents");
                this.students = data.value;
            }
            catch (error) { }
        });
        this.httpService = new HttpService();
    }
    getProgramsByUserType() {
        let lecturer = this.lecturers.find((x) => x.staffId === App.user.profile.userId);
        if (App.user.profile.userType === "Lecturer") {
            return this.programs.filter((x) => x.departmentId === lecturer.departmentId);
        }
        else if (App.user.profile.userType === "Hod") {
            return this.programs.filter((x) => x.departmentId === lecturer.departmentId);
        }
        else if (App.user.profile.userType === "Deean") {
            return this.programs.filter((x) => x.departmentId === lecturer.departmentId);
        }
        return this.programs;
    }
    getDepartmentsWithCoursesUserType() {
        let lecturer = this.lecturers.find((x) => x.staffId === App.user.profile.userId);
        if (App.user.profile.userType === "Lecturer") {
            return this.departments.filter((x) => x.departmentId === lecturer.departmentId);
        }
        else if (App.user.profile.userType === "Hod") {
            return this.departments.filter((x) => x.departmentId === lecturer.departmentId);
        }
        else if (App.user.profile.userType === "Deean") {
            return this.departments.filter((x) => x.departmentId === lecturer.departmentId);
        }
        return this.departments;
    }
    culculateGPA(results) {
        return (results.map((x) => x.credit * x.gradePoint).reduce((a, b) => a + b, 0) /
            results.map((x) => x.credit).reduce((a, b) => a + b, 0)).toPrecision(3);
    }
    culculateCGPA(results) {
        return this.culculateGPA(results);
    }
}
//# sourceMappingURL=commonService.js.map