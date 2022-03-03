import { BindingList2 } from "../BindingList2";
import { ViewModelHelper } from "../viewModelHelper";
import { Validator, Rules, Required, MinLength } from "../validator";
import { Department } from "../models/department";
import { Course } from "../models/Course";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { App } from "../app";
import { HttpService } from "../services/httpService";
import { async } from "rxjs/internal/scheduler/async";
import { CommonService } from "../services/commonService";
import { Command } from "../Command";

export class CourseVm {
  validator: Validator;
  viewModelHelper: ViewModelHelper;
  updateCourseCommand: Command = new Command();
  course: Course = new Course();
  departments: Department[] = [];
  courses: Course[] = [];
  courseCode: string;

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.validator = new Validator();
    this.getDepartments();
    this.getCourses();
  }

  setupRules() {
    return [
      new Rules("name", [new Required(this.course.courseName), new MinLength(this.course.courseName, 2)]),
      //new Rules("category", [new Required(this.course.category)]),
      new Rules("code", [new Required(this.course.code)]),
      new Rules("credit", [new Required(this.course.credit)]),
    ];
  }

  async save() {
    let rules = this.setupRules();
    var errors = this.validator.addRules(rules).validate();
    this.viewModelHelper.showErrors(errors);
    if (!this.validator.hasErrors) {
      let department = this.departments.find((x) => x.name === this.course.department);
      this.course.departmentId = department.departmentId;
      BallLoader.show();
      const res = await new HttpService().post("Course/AddCourse", this.course);
      if(res.isSuccessful){
        this.course = new Course();
        this.bind();
        this.getCourses();
        this.updateCourseCommand.execute();
        Toast.success(res.message);
        BallLoader.hide();
      }
      else{
        Toast.error(res.message);
        BallLoader.hide();
        this.updateCourseCommand.execute();
      }
        
    }
  }

  getDepartments = async () => {
    try {
      BallLoader.show();
      const data = this.commonService.departments;
      this.departments = data;
      BallLoader.hide();
    } catch (error) {}
  };

  getDetails = async () => {
    BallLoader.show();
    this.course=this.courses.find((x)=>x.code===this.courseCode)
    let department = this.departments.find((x) => x.departmentId === this.course.departmentId).name;
    this.course.department = department;
    BallLoader.hide();
    return this.course;
  }
  getCourses = async () => {
    try {
      BallLoader.show();
      const data = await new HttpService().get("Course/GetCourses");
      this.courses = data.value as Course[];
      BallLoader.hide();
    } catch (error) {}
  };

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }

  bind() {
    this.course = this.viewModelHelper.addPropertyChangeNotification(this.course);
  }

  async update() {
     BallLoader.show();
    debugger;
    let course = {
      courseId: this.course.courseId,
      code: this.course.code,
      credit: this.course.credit,
      departmentId: this.course.departmentId,
      name:this.course.courseName
    };
    try { 
      const res = await new HttpService().post("Course/UpdateCourse", course);
      this.course = new Course();
      this.bind();
     await this.getCourses();
     if (res.isSucessful) {
      Toast.success(res.message);
    } else {
      Toast.error(res.message);
     }
      BallLoader.hide();
    } catch (res) {
      console.log(res);
      }
  }

   EnableTextBox() {
      let input = document.querySelectorAll("[input]");
      input.forEach(function (item) {
      item.toggleAttribute("disabled");
    })  
  }
  
  DisableTextBox() {
    document.getElementById("btnEdit").style.visibility="visible";
    let input = document.querySelectorAll("[input]");
    input.forEach(function (item) {          
      item.toggleAttribute("disabled");
    })
  }
}
