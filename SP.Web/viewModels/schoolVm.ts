import { School } from "../models/school";
import { Validator, Rules, Required, MinLength } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { Institution } from "../models/institution";
import { BindingList2 } from "../BindingList2";
import { Lookup } from "../models/lookup";
import { CommonService } from "../services/commonService";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";

export class SchoolVm {
  validator: Validator;
  viewModelHelper: ViewModelHelper;
  school: School = new School();
  edittableSchool: School = new School();
  institutionList: Institution[] = [];
  institutions = [];
  singleSchool: any[] = [];
  schools: School[] = [];
  lookups: Lookup[] = [];
  semesters: any[] = [];
  academicYears: Lookup[] = [];
  schoolName: string;
  schoolID: string;
  departments: any[] = [];
  students: any[] = [];
  programs: any[] = [];
  departmentLength: any[] = [];
  departmentPrograms: any[] = [];
  lecturerName: string;

  schoolUpdatedCommand: Command = new Command();

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
    this.getInstitutions();
    this.getLookups();
    this.getDepartments();
    this.getStudents();
    this.getPrograms();
  }

  setupRules() {
    return [
      new Rules("name", [new Required(this.school.name), new MinLength(this.school.name, 2)]),
      new Rules("academicYear", [new Required(this.school.academicYear)]),
      new Rules("semester", [new Required(this.school.semester)]),
      new Rules("institutionName", [new Required(this.school.institutionName)]),
    ];
  }

  async save() {
    let rules = this.setupRules();
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      const institution = this.institutionList.find((x) => x.name === this.school.institutionName);
      this.school.institutionId = institution.institutionId;
      const result = await new HttpService().post("School/AddSchool", this.school);
      this.school = new School();
      this.edittableSchool = new School();
      //this.bind();
      this.getSchools();
      Toast.success(result.message);
      BallLoader.hide();
    }
  }

  getSchools = async () => {
    try {
      let school = this.commonService.schools;
      this.schools = school as School[];
      debugger;
      new BindingList2().bind(this, "schools");
    } catch (error) {}
  };

  getDepartments = async () => {
    try {
      const data = await new HttpService().get("Department/GetDepartments");
      this.departments = data.value;
      this.bindList("departments");
    } catch (error) {}
  };

  getLecturers() {
    return this.commonService.lecturers;
  }

  getLecturer(value) {
    return this.commonService.lecturers.filter((x) => x.name.toUpperCase().includes(value.toUpperCase()));
  }

  getStudents = async () => {
    try {
      BallLoader.show();
      this.students = this.commonService.students;
    } catch (error) {
      console.log(error);
    }
  };

  getPrograms = async () => {
    try {
      BallLoader.show();
      const data = await new HttpService().get("Program/GetPrograms");
      this.programs = data.value;
      BallLoader.hide();
    } catch (error) {}
  };

  getSchoolEditDetails = () => {
    this.school = this.schools.find((x) => x.name === this.schoolName);
    let lecturer = this.commonService.lecturers.find((x) => x.lecturerId === this.school.lecturerId);
    if (lecturer) {
      this.lecturerName = lecturer.name;
    } else {
      this.lecturerName = "";
    }
  };

  getInstitutions = async () => {
    try {
      const data = await new HttpService().get("Institution/GetInstitutions");
      this.institutionList = data.value as Institution[];
      this.institutions = this.institutionList.map((x) => ({ institutionNane: x.name, code: x.code }));
      this.institutions.unshift({ institutionNane: "Please select institution", code: "" });
      new BindingList2().bind(this, "institutions");
    } catch (error) {}
  };

  getLookups = async () => {
    this.semesters = this.commonService.lookups.filter((x) => x.type === "SEMESTER");
    this.academicYears = this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");
  };

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }

  bind() {
    this.school = this.viewModelHelper.addPropertyChangeNotification(this.school);
  }

  async update() {
    BallLoader.show();
    let sch = this.schools.find((x) => x.schoolId === this.school.schoolId);
    sch.Name = this.school.Name;
    sch.lecturerId = this.school.lecturerId;
    sch.academicYear = this.school.academicYear;
    sch.semester = this.school.semester;
    this.schoolUpdatedCommand.execute();
    const res = await new HttpService().post("School/UpdateSchool", this.school);
    if (res.isSucessful) {
      Toast.success(res.message);
    } else {
      Toast.error(res.message);
    }
    BallLoader.hide();
  }

  EnableTextBox() {
    document.getElementById("btnSave").style.visibility = "visible";
    let input = document.querySelectorAll("[input]");
    input.forEach(function (item) {
      item.toggleAttribute("disabled");
    });
  }

  DisableTextBox() {
    let input = document.querySelectorAll("[input]");
    input.forEach(function (item) {
      item.toggleAttribute("disabled");
    });
  }

  fillTable() {
    let rows = [];
    this.schoolID = this.schools.find((x) => x.name === this.schoolName).schoolId;
    this.departmentLength = this.departments.filter((x) => x.schoolId === this.schoolID);
    for (let i = 0; i < this.departmentLength.length; i++) {
      let rowdata = [];
      rowdata.push(this.departmentLength[i].name);
      this.departmentPrograms = this.programs.filter((x) => x.departmentId === this.departmentLength[i].departmentId);
      var totalStudents = [];
      for (let i = 0; i < this.departmentPrograms.length; i++) {
        var departmentStudents = this.students.filter((x) => x.programId === this.departmentPrograms[i].programId);
        totalStudents.push(...departmentStudents);
      }
      rowdata.push(totalStudents.length);
      let male = totalStudents.filter((x) => x.gender === "M").length;
      rowdata.push(male);
      let female = totalStudents.filter((x) => x.gender === "F").length;
      rowdata.push(female);
      rows.push(rowdata);
    }

    return rows;
  }

  download_csv(department) {
    let download = [];
    var totalStudents = [];
    debugger;
    let deprtment = this.departments.find((x) => x.name === department).departmentId;
    this.departmentPrograms = this.programs.filter((x) => x.departmentId === deprtment);
    for (var k = 0; k < this.departmentPrograms.length; k++) {
      var studentList = this.students.filter((x) => x.programId === this.departmentPrograms[k].programId);
      totalStudents.push(...studentList);
    }
    for (var i = 0; i < totalStudents.length; i++) {
      let data = [];
      data.push(++i);
      data.push(totalStudents[--i].indexNumber);
      let name = `${totalStudents[i].surname} ${totalStudents[i].othernames}`;
      data.push(name);
      data.push(totalStudents[i].gender);
      let program = this.departmentPrograms.find((x) => x.programId === totalStudents[i].programId).name;
      data.push(program);
      data.push(department);
      data.push(totalStudents[i].level);
      data.push(totalStudents[i].enrollmentOption);
      download.push(data);
    }

    var csv = "No.,IndexNumber,Name, Gender, Program, Department, Level,Enrolment Type\n";
    download.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${department}.csv`;
    hiddenElement.click();
  }
}
