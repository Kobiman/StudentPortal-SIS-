import { Validator, Rules, Required, Email } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { Department } from "../models/department";
import { Lecturer, LecturerUpdate } from "../models/lecturer";
import { BindingList2 } from "../BindingList2";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { App } from "../app";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
import { CommonService } from "../services/commonService";

export class LecturerVm {
  validator: Validator;
  viewModelHelper: ViewModelHelper;
  lecturerChangedCommand: Command;
  lecturer: Lecturer = new Lecturer();
  departments: Department[] = [];
  lecturers: LecturerUpdate[] = [];
  querys: any = [];
  results: any[] = [];
  staffId: string;
  lectStatus: boolean;

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
    this.lecturerChangedCommand = new Command();
  }

  getDepartments = async () => {
    try {
      BallLoader.show();
      this.departments = this.commonService.departments;
      new BindingList2().bindCollection(this);
      BallLoader.hide();
      this.departments.unshift({
        departmentId: "",
        name: "Please Select Department",
        code: "",
        schoolId: "",
        schoolName: "",
        lecturerId: "",
      });
      this.bindList("departments");
    } catch (error) {}
  };

  getLecturers = async () => {
    BallLoader.show();
    const data = this.commonService.lecturers;
    this.results = data;
    this.lecturers = data;
    this.lecturers.forEach((lecture) => {
      if (lecture.departmentId.length > 0) {
        (lecture as any).departmentName = this.commonService.departments.find(
          (x) => x.departmentId === lecture.departmentId
        ).name;
      }
    });
    BallLoader.hide();
  };

  setupRules() {
    return [
      new Rules("name", [new Required(this.lecturer.name)]),
      new Rules("department", [new Required(this.lecturer.department)]),
      new Rules("staffId", [new Required(this.lecturer.staffId)]),
      new Rules("telephone", [new Required(this.lecturer.telephone)]),
      new Rules("email", [
        new Required(this.lecturer.email),
        new Email(this.lecturer.email),
      ]),
      new Rules("address", [new Required(this.lecturer.address)]),
    ];
  }

  async save() {
    let rules = this.setupRules();
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      let department = this.departments.find(
        (x) => x.name === this.lecturer.department
      );
      this.lecturer.departmentId = department.departmentId;
      BallLoader.show();
      const res = await new HttpService().post(
        "Lecturer/AddLecturer",
        this.lecturer
      );
      this.lecturer = new Lecturer();
      this.bind();
      await this.getLecturers();
      Toast.success(res.message);
      BallLoader.hide();
    }
  }

  async update() {
    // let rules = this.setupRules();
    // var errors = this.validator.addRules(rules).validate();
    // this.viewModelHelper.showErrors(errors);
    // if (!this.validator.hasErrors) {

    let lecturer = this.lecturers.find((x) => x.staffId === this.staffId);
    let request = {
      lecturerId: lecturer.lecturerId,
      staffId: lecturer.staffId,
      name: lecturer.name,
      telephone: lecturer.telephone,
      email: lecturer.email,
      address: lecturer.address,
      departmentId: lecturer.departmentId,
      status: this.lectStatus,
    };
    this.lecturer.status = this.lectStatus;
    BallLoader.show();
    const res = await new HttpService().post(
      "Lecturer/UpdateLecturer",
      request
    );
    this.lecturer = new Lecturer();
    await this.getLecturers();
    Toast.success(res.message);
    BallLoader.hide();
    // }
  }

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }

  bind() {
    this.lecturer = this.viewModelHelper.addPropertyChangeNotification(
      this.lecturer
    );
  }

  search() {
    this.results = this.lecturers.filter((a) =>
      this.executeQuery(a, this.querys)
    );
    new BindingList2().bindCollection(this.results);
    //document.getElementsByName("countLecturer()")
    this.lecturerChangedCommand.execute();
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
      this.querys.push({ propertyName: propertyName, parameter: parameter });
    }
    this.search();
  }

  executeQuery(source, querys) {
    var result = true;
    for (var query of querys) {
      result =
        result && this.IsEqualTo(source, query.propertyName, query.parameter);
    }
    return result;
  }

  download_csv() {
    let download = [];

    for (var i = 1; i < this.results.length; i++) {
      let data = [];
      data.push(i);
      data.push(this.results[i].name);
      data.push(this.results[i].staffId);
      let department = this.departments.find(
        (x) => x.departmentId === this.results[i].departmentId
      ).name;
      data.push(department);
      data.push(this.results[i].telephone);
      data.push(this.results[i].email);
      data.push(this.results[i].address);
      download.push(data);
    }

    var csv = "No.,Name, Staff ID, Department,Telephone,Email,Address Type\n";
    download.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `lecturers.csv`;
    hiddenElement.click();
  }
}
