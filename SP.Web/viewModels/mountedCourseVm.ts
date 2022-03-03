import { BindingList2 } from "../BindingList2";
import { ViewModelHelper } from "../viewModelHelper";
import { CommonService } from "../services/commonService";
import { MountedRow } from "../views/mountCourse/mountedCoursesView";
import { BallLoader } from "../loader/ballLoader";
import { _ } from "../group";
import { App } from "../app";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
import { Toast } from "../toast/toast";

export class MountedCourseVm {
  viewModelHelper: ViewModelHelper;
  updateCourseRowCommand: Command;

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.updateCourseRowCommand = new Command();
    this.getLookups();
    this.getPrograms();
    this.request = {};
  }
  courses: any[];
  groupedCourses: any[];
  request: any;
  lookups: any;
  academicYears: any;
  semesters: any;
  programs: any[] = [];
  courseList: any[] = [];
  enrollmentOptions: any[] = [];
  categories: any[] = [];
  levels: any[] = [];
  scoring = [{ name: "Please Select Scoring" }, { name: "" }, { name: "True" }, { name: "False" }];
  filter: any = {};
  querys: any = [];

  getMountedCourses = async () => {
    BallLoader.show();
    let queies = [];
    if (this.request.academicYear) {
      queies.push({ propertyName: "AcademicYear", parameter: this.request.academicYear });
    }
    if (this.request.program) {
      queies.push({ propertyName: "ProgramOfStudy", parameter: this.request.program });
    }

    if (queies.length > 0) {
      let res = await new HttpService().post("Department/GetMountedCourses", queies);
      this.courseList = res.value;
      for (let c of this.courseList) {
        if (c.scoring === true) {
          c.isScoring = "True";
          c.assignedLecturer = this.getLecturers().find((x) => x.lecturerId === c.assignedTo)?.name;
        } else if (c.scoring === false) {
          c.isScoring = "False";
        }
      }
      this.groupedCourses = this.groupCourses(this.courseList);
    }

    this.updateCourseRowCommand.execute();
    BallLoader.hide();
  };

  getPrograms = () => {
    this.programs = this.commonService.getProgramsByUserType();
  };

  getLookups = () => {
    this.semesters = this.commonService.lookups.filter((x) => x.type === "SEMESTER");
    this.semesters.unshift({ name: "" });
    this.semesters.unshift({ name: "Please Select Semester" });

    this.academicYears = this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");

    this.enrollmentOptions = this.commonService.lookups.filter((x) => x.type === "ENROLLMENT OPTION");
    this.enrollmentOptions.unshift({ name: "" });
    this.enrollmentOptions.unshift({ name: "Please Select Enrollment Option" });

    this.categories = this.commonService.lookups.filter((x) => x.type === "COURSE CATEGORY");
    this.categories.unshift({ name: "" });
    this.categories.unshift({ name: "Please Select Category" });

    this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
    this.levels.unshift({ name: "" });
    this.levels.unshift({ name: "Please Select Level" });
  };

  getLecturers() {
    return this.commonService.lecturers;
  }

  getLecturer(name) {
    return this.commonService.lecturers.filter((x) => x.name.toUpperCase().includes(name.toUpperCase()));
  }

  assignLecturer(courseCode: any, assignedTo: any) {
    const course = this.courseList.find((x) => x.courseCode === courseCode);
    course.assignedTo = assignedTo;
    this.groupedCourses = this.groupCourses(this.courseList);
    this.updateCourseRowCommand.execute();
  }

  groupCourses(arr) {
    let groups = _.groupBy(arr, function (course) {
      return {
        enrollmentOption: course.enrollmentOption,
        category: course.category,
        program: course.program,
        level: course.level,
        specialization: course.specialization,
      };
    });

    return Object.keys(groups).map(function (group) {
      let j = JSON.parse(group);
      let g = groups[group];
      return {
        enrollmentOption: j.enrollmentOption,
        level: j.level,
        program: j.program,
        category: j.category,
        specialization: j.specialization,
        mountedCourses: g,
      };
    });
  }

  async assignCourse(mountedCourseId, lecturerId) {
    BallLoader.show();
    let c = this.courseList.find((x) => x.mountedCourseId === mountedCourseId);

    let request = {
      mountedCourseId: mountedCourseId,
      assignedTo: lecturerId,
      academicYear: c.academicYear,
      semester: c.semester,
      enrolmentOption: c.enrollmentOption,
    };
    let res = await new HttpService().post("Department/AssignCourse", request);
    if (res.isSucessful) {
      Toast.success(res.message);
    } else {
      Toast.error(res.message);
    }
    BallLoader.hide();
  }

  async deleteCourse(c: any) {
    BallLoader.show();

    let programId = this.programs.find((x) => x.name === c.programOfStudy).programId;
    let res = await new HttpService().get(`Department/DeleteMountedCourse/${programId}/${c.mountedCourseId}`);
    if (res.isSucessful) {
      Toast.success(res.message);
    } else {
      Toast.error(res.message);
    }
    BallLoader.hide();
  }

  bind() {
    this.request = this.viewModelHelper.addPropertyChangeNotification(this.request);
  }

  getMountedCourse = (courseCode) => {
    return this.courseList.find((x) => x.courseCode === courseCode);
  };

  bindList(id: string) {
    new BindingList2().bind(this, id);
  }

  search() {
    this.courses = this.courseList.filter((a) => this.executeQuery(a, this.querys));
    this.groupedCourses = this.groupCourses(this.courses);
    this.updateCourseRowCommand.execute();
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
      this.querys.push({ propertyName: propertyName, parameter: parameter.toUpperCase() });
    }
    this.search();
  }

  executeQuery(source, querys) {
    var result = true;
    for (var query of querys) {
      result = result && this.IsEqualTo(source, query.propertyName, query.parameter);
    }
    return result;
  }
}
