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
import { Department } from "../models/department";
import { HttpService } from "../services/httpService";
import { BallLoader } from "../loader/ballLoader";
export class PermissionVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.department = new Department();
        this.userPermission = [];
        this.permissionTitles = [];
        this.pages = [];
        this.staffPermissionsList = [];
        this.staffId = "";
        this.users = [];
        this.http = new HttpService();
        this.getStaffDetails = (value) => __awaiter(this, void 0, void 0, function* () {
            this.userPermission = [];
            if (value.length > 0) {
                let user = this.users.find((x) => x.userId.toUpperCase().includes(value.toUpperCase()));
                //let dept = await this.http.get("Department/GetDepartment/" + lecturer.departmentId);
                const displayValue = {
                    //lecturerId: lecturer.lecturerId,
                    staffName: user.userName,
                    staffEmail: user.email,
                    //staffDepartment: dept.value.name,
                    staffId: user.userId,
                };
                this.userPermission.push(displayValue);
            }
        });
        this.getPermissions = (lecturerId) => __awaiter(this, void 0, void 0, function* () {
            this.staffPermissionsList = yield this.http.get("UserPermission/GetUserPermissionsByStaffId/" + lecturerId);
            this.department.lecturerId = lecturerId;
        });
        this.getPages = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.http.get(`Page/GetPages`);
                this.pages = data.value;
            }
            catch (error) { }
        });
        this.viewModelHelper = new ViewModelHelper();
        this.validator = new Validator();
    }
    getLecturer(value) {
        return this.users.filter((x) => x.staffId.toUpperCase().includes(value.toUpperCase()));
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            this.users = yield this.http.get("UserPermission/GetUsers");
            BallLoader.hide();
        });
    }
    save(grantedList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.staffId === "") {
                return yield this.http.post("UserPermission/AddUserPermissions", grantedList);
            }
            return yield this.http.post("UserPermission/UpdateUserPermissions", grantedList);
        });
    }
}
//# sourceMappingURL=permissionsVm.js.map