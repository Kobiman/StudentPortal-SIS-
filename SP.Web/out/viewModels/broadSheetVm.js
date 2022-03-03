var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BallLoader } from "../loader/ballLoader";
import { SelectedCourse } from "../models/SelectedCourse";
import { ViewModelHelper } from "../viewModelHelper";
import { BroadSheetTableRow } from "../views/broadSheet/broadSheetTableRow";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { BroadSheetTableHead } from "../views/broadSheet/broadSheetTableHead";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
import { Toast } from "../toast/toast";
export class BroadSheetVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.mountedCourse = new SelectedCourse();
        this.tooltip = [];
        this.event = new Command();
        this.lookups = [];
        this.querys = [];
        this.resultsList = [];
        this.results = [];
        this.selectedCourses = [];
        this.col1 = [];
        this.grade = [];
        this.indexNumber = [];
        this.examResults = [];
        this.eResultsData = [];
        this.headerColumns = [];
        this.approveResultData = [];
        this.getPrograms = () => {
            return this.commonService.getProgramsByUserType();
        };
        this.getByDepartment = () => {
            return this.commonService.departments;
        };
        this.getLookups = () => {
            this.semesters = this.commonService.lookups.filter((x) => x.type === "SEMESTER");
            this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
            this.academicYear = this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");
        };
        this.viewModelHelper = new ViewModelHelper();
        this.getPrograms();
        this.getLookups();
        this.getByDepartment();
    }
    getStudentResults(program, academicYear, level, semester) {
        return __awaiter(this, void 0, void 0, function* () {
            var request = {
                program: program,
                academicYear: academicYear,
                level: level,
                semester: semester,
            };
            BallLoader.show();
            const data = yield new HttpService().post("Department/GetExamResults", request);
            this.examResults = data.value;
            this.eResultsData = this.examResults;
            BallLoader.hide();
            new BroadSheetTableHead(this).render();
            new BroadSheetTableRow(this, this.checked).render();
            //examResultId;
        });
    }
    showMarks(checked) {
        this.checked = checked;
    }
    //Aprove result by HOD
    approveResultsByHoD() {
        return __awaiter(this, void 0, void 0, function* () {
            let program, academicYear, level, semester, success;
            program = document.getElementById("programs").value;
            academicYear = document.getElementById("academicYear").value;
            level = document.getElementById("level").value;
            semester = document.getElementById("semester").value;
            success = `Result for ${program} ${academicYear} ${level} ${semester} approved successfully`;
            let results = [];
            for (var i = 0; i < this.eResultsData.length; i++) {
                results.push(...this.eResultsData[i].studentResults);
            }
            var request = results.map((x) => ({
                indexNumber: x.indexNumber,
                status: "1",
                examResultId: x.examResultId,
                comment: (x.comment = ""),
            }));
            BallLoader.show();
            const data = yield new HttpService().post("Department/ApproveResults", request);
            data.isSucessful ? Toast.success(success) : Toast.error(data.message);
            BallLoader.hide();
        });
    }
    getHeaderCols() {
        let cols = [];
        for (var i = 0; i < this.eResultsData.length; i++) {
            for (var j = 0; j < this.eResultsData[i].studentResults.length; j++) {
                cols.push(this.eResultsData[i].studentResults[j].courseCode +
                    " - " +
                    this.eResultsData[i].studentResults[j].credit +
                    "." +
                    this.eResultsData[i].studentResults[j].courseName);
            }
        }
        this.headerColumns = cols.filter((x, i, a) => x && a.indexOf(x) === i);
        return this.headerColumns;
    }
    getTableRows(checked) {
        let rows = [];
        for (var i = 0; i < this.eResultsData.length; i++) {
            let rowdata = [];
            rowdata.push(this.eResultsData[i].indexNumber);
            rowdata.push(this.eResultsData[i].name);
            if (this.eResultsData[i].studentResults.length > 0) {
                for (let c of this.headerColumns) {
                    let result = this.eResultsData[i].studentResults.find((x) => x.courseCode === c.split("-")[0].trim());
                    if (result && checked) {
                        rowdata.push(`${result.totalMark}-${result.grade}`);
                    }
                    else if (result && !checked) {
                        rowdata.push(`${result.grade}-${result.totalMark}`);
                    }
                    else {
                        rowdata.push("");
                    }
                }
            }
            else {
                for (let c of this.headerColumns) {
                    rowdata.push("I");
                }
            }
            rowdata.push(this.eResultsData[i].currentCredit);
            rowdata.push(this.eResultsData[i].currentGPA.toPrecision(3));
            rowdata.push(this.eResultsData[i].actualCredit);
            rowdata.push(this.eResultsData[i].creditEarned);
            rowdata.push(this.eResultsData[i].cumulativeCredit);
            rowdata.push(this.eResultsData[i].cumulativeGPA.toPrecision(3));
            let trail = this.eResultsData[i].trailCourses;
            let remark = [];
            if (trail.length > 0) {
                remark.push(`Tr(${trail.length})`);
                for (var k = 0; k < trail.length; k++) {
                    remark.push(trail[k].courseCode);
                }
            }
            else {
                rowdata.push("Pass");
            }
            rowdata.push(remark.join(","));
            rows.push(rowdata);
        }
        return rows;
    }
    generateBroadSheet(academicYear, programId, level, semester) {
        const doc = new jsPDF({
            orientation: "l",
            unit: "mm",
            format: "a4",
        });
        let program = this.getPrograms().find((x) => x.programId === programId);
        let department = this.getByDepartment().find((x) => x.departmentId === program.departmentId);
        doc.setFontSize(11);
        doc.setTextColor("black");
        doc.text("University of Energy and Natural Resources", 100, 8);
        //
        doc.setFontSize(10);
        doc.text(`Academic Year: ${academicYear}`, 14, 15);
        doc.text(`Department: ${department.name}`, 14, 19);
        doc.text(`Program: ${program.name}`, 14, 23);
        //
        var current = new Date();
        doc.text(`Level: ${level} `, 185, 15);
        doc.text(`Semester: ${semester} `, 185, 19);
        doc.text(`Date Issued(d/m/y): ${current.toLocaleString()}`, 185, 23);
        //
        doc.setFontSize(10);
        autoTable(doc, {
            html: "#approveTable",
            startY: 30,
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
        doc.save(`broadsheet ${program.name}.pdf`);
    }
}
//# sourceMappingURL=broadSheetVm.js.map