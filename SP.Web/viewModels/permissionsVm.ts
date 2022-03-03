import { Validator } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { CommonService } from "../services/commonService";
import { Department } from "../models/department";
import { HttpService } from "../services/httpService";
import { BallLoader } from "../loader/ballLoader";

export class PermissionVm {
  validator: Validator;
  viewModelHelper: ViewModelHelper;
  department: Department = new Department();
  id: any;
  userPermission: any[] = [];
  permissionTitles: any[] = [];
  pages: any[] = [];
  staffPermissionsList = [];
  staffId = "";
  users = [];
  http = new HttpService();

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
  }

  getLecturer(value) {
    return this.users.filter((x) => x.staffId.toUpperCase().includes(value.toUpperCase()));
  }

  async getUsers() {
    BallLoader.show();
    this.users = await this.http.get("UserPermission/GetUsers");
    BallLoader.hide();
  }

  getStaffDetails = async (value) => {
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
  };

  getPermissions = async (lecturerId) => {
    this.staffPermissionsList = await this.http.get("UserPermission/GetUserPermissionsByStaffId/" + lecturerId);
    this.department.lecturerId = lecturerId;
  };

  getPages = async () => {
    try {
      const data = await this.http.get(`Page/GetPages`);
      this.pages = data.value;
    } catch (error) {}
  };

  async save(grantedList: any[]) {
    if (this.staffId === "") {
      return await this.http.post("UserPermission/AddUserPermissions", grantedList);
    }
    return await this.http.post("UserPermission/UpdateUserPermissions", grantedList);
  }
}
