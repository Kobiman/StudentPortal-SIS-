var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpService } from "../services/httpService";
import { BallLoader } from "../loader/ballLoader";
import { SelectedCourse } from "../models/SelectedCourse";
import { Command } from "../Command";
import { Toast } from "../toast/toast";
export class StudentListVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.mountedCourse = new SelectedCourse();
        this.take = 200;
        this.skip = 0;
        this.indexNumber = "UEB1401018";
        this.progStatus = ["Probation", "Withdrawn", "Suspended", "InProgress", "Defered"];
        this.students = [];
        this.studentList = [];
        this.programs = [];
        this.levels = [];
        this.getStudents = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                BallLoader.show();
                this.studentList = (_a = this.commonService.students) !== null && _a !== void 0 ? _a : [];
                this.paginate(0, 200);
                BallLoader.hide();
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getStudent = () => {
            this.student = this.studentList.find((x) => x.indexNumber === this.indexNumber);
            let program = this.commonService.programs.find((x) => x.programId === this.student.programId);
            let department = this.commonService.departments.find((x) => x.departmentId === program.departmentId);
            let school = this.commonService.schools.find((x) => x.schoolId === department.schoolId);
            this.student.school = school.name;
            this.student.studentName = `${this.student.surname} ${this.student.othernames}`;
            this.student.program = program.name;
            return this.student;
        };
        this.updateStudentListCommand = new Command();
    }
    bind() {
        this.student = this.viewModelHelper.addPropertyChangeNotification(this.student);
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            try {
                const res = yield new HttpService().post("Student/UpdateStudent", this.student);
                this.bind();
                yield this.getStudents();
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
    onScroll(scrollTop, maxScroll) {
        if (scrollTop >= maxScroll) {
            debugger;
            this.skip = scrollTop;
            this.paginate(this.skip, this.take);
            this.updateStudentListCommand.execute();
        }
        else if (scrollTop <= maxScroll) {
            this.skip = this.skip + this.take;
            this.paginate(this.skip, this.take);
            this.updateStudentListCommand.execute();
        }
    }
    paginate(skip, take) {
        let total = skip + take;
        if (total <= this.studentList.length) {
            skip = skip == 0 ? skip : skip;
            let j = 0;
            for (var i = skip; i < total; i++) {
                this.students[j] = this.studentList[i];
                j++;
            }
        }
    }
}
//# sourceMappingURL=StudentListVm.js.map