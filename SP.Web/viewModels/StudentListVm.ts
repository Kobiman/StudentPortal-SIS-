import { HttpService } from "../services/httpService";
import { BallLoader } from "../loader/ballLoader";
import { CommonService } from "../services/commonService";
import { SelectedCourse } from "../models/SelectedCourse";
import { ViewModelHelper } from "../viewModelHelper";
import { Command } from "../Command";
import { Toast } from "../toast/toast";

export class StudentListVm {
  mountedCourse: SelectedCourse = new SelectedCourse();
  viewModelHelper: ViewModelHelper;
  updateStudentListCommand: Command;
  results: any[];
  querys: any;
  student: any;
  take = 200;
  skip = 0;
  indexNumber: any = "UEB1401018";
  progStatus = ["Probation", "Withdrawn", "Suspended", "InProgress", "Defered"];

  constructor(private commonService: CommonService) {
    this.updateStudentListCommand = new Command();
  }

  students: any[] = [];
  studentList: any[] = [];
  programs: any[] = [];
  levels: any[] = [];

  getStudents = async () => {
    try {
      BallLoader.show();
      this.studentList = this.commonService.students??[];
      this.paginate(0, 200);
      BallLoader.hide();
    } catch (error) {
      console.log(error);
    }
  };

  getStudent = () => {
    this.student = this.studentList.find(
      (x) => x.indexNumber === this.indexNumber
    );
    let program = this.commonService.programs.find(
      (x) => x.programId === this.student.programId
    );
    let department = this.commonService.departments.find(
      (x) => x.departmentId === program.departmentId
    );
    let school = this.commonService.schools.find(
      (x) => x.schoolId === department.schoolId
    );
    this.student.school = school.name;
    this.student.studentName = `${this.student.surname} ${this.student.othernames}`;
    this.student.program = program.name;
    return this.student;
  };

  bind() {
    this.student = this.viewModelHelper.addPropertyChangeNotification(
      this.student
    );
  }

  async update() {
    BallLoader.show();
    try {
      const res = await new HttpService().post(
        "Student/UpdateStudent",
        this.student
      );
      this.bind();
      await this.getStudents();
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

  onScroll(scrollTop, maxScroll) {
    if (scrollTop >= maxScroll) {
      debugger;
      this.skip = scrollTop;
      this.paginate(this.skip, this.take);
      this.updateStudentListCommand.execute();
    } else if (scrollTop <= maxScroll) {
      this.skip = this.skip + this.take;
      this.paginate(this.skip, this.take);
      this.updateStudentListCommand.execute();
    }
  }

  paginate(skip: number, take: number) {
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
