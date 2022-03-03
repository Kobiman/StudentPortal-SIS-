var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ViewModelHelper } from "../viewModelHelper";
import { HttpService } from "../services/httpService";
import { SelectedCourse } from "../models/SelectedCourse";
import { Command } from "../Command";
export class AuthorizeResultVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.mountedCourses = [];
        this.mountedCourse = new SelectedCourse();
        this.studentResults = [];
        this.courses = [];
        this.getPrograms = () => {
            return this.commonService.programs;
        };
        this.getProgramsByDepartment = (departmentId) => {
            this.mountedCourse.department = departmentId;
            this.programs = this.commonService.programs.filter((x) => x.departmentId === departmentId);
            this.programUpdatedCommand.execute();
        };
        this.getSemester = () => {
            return this.commonService.lookups.
                filter((x) => x.type === "SEMESTER");
        };
        this.getAllCourses = (value) => __awaiter(this, void 0, void 0, function* () {
            return this.allCourses.filter((x) => x.courseName.toUpperCase().includes(value.toUpperCase()));
        });
        this.getSchools = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield new HttpService().get("School/GetSchools");
                this.schools = data.value;
                return this.schools;
            }
            catch (error) { }
        });
        this.viewModelHelper = new ViewModelHelper();
        this.programUpdatedCommand = new Command();
    }
    getLevels() {
        return this.commonService.lookups.filter((x) => x.type === "LEVEL");
    }
    getAcademicYear() {
        return this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");
    }
    getDepartments() {
        this.departments = this.commonService.departments;
        return this.departments;
    }
}
//# sourceMappingURL=authorizeResultVm.js.map