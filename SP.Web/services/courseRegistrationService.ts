import { BallLoader } from "../loader/ballLoader";
import { App } from "../app";
import { HttpService } from "./httpService";

export class CourseRegistrationService {
  registeredCourses: any[] = [];
  hasRegisterd: boolean = false;
  student: any;
  school: any;
  mountedCourses: any[] = [];
  trailCourses: any[] = [];
  elementId: string;

  constructor() {}

  setElementId(elementId: string) {
    this.elementId = elementId;
  }

  getStudent = async () => {
    try {
      const data = await new HttpService().get(`Student/GetStudent/${App.user.profile.userId}`);
      this.student = data.value;
      await this.getSchoolByProgram(this.student.programId);

      return this.student;
    } catch (error) {}
  };

  getSchoolByProgram = async (program: string) => {
    try {
      const data = await new HttpService().get("School/GetSchoolByProgram/" + program);
      this.school = data.value;
      await this.getRegisteredCourses(this.school.academicYear, this.school.semester, this.student.indexNumber);
      await this.getMountedCourses(
        this.school.academicYear,
        this.school.semester,
        this.student.programId,
        this.student.level,
        this.student.enrollmentOption
      );
      await this.getTrailCourses(this.school.semester, this.student.indexNumber,this.school.academicYear);
    } catch (error) {}
  };

  getRegisteredCourses = async (academicYear: string, semester: string, indexNumber: string) => {
    let request = { academicYear: academicYear, semester: semester, indexNumber: indexNumber };
    const res = await new HttpService().post("Department/GetRegisteredCourses", request);

    if (res.isSucessful) {
      this.registeredCourses = res.value;
      this.hasRegisterd = true;
      //new RegisteredCoursesView(new RegisteredCoursesVm(this)).render(this.elementId);
      //new RegisterCourseView(new RegisterCourseVm(this)).render(this.elementId);
    }
  };

  getMountedCourses = async (academicYear: string, semester: string, program: string, level: string, erollmentOption: string) => {
    let request = { academicYear: academicYear, semester: semester, program: program, level: level, erollmentOption: erollmentOption };
    const res = await new HttpService().post("Department/GetMountedCoursesForRegistration", request);

    this.mountedCourses = res.value;
  };

  getTrailCourses = async (semester: string, indexNumber: string, academicYear: string) => {
    let request = { semester: semester, indexNumber: indexNumber,academicYear:academicYear };
    const res = await new HttpService().post("Department/GetTrailList", request);
    if (res.isSucessful) {
      this.trailCourses = res.value;
    }
  };
}
