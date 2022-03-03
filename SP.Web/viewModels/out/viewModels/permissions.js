var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Validator } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { Command } from "../Command";
import { Department } from "../models/department";
import { HttpService } from "../services/httpService";
export class PermissionVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.department = new Department();
        this.permissionList = [
            { title: "Add Student", route: "/app/#addStudent/stage1" },
            { title: "Student List", route: "/app/#studentList" },
            { title: "Check Results", route: "/app/#studentResults" },
            { title: "Mount Course", route: "/app/#mountCourse" },
            { title: "Mounted Courses", route: "/app/#mountedCourses" },
            { title: "Register Courses", route: "/app/#courseRegistration" },
            { title: "Institution", route: "/app/#institution" },
            { title: "School", route: "/app/#school" },
            { title: "Department", route: "/app/#department" },
        ];
        this.viewModelHelper = new ViewModelHelper();
        this.validator = new Validator();
        this.command = new Command();
    }
    getLecturer(value) {
        return this.commonService.lecturers.filter((x) => x.name.toUpperCase().includes(value.toUpperCase()));
    }
    save(grantedList) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield new HttpService().post("UserPermission/AddUserPermissions", grantedList);
            return res;
        });
    }
}
//# sourceMappingURL=permissions.js.map