var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LookupVm } from "./lookupVm";
import { ViewModelHelper } from "../viewModelHelper";
import Papa from "papaparse";
import { ResultRow } from "../views/uploadResult/uploadResultView";
import { App } from "../app";
import { _ } from "../group";
import { BallLoader } from "../loader/ballLoader";
import { Toast } from "../toast/toast";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
export class UploadResultViewModel {
    constructor(commonService) {
        this.commonService = commonService;
        this.studentResults = [];
        this.courses = [];
        this.departmentCourses = [];
        this.studentsEnteryLevel = {};
        this.updateCourseCommand = new Command();
        this.hasErrors = false;
        this.getGradeSettings = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                const data = yield this.httpService.get("GradesSettings/GetGradesSettings");
                this.grades = data.value;
                BallLoader.hide();
            }
            catch (error) { }
        });
        this.getStudentsEnteryLevel = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                const data = yield this.httpService.get("Student/GetStudentsEnteryLevel");
                for (var s of data.value) {
                    this.studentsEnteryLevel[s.indexNumber] = s.level;
                }
                BallLoader.hide();
            }
            catch (error) { }
        });
        this.getByDepartment = () => {
            this.departments = this.commonService.departments;
            return this.commonService.departments;
        };
        this.getPrograms = () => {
            return this.commonService.programs;
        };
        this.bindData = () => {
            this.mountedCourseRequest =
                this.viewModelHelper.addPropertyChangeNotification(this.mountedCourseRequest);
        };
        this.getCourse = () => {
            for (let i = 0; i < this.getByDepartment().length; i++) {
                let pdfcourses = this.departments[i].courses;
                for (let j = 0; j < pdfcourses.length - 1; j++) {
                    if (pdfcourses[j].code === this.names[3]) {
                        return pdfcourses[j];
                    }
                }
            }
            return null;
        };
        this.viewModelHelper = new ViewModelHelper();
        this.lookupVm = new LookupVm(App.commonService);
        this.httpService = new HttpService();
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasErrors) {
                Toast.error("Results has errors");
            }
            else {
                BallLoader.show();
                this.course = this.getCourse();
                let names2 = this.file.name.split(" ");
                let results = this.studentResults.map((x) => ({
                    indexNumber: x.IndexNumber,
                    academicYear: this.names[0],
                    credit: parseInt(this.course.credit),
                    semester: this.names[2],
                    programId: names2[names2.length - 2],
                    mountedCourseId: names2[names2.length - 1].substring(0, names2[names2.length - 1].length - 4),
                    level: x.Level,
                    grade: x.Grade,
                    gradePoint: x.GradePoint,
                    classMark: x.ClassScore,
                    examMark: x.ExamsScore,
                    totalMark: x.TotalScore,
                    lecturerId: "N/A",
                }));
                const result = yield this.httpService.post("Lecturer/UploadResults", results);
                if (result.isSuccessful) {
                    this.generateResultsSheet();
                    this.studentResults = [];
                    Toast.success(result.message);
                    new ResultRow().render(this.studentResults);
                }
                else {
                    this.hasErrors = true;
                    Toast.error(result.message);
                }
                BallLoader.hide();
            }
        });
    }
    getProgram(mountedCourseId) {
        let mountedCourse = this.courses.find((x) => x.mountedCourseId === mountedCourseId);
        this.program = this.commonService.programs.find((x) => x.programId === mountedCourse.programId);
    }
    getEnrollmentOptions() {
        let enrollmentOptions = this.commonService.lookups.filter((x) => x.type == "ENROLLMENT OPTION");
        return enrollmentOptions;
    }
    getSemesters() {
        let semesters = this.commonService.lookups.filter((x) => x.type == "SEMESTER");
        return semesters;
    }
    getLevels() {
        let semesters = this.commonService.lookups.filter((x) => x.type == "LEVEL");
        return semesters;
    }
    getAcademicYears() {
        let academicYears = this.commonService.lookups.filter((x) => x.type == "ACADEMIC YEAR");
        return academicYears;
    }
    getMountedCourses(academicYear, semester, enrollmentOption) {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            var request = {
                academicYear: academicYear,
                semester: semester,
                enrollmentOption: enrollmentOption,
                lecturerId: this.commonService.lecturers.find((x) => x.staffId === App.user.profile.userId).lecturerId,
            };
            let result = yield this.httpService.post("Department/GetMountedCoursesForResultsUpload", request);
            this.courses = result.value;
            this.updateCourseCommand.execute();
            BallLoader.hide();
        });
    }
    download_csv(academicYear, enrollmentOption, semester, mountedCourseId) {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            var request = {
                academicYear: academicYear,
                semester: semester.toUpperCase(),
                mountedCourseId: mountedCourseId,
                programId: this.program.programId,
            };
            let mountedCourse = this.courses.find((x) => x.mountedCourseId === mountedCourseId);
            let result = yield this.httpService.post("Department/GetRegisteredStudentsList", request);
            let data = result.value.map((x) => [
                x.indexnumber,
                x.name,
                x.level,
                mountedCourse.courseCode,
                "",
                "",
            ]);
            var csv = "IndexNumber,Name,Level,CourseCode,ClassScore,ExamsScore\n";
            data.forEach(function (row) {
                csv += row.join(",");
                csv += "\n";
            });
            var hiddenElement = document.createElement("a");
            hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
            hiddenElement.target = "_blank";
            hiddenElement.download = `${academicYear}-${enrollmentOption}-${semester}-${mountedCourse.courseCode}-${this.program.name} ${this.program.programId} ${mountedCourseId}.csv`;
            hiddenElement.click();
            BallLoader.hide();
        });
    }
    uploadResult(evt) {
        this.file = evt.target.files[0];
        var reader = new FileReader();
        reader.readAsText(this.file);
        reader.onload = (event) => __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            let temp = this.file.name.split("-");
            this.names = temp;
            if (this.names.length === 1) {
                BallLoader.hide();
                Toast.warning("Invalid file name");
                this.hasErrors = true;
            }
            else {
                var request = this.createRequest(this.names, this.file);
                let result = yield this.httpService.post("Department/GetRegisteredStudentsList", request);
                let registeredStudents = result.value;
                var csv = event.target.result; // Content of CSV file
                Papa.parse(csv, {
                    skipEmptyLines: true,
                    header: true,
                    complete: (results) => {
                        this.summary = results.data;
                        if (results.data.length < registeredStudents.length) {
                            BallLoader.hide();
                            this.hasErrors = true;
                            Toast.warning("File count is less than original");
                        }
                        else {
                            this.studentResults = this.formartResults(results, registeredStudents);
                            new ResultRow().render(this.studentResults);
                            BallLoader.hide();
                        }
                    },
                });
            }
        });
    }
    groupResults(results) {
        return _.groupBy(results, function (result) {
            return {
                grade: result.Grade,
            };
        });
    }
    formart(groupedResults) {
        return Object.keys(groupedResults).map(function (result) {
            let r = JSON.parse(result);
            return {
                grade: r.grade,
                total: groupedResults[result].length,
            };
        });
    }
    generateResultsSheet() {
        const doc = new jsPDF({
            orientation: "l",
            unit: "mm",
            format: "a4",
        });
        //pdf File Header generation from uploaded file name
        let academicYear = this.names[0];
        let semester = this.names[2];
        let code = this.names[3];
        let programDetails = this.names[4].split(" ");
        let programName = `${programDetails[0]} ${programDetails[1]}`;
        let programId = programDetails[2];
        let program = this.getPrograms().find((x) => x.programId === programId);
        let department = this.getByDepartment().find((x) => x.departmentId === program.departmentId);
        //Search all courses on each department for course name and title, and credit
        //this.getSingleCourseFromDepartments();
        let title = this.course.courseName;
        let credit = this.course.credit;
        //
        doc.setFontSize(11);
        doc.setTextColor("black");
        doc.text("University of Energy and Natural Resources", 100, 8);
        //
        doc.setFontSize(10);
        doc.text(`Academic Year: ${academicYear}`, 14, 15);
        doc.text(`Department: ${department.name}`, 14, 19);
        doc.text(`Program: ${programName}`, 14, 23);
        doc.text(`Title: ${title}`, 14, 27);
        //
        doc.text(`Semester: ${semester} `, 185, 15);
        doc.text(`Code: ${code} `, 185, 19);
        doc.text(`Credit: ${credit} `, 185, 23);
        //
        doc.setFontSize(10);
        autoTable(doc, {
            html: "#resultsPDF",
            startY: 32,
            theme: "plain",
            styles: {
                fontStyle: "normal",
                fontSize: 7,
                cellWidth: "auto",
                lineWidth: 0.2,
                minCellHeight: 0.5,
                cellPadding: 0.4,
                overflow: "linebreak",
                lineColor: 10,
            },
        });
        //Header for summary
        doc.text("Summary of Results", 14, doc.previousAutoTable.finalY + 18);
        autoTable(doc, {
            head: [[`Grade`, `No. of Students`]],
            body: [
                [`A`, `${this.summary.filter((x) => x.Grade === "A").length}`],
                [`B+`, `${this.summary.filter((x) => x.Grade === "B+").length}`],
                [`B`, `${this.summary.filter((x) => x.Grade === "B").length}`],
                [`C+`, `${this.summary.filter((x) => x.Grade === "C+").length}`],
                [`C`, `${this.summary.filter((x) => x.Grade === "C").length}`],
                [`D+`, `${this.summary.filter((x) => x.Grade === "D+").length}`],
                [`D`, `${this.summary.filter((x) => x.Grade === "D").length}`],
                [`E`, `${this.summary.filter((x) => x.Grade === "E").length}`],
                [`F`, `${this.summary.filter((x) => x.Grade === "F").length}`],
            ],
            startY: doc.previousAutoTable.finalY + 20,
            theme: "plain",
            styles: {
                fontStyle: "normal",
                fontSize: 7,
                cellWidth: "auto",
                lineWidth: 0.2,
                minCellHeight: 0.5,
                cellPadding: 0.4,
                overflow: "linebreak",
                lineColor: 10,
                halign: "center",
            },
            columnStyles: {
                0: { cellWidth: 20 },
                1: { cellWidth: 20 },
            },
        });
        //Signature
        doc.text(`Uploaded by: ${this.commonService.lecturers.find((x) => x.staffId === App.user.profile.UserId).name}`, 14, doc.previousAutoTable.finalY + 15);
        doc.setFontSize(8);
        var current = new Date();
        doc.text(`Date Issued(d/m/y): ${current.toLocaleString()}`, 14, doc.previousAutoTable.finalY + 20);
        //saving file as pdf
        doc.save(`lect_results_sheet_${App.user.profile.UserId}_${code}.pdf`);
    }
    createRequest(names, file) {
        let academicYear = names[0].split("_");
        let names2 = file.name.split(" ");
        return {
            academicYear: `${academicYear[0]}/${academicYear[1]}`,
            semester: names[2].toUpperCase(),
            mountedCourseId: names2[names2.length - 1].substring(0, names2[names2.length - 1].length - 4),
            programId: names2[names2.length - 2],
        };
    }
    formartResults(results, registeredStudents) {
        for (const r of results.data) {
            let registeredStudent = registeredStudents.find((x) => x.indexnumber === r.IndexNumber);
            r.Isvalid = registeredStudent ? true : false;
            r.ClassScore = parseFloat(r.ClassScore);
            r.ExamsScore = parseFloat(r.ExamsScore);
            r.TotalScore = parseFloat(r.ClassScore) + parseFloat(r.ExamsScore);
            let student = this.commonService.students.find((x) => x.indexNumber === r.IndexNumber);
            let commisionDate = student ? this.computeCommissionDate(student) : "";
            var g = this.grades.find((x) => {
                let studentType = student ? student.studentType : "";
                return (r.TotalScore >= x.lowerLimit &&
                    r.TotalScore <= x.upperLimit &&
                    x.commissionDate.includes(commisionDate) &&
                    x.type === studentType);
            });
            r.Grade = g ? g.grade : "N/A";
            r.GradePoint = g ? parseFloat(g.gradePoint) : 0;
            if (r.ClassScore > 40 || r.ExamsScore > 60) {
                this.hasErrors = true;
            }
        }
        this.resultSummary = this.formart(this.groupResults(results.data));
        return results.data;
    }
    computeCommissionDate(student) {
        let entryLevel = this.studentsEnteryLevel[student.indexNumber];
        let noOfyearsToSubtract = parseInt(entryLevel) / 100 - 1;
        let commisionDate = parseInt(student.dateOfEntry.split("-")[0]) - noOfyearsToSubtract;
        return commisionDate.toString();
    }
}
//# sourceMappingURL=uploadResultVm.js.map