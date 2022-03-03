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
import { Validator, Rules, Required, MinLength } from "../validator";
import { Course } from "../models/Course";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
export class CourseVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.updateCourseCommand = new Command();
        this.course = new Course();
        this.departments = [];
        this.courses = [];
        this.getDepartments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                const data = this.commonService.departments;
                this.departments = data;
                BallLoader.hide();
            }
            catch (error) { }
        });
        this.getDetails = () => __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            this.course = this.courses.find((x) => x.code === this.courseCode);
            let department = this.departments.find((x) => x.departmentId === this.course.departmentId).name;
            this.course.department = department;
            BallLoader.hide();
            return this.course;
        });
        this.getCourses = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                const data = yield new HttpService().get("Course/GetCourses");
                this.courses = data.value;
                BallLoader.hide();
            }
            catch (error) { }
        });
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
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let rules = this.setupRules();
            var errors = this.validator.addRules(rules).validate();
            this.viewModelHelper.showErrors(errors);
            if (!this.validator.hasErrors) {
                let department = this.departments.find((x) => x.name === this.course.department);
                this.course.departmentId = department.departmentId;
                BallLoader.show();
                const res = yield new HttpService().post("Course/AddCourse", this.course);
                if (res.isSuccessful) {
                    this.course = new Course();
                    this.bind();
                    this.getCourses();
                    this.updateCourseCommand.execute();
                    Toast.success(res.message);
                    BallLoader.hide();
                }
                else {
                    Toast.error(res.message);
                    BallLoader.hide();
                    this.updateCourseCommand.execute();
                }
            }
        });
    }
    bindList(id) {
        new BindingList2().bind(this, id);
    }
    bind() {
        this.course = this.viewModelHelper.addPropertyChangeNotification(this.course);
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            debugger;
            let course = {
                courseId: this.course.courseId,
                code: this.course.code,
                credit: this.course.credit,
                departmentId: this.course.departmentId,
                name: this.course.courseName
            };
            try {
                const res = yield new HttpService().post("Course/UpdateCourse", course);
                this.course = new Course();
                this.bind();
                yield this.getCourses();
                if (res.isSucessful) {
                    Toast.success(res.message);
                }
                else {
                    Toast.error(res.message);
                }
                BallLoader.hide();
            }
            catch (res) {
                console.log(res);
            }
        });
    }
    EnableTextBox() {
        let input = document.querySelectorAll("[input]");
        input.forEach(function (item) {
            item.toggleAttribute("disabled");
        });
    }
    DisableTextBox() {
        document.getElementById("btnEdit").style.visibility = "visible";
        let input = document.querySelectorAll("[input]");
        input.forEach(function (item) {
            item.toggleAttribute("disabled");
        });
    }
}
//# sourceMappingURL=courseVm.js.map