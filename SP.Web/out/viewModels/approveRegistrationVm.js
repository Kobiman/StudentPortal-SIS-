var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ViewModelHelper } from "../viewModelHelper";
import { SelectedCourse } from "../models/SelectedCourse";
import { RegisteredCourseRow } from "../views/registrationApproval/RegisteredCourseRow";
import { HttpService } from "../services/httpService";
import { BallLoader } from "../loader/ballLoader";
export class ApproveRegistrationVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.originalRegistrationList = [];
        this.temporalRegistrationList = [];
        this.lookups = [];
        this.programs = [];
        this.levels = [];
        this.selectedCourses = [];
        this.mountedCourses = [];
        this.trailList = [];
        this.mountedCourse = new SelectedCourse();
        this.maximunCredit = 0;
        this.getMountedCourses = () => __awaiter(this, void 0, void 0, function* () {
            if (this.mountedCourses.length === 0) {
                let request = [
                    { propertyName: "AcademicYear", parameter: this.academicyear },
                    { propertyName: "Level", parameter: this.level },
                ];
                const data = yield new HttpService().post("Department/GetMountedCourses", request);
                this.mountedCourses = data.value;
            }
        });
        // getTrailList = async () => {
        //   debugger;
        //    let request = { indexNumber: this.indexNumber, semester: this.semester, academicYear: this.academicyear };
        //   const data = await new HttpService().post("Department/GetTrailList",request);
        //   this.trailList = data.value
        // }
        this.getStudentRegistration = (programName, level) => __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            let program = this.commonService.programs.find((x) => x.name === programName);
            this.maximunCredit = program.creditLimits.find((x) => x.level === level).maxCredit;
            let request = { academicYear: "2020/2021", programId: program.programId, level: level };
            const res = yield new HttpService().post("Department/GetRegisteredCoursesForApproval", request);
            if (res.isSucessful) {
                this.originalRegistrationList = res.value.map((r) => ({
                    indexNumber: r.indexNumber,
                    name: r.surname + " " + r.othernames,
                    program: programName,
                    level: r.level,
                    pendingTrails: r.pendingTrails,
                    totalCourses: r.registeredCourses.length,
                    totalCredit: r.registeredCourses.map((x) => parseInt(x.credit)).reduce((a, b) => a + b, 0),
                    status: this.setStatus(r.registeredCourses),
                    registeredCourses: r.registeredCourses,
                    trailCourses: r.trailCourses,
                }));
                this.temporalRegistrationList = this.originalRegistrationList;
            }
            BallLoader.hide();
            new RegisteredCourseRow(this).render();
            this.originalRegistrationList = this.temporalRegistrationList;
        });
        this.getPrograms = () => {
            return this.commonService.getProgramsByUserType();
        };
        this.getAcademicYear = () => {
            const registration1 = this.temporalRegistrationList[0].registeredCourses[0].academicYear;
            this.semester = this.temporalRegistrationList[0].registeredCourses[0].semester;
            this.academicyear = registration1;
        };
        this.getLookups = () => {
            this.programs = this.commonService.lookups.filter((x) => x.type === "PROGRAMS");
            this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
        };
        this.viewModelHelper = new ViewModelHelper();
        this.getPrograms();
        this.getLookups();
    }
    unChecked(checked) {
        this.checked = checked;
    }
    getRegisteredCourses(indexNumber) {
        return this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber).registeredCourses;
    }
    aproveRegistration(indexNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const registration2 = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
            registration2.status = true;
        });
    }
    setStatus(registeredCourses) {
        let approved = registeredCourses.filter((x) => x.approved);
        let deffered = registeredCourses.filter((x) => !x.approved);
        let status = {};
        if (approved.length > 0 && deffered.length === 0) {
            return (status = { value: true, colour: "" });
        }
        if (approved.length === 0 && deffered.length > 0) {
            return (status = { value: false, colour: "" });
        }
        else {
            return (status = { value: true, colour: "" });
        }
    }
    aproveAllRegistration() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let r of this.temporalRegistrationList) {
                if (this.checked) {
                    r.status = { value: true, colour: "" };
                }
                else if (!this.checked) {
                    r.status = { value: false, colour: "" };
                }
            }
            var request = this.temporalRegistrationList.map((x) => ({
                indexNumber: x.indexNumber,
                approveCourses: x.registeredCourses.map((y) => ({ status: x.status.value, registeredCourseId: y.registeredCourseId })),
            }));
            const res = yield new HttpService().post("Department/ApproveRegisteredCourses", request);
            if (res.isSucessful) {
                new RegisteredCourseRow(this).render();
            }
        });
    }
    rejectRegistration(indexNumber) {
        const registration1 = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
        registration1.status = "Deffered";
        new RegisteredCourseRow(this).render();
    }
    addMountedCourse(courseCode, indexNumber) {
        const course = this.mountedCourses.find((x) => x.courseCode === courseCode);
        const registration = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
        registration.registeredCourses.push(course);
    }
    addTrailCourse(courseCode, indexNumber) {
        const course = this.temporalRegistrationList.find((x) => x.courseCode === courseCode);
        const registration = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
        registration.registeredCourses.push(course);
    }
    removeCourse(courseCode, indexNumber) {
        const registration1 = this.temporalRegistrationList.find((x) => x.indexNumber === indexNumber);
        const courseIndex1 = registration1.registeredCourses.findIndex((x) => x.courseCode === courseCode);
        registration1.registeredCourses.splice(courseIndex1, 1);
    }
}
//# sourceMappingURL=approveRegistrationVm.js.map