import { Department } from "../models/department";
import { Validator, Rules, Required, MinLength } from "../validator";
import { ViewModelHelper } from "../viewModelHelper";
import { School } from "../models/school";
import { BindingList2 } from "../BindingList2";
import { Toast } from "../toast/toast";
import { BallLoader } from "../loader/ballLoader";
import { HttpService } from "../services/httpService";
import { App } from "../app";
import { CommonService } from "../services/commonService";
import { Command } from "../Command";

export class DepartmentVm {
  validator: Validator;
  viewModelHelper: ViewModelHelper;
  department: Department = new Department();
  departments: Department[] = [];
  schools: School[] = [];
  deptCode: any;
  school: any;
  program: any[] = [];
  programs: any[] = [];
  command: any;
  students: any[] = [];
  lecturerName: string;
  departmentUpdatedCommand:Command = new Command();

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
    this.getSchools();
    this.getPrograms();
    this.getStudents();
  }

  setupRules() {
    return [
      new Rules("name", [new Required(this.department.name), new MinLength(this.department.name, 2)]),
      new Rules("code", [new Required(this.department.code)]),
    ];
  }

  async save() {
    let rules = this.setupRules();
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      let school = this.schools.find((x) => x.name === this.department.schoolName);
      this.department.schoolId = school.schoolId;
      BallLoader.show();
      const res = await new HttpService().post("Department/AddDepartment", this.department);
          this.department = new Department();
          this.bind();
          await this.getDepartments();
          Toast.success(res.message);
          BallLoader.hide();
    }
  }

  getDepartments = async () => {
    try {
      
     // this.departments = this.commonService.departments;
      const data = await new HttpService().get("Department/GetDepartments");
      this.departments = data.value;
      this.bindList("departments");
    } catch (error) {}
  };
  
  getLecturer(value) {
    return this.commonService.lecturers.filter((x) => x.name.toUpperCase().includes(value.toUpperCase()));
  }

  getDeptEditDetails = async () => {
    
    this.department = this.departments.find((x) => x.code === this.deptCode)
    this.school = this.schools.find((x) => x.schoolId === this.department.schoolId);
    this.department.schoolName = this.school.name;
    this.lecturerName = this.commonService.lecturers.find((x) => x.lecturerId === this.department.lecturerId).name;
    return this.department;
  }

  getPrograms = async () => {
    try {
      BallLoader.show();
      const data = this.commonService.programs;
       this.programs = data;
      BallLoader.hide();
    } catch (error) {}
  };

  getStudents = async () => {
    try {
      BallLoader.show();
      const data = this.commonService.students;
      this.students = data;
    } catch (error) {
      console.log(error);
    }
  };

   fillTable() {
     let rows = [];
    for (var i = 0; i < this.programs.length; i++) {
      let rowdata = [];
      if (this.programs[i].departmentId === this.department.departmentId) {
        rowdata.push(this.programs[i].name);
        let programLength = this.students.filter((x) => x.programId === this.programs[i].programId);
        rowdata.push(programLength.length);
        let male = programLength.filter((x) => x.gender === "M");
        rowdata.push(male.length);
       let female = programLength.filter((x) => x.gender === "F");
        rowdata.push(female.length);
        rows.push(rowdata);           
      }      
     }     
    return rows;
  }

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }

  getSchools = async () => {
    try {
      const data = this.commonService.schools;
      this.schools = data as School[];
      // this.schools.unshift({
      //   name: "Please Select School",
      //   academicYear: "",
      //   semester: "",
      //   institutionId: "",
      //   institutionName: "",
      //   schoolId: "",
      //   lecturerId:""
      // });

      new BindingList2().bind(this, "schools");
    } catch (error) {}
  };

  bind() {
    this.department = this.viewModelHelper.addPropertyChangeNotification(this.department);
  }

   async update() {
     BallLoader.show();    
      const res = await new HttpService().post("Department/UpdateDepartment", this.department);
      let dep = this.departments.find(x=>x.departmentId === this.department.departmentId);
      dep.name = this.department.name;
      dep.lecturerId = this.department.lecturerId;
      dep.schoolId = this.department.schoolId;
      this.departmentUpdatedCommand.execute();
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
    })
  }
  
  DisableTextBox() {
    let input = document.querySelectorAll("[input]");
    input.forEach(function (item) {          
      item.toggleAttribute("disabled");
    })
  }

  download_csv(program) {
    let download = [];
    let programId = this.programs.find((x) => x.name === program).programId;
    let studentList = this.students.filter((x) => x.programId === programId);
    for (var i = 1; i < studentList.length; i++){
      let data = [];
      data.push(i);
      data.push(studentList[i].indexNumber);
      let name = `${studentList[i].surname} ${studentList[i].othernames}`;
      data.push(name);
      data.push(studentList[i].gender);
      data.push(program);
      data.push(studentList[i].level);
      data.push(studentList[i].enrollmentOption);
      download.push(data);
    }
        
    var csv = "No.,IndexNumber,Name, Gender, Program,Level,Enrolment Type\n";
    download.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${program}.csv`;
    hiddenElement.click();
  }
}
