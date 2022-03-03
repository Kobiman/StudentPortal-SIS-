var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BindingList2 } from "../BindingList2";
import { ViewModelHelper } from "../viewModelHelper";
import { BallLoader } from "../loader/ballLoader";
import { _ } from "../group";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
import { Toast } from "../toast/toast";
export class MountedCourseVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.programs = [];
        this.courseList = [];
        this.enrollmentOptions = [];
        this.categories = [];
        this.levels = [];
        this.scoring = [{ name: "Please Select Scoring" }, { name: "" }, { name: "True" }, { name: "False" }];
        this.filter = {};
        this.querys = [];
        this.getMountedCourses = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            BallLoader.show();
            let queies = [];
            if (this.request.academicYear) {
                queies.push({ propertyName: "AcademicYear", parameter: this.request.academicYear });
            }
            if (this.request.program) {
                queies.push({ propertyName: "ProgramOfStudy", parameter: this.request.program });
            }
            if (queies.length > 0) {
                let res = yield new HttpService().post("Department/GetMountedCourses", queies);
                this.courseList = res.value;
                for (let c of this.courseList) {
                    if (c.scoring === true) {
                        c.isScoring = "True";
                        c.assignedLecturer = (_a = this.getLecturers().find((x) => x.lecturerId === c.assignedTo)) === null || _a === void 0 ? void 0 : _a.name;
                    }
                    else if (c.scoring === false) {
                        c.isScoring = "False";
                    }
                }
                this.groupedCourses = this.groupCourses(this.courseList);
            }
            this.updateCourseRowCommand.execute();
            BallLoader.hide();
        });
        this.getPrograms = () => {
            this.programs = this.commonService.getProgramsByUserType();
        };
        this.getLookups = () => {
            this.semesters = this.commonService.lookups.filter((x) => x.type === "SEMESTER");
            this.semesters.unshift({ name: "" });
            this.semesters.unshift({ name: "Please Select Semester" });
            this.academicYears = this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");
            this.enrollmentOptions = this.commonService.lookups.filter((x) => x.type === "ENROLLMENT OPTION");
            this.enrollmentOptions.unshift({ name: "" });
            this.enrollmentOptions.unshift({ name: "Please Select Enrollment Option" });
            this.categories = this.commonService.lookups.filter((x) => x.type === "COURSE CATEGORY");
            this.categories.unshift({ name: "" });
            this.categories.unshift({ name: "Please Select Category" });
            this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
            this.levels.unshift({ name: "" });
            this.levels.unshift({ name: "Please Select Level" });
        };
        this.getMountedCourse = (courseCode) => {
            return this.courseList.find((x) => x.courseCode === courseCode);
        };
        this.viewModelHelper = new ViewModelHelper();
        this.updateCourseRowCommand = new Command();
        this.getLookups();
        this.getPrograms();
        this.request = {};
    }
    getLecturers() {
        return this.commonService.lecturers;
    }
    getLecturer(name) {
        return this.commonService.lecturers.filter((x) => x.name.toUpperCase().includes(name.toUpperCase()));
    }
    assignLecturer(courseCode, assignedTo) {
        const course = this.courseList.find((x) => x.courseCode === courseCode);
        course.assignedTo = assignedTo;
        this.groupedCourses = this.groupCourses(this.courseList);
        this.updateCourseRowCommand.execute();
    }
    groupCourses(arr) {
        let groups = _.groupBy(arr, function (course) {
            return {
                enrollmentOption: course.enrollmentOption,
                category: course.category,
                program: course.program,
                level: course.level,
                specialization: course.specialization,
            };
        });
        return Object.keys(groups).map(function (group) {
            let j = JSON.parse(group);
            let g = groups[group];
            return {
                enrollmentOption: j.enrollmentOption,
                level: j.level,
                program: j.program,
                category: j.category,
                specialization: j.specialization,
                mountedCourses: g,
            };
        });
    }
    assignCourse(mountedCourseId, lecturerId) {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            let c = this.courseList.find((x) => x.mountedCourseId === mountedCourseId);
            let request = {
                mountedCourseId: mountedCourseId,
                assignedTo: lecturerId,
                academicYear: c.academicYear,
                semester: c.semester,
                enrolmentOption: c.enrollmentOption,
            };
            let res = yield new HttpService().post("Department/AssignCourse", request);
            if (res.isSucessful) {
                Toast.success(res.message);
            }
            else {
                Toast.error(res.message);
            }
            BallLoader.hide();
        });
    }
    deleteCourse(c) {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            let programId = this.programs.find((x) => x.name === c.programOfStudy).programId;
            let res = yield new HttpService().get(`Department/DeleteMountedCourse/${programId}/${c.mountedCourseId}`);
            if (res.isSucessful) {
                Toast.success(res.message);
            }
            else {
                Toast.error(res.message);
            }
            BallLoader.hide();
        });
    }
    bind() {
        this.request = this.viewModelHelper.addPropertyChangeNotification(this.request);
    }
    bindList(id) {
        new BindingList2().bind(this, id);
    }
    search() {
        this.courses = this.courseList.filter((a) => this.executeQuery(a, this.querys));
        this.groupedCourses = this.groupCourses(this.courses);
        this.updateCourseRowCommand.execute();
    }
    IsEqualTo(source, propertyName, parameter) {
        return source[propertyName] === parameter;
    }
    buidQuery(propertyName, parameter) {
        var item = this.querys.find((x) => x.propertyName === propertyName);
        if (item != null) {
            var index = this.querys.indexOf(item);
            this.querys.splice(index, 1);
        }
        if (parameter != "") {
            this.querys.push({ propertyName: propertyName, parameter: parameter.toUpperCase() });
        }
        this.search();
    }
    executeQuery(source, querys) {
        var result = true;
        for (var query of querys) {
            result = result && this.IsEqualTo(source, query.propertyName, query.parameter);
        }
        return result;
    }
}
//# sourceMappingURL=mountedCourseVm.js.map