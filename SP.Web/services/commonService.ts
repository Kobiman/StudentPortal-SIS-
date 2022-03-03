import { Student } from "../models/student";
import { App } from "../app";
import { HttpService } from "./httpService";
import { async } from "rxjs/internal/scheduler/async";

export class CommonService {
  lookups: any[] = [];
  lecturers: any[] = [];
  departments: any[] = [];
  programs: any[] = [];
  student: Student;
  students: any[];
  schools: any[] = [];
  httpService: HttpService;
  // permissions = [
  //   { title: "Add Student", route: "/app/#addStudent/stage1" },
  //   { title: "Student List", route: "/app/#studentList" },
  //   { title: "Check Results", route: "/app/#studentResults" },
  //   { title: "Mount Course", route: "/app/#mountCourse" },
  //   { title: "Mounted Courses", route: "/app/#mountedCourses" },
  //   { title: "Register Courses", route: "/app/#courseRegistration" },
  //   { title: "Institution", route: "/app/#institution" },
  //   { title: "School", route: "/app/#school" },
  //   { title: "Department", route: "/app/#department" },
  //   { route: "/app/#permission", title: "Permissions" },
  //   { route: "/app/#lecturerProfile", title: "My Profile" },
  // ];

  constructor() {
    this.httpService = new HttpService();
  }

  getLookups = async () => {
    try {
      const data = await this.httpService.get(`Lookup/GetLookups`);
      this.lookups = data.value;
    } catch (error) {}
  };

  getLecturers = async () => {
    try {
      const data = await this.httpService.get(`Lecturer/GetLecturers`);
      this.lecturers = data.value;
    } catch (error) {}
  };

  getDepartmentsWithCourses = async () => {
    try {
      const data = await this.httpService.get(
        `Department/GetDepartmentsWithCourses`
      );
      this.departments = data.value;
    } catch (error) {}
  };

  getPrograms = async () => {
    try {
      const data = await this.httpService.get(`Program/GetPrograms`);
      this.programs = data.value;
    } catch (error) {}
  };

  getSchools = async () => {
    try {
      const data = await this.httpService.get(`School/GetSchools`);
      this.schools = data.value;
    } catch (error) {}
  };

  getProgramsByUserType() {
    let lecturer = this.lecturers.find((x) => x.staffId === App.user.profile.userId);
    if (App.user.profile.userType === "Lecturer") {
      return this.programs.filter(
        (x) => x.departmentId === lecturer.departmentId
      );
    } else if (App.user.profile.userType === "Hod") {
      return this.programs.filter(
        (x) => x.departmentId === lecturer.departmentId
      );
    } else if (App.user.profile.userType === "Deean") {
      return this.programs.filter(
        (x) => x.departmentId === lecturer.departmentId
      );
    }
    return this.programs;
  }

  getDepartmentsWithCoursesUserType() {
    let lecturer = this.lecturers.find((x) => x.staffId === App.user.profile.userId);
    if (App.user.profile.userType === "Lecturer") {
      return this.departments.filter(
        (x) => x.departmentId === lecturer.departmentId
      );
    } else if (App.user.profile.userType === "Hod") {
      return this.departments.filter(
        (x) => x.departmentId === lecturer.departmentId
      );
    } else if (App.user.profile.userType === "Deean") {
      return this.departments.filter(
        (x) => x.departmentId === lecturer.departmentId
      );
    }
    return this.departments;
  }
  culculateGPA(results) {
    return (
      results.map((x) => x.credit * x.gradePoint).reduce((a, b) => a + b, 0) /
      results.map((x) => x.credit).reduce((a, b) => a + b, 0)
    ).toPrecision(3);
  }

  culculateCGPA(results) {
    return this.culculateGPA(results);
  }

  getStudents = async () => {
    try {
      const data = await this.httpService.get("Student/GetStudents");
      this.students = data.value;
    } catch (error) {}
  };
}
