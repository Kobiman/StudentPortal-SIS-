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
import { _ } from "../group";
import { BallLoader } from "../loader/ballLoader";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { HttpService } from "../services/httpService";
const dummyJspdf = new jsPDF();
export class TranscriptGenerationVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.getStudentResults = (indexNumber) => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                const data = yield new HttpService().get(`Student/CheckResults/${indexNumber}`);
                this.student = data.value;
                this.results = this.student.examResults;
                BallLoader.hide();
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
        this.getLookups = () => {
            this.academicYears = this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");
            this.semesters = this.commonService.lookups.filter((x) => x.type === "SEMESTER");
            this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
            this.enrollmentOptions = this.commonService.lookups.filter((x) => x.type == "ENROLLMENT OPTION");
            this.program = this.commonService.lookups.filter((x) => x.type == "PROGRAM");
        };
        this.viewModelHelper = new ViewModelHelper();
        this.getLookups();
    }
    generateTranscript() {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = 5;
            var transcriptFile = new jsPDF();
            const WIDTH = transcriptFile.internal.pageSize.width;
            const HEIGHT = transcriptFile.internal.pageSize.height;
            transcriptFile.setFontSize(10);
            transcriptFile.setLineWidth(1.2);
            const logoWidth = 25;
            const logoHeight = 30;
            let img = "../assets/uenr-logo-768x998.png";
            transcriptFile.addImage(img, "jpeg", offset + 10, offset + 15, logoWidth, logoHeight);
            transcriptFile.setFontSize(14);
            transcriptFile.setTextColor("#058709");
            transcriptFile.text("UNIVERSITY OF ENERGY AND NATURAL RESOURCES", offset + logoWidth + 22.5, offset + 20);
            transcriptFile.setTextColor("#000");
            transcriptFile.setFontSize(11);
            transcriptFile.text("Academic and Students Affair Division", offset + logoWidth + 53, offset + 24);
            transcriptFile.setFontSize(9);
            transcriptFile.text("P.O Box 214, Sunyani-Ghana || Email: registrar@uenr.edu.gh", offset + logoWidth + 45, offset + 28);
            //
            transcriptFile.setFontSize(14);
            transcriptFile.text("TRANSCRIPT OF ACADEMIC RECORD", offset + logoWidth + 45, offset + 37);
            transcriptFile.setFillColor("#628d9c");
            transcriptFile.rect(offset + 3, offset + logoHeight + 20, WIDTH - (offset + offset) - 6, 6, "F");
            //
            transcriptFile.setFontSize(11);
            transcriptFile.setTextColor("#d0d0d0");
            transcriptFile.text("A BLACK AND WHITE DOCUMENT IS NOT OFFICIAL", offset + logoWidth + 22.5, offset + logoHeight + 25);
            transcriptFile.setFillColor("#000");
            transcriptFile.setTextColor("#000");
            //
            transcriptFile.setFontSize(11);
            transcriptFile.text("Name:", offset + 10, offset + logoHeight + 32);
            transcriptFile.text(`${this.student.name}`, offset + 30, offset + logoHeight + 32);
            transcriptFile.text("Gender:", offset + 10, offset + logoHeight + 38);
            transcriptFile.text(`${this.student.gender == "M" ? "Male" : "Female"}`, offset + 30, offset + logoHeight + 38);
            transcriptFile.text(`FGPA:`, offset + 10, offset + logoHeight + 45);
            transcriptFile.text(`${this.commonService.culculateGPA(this.results)}`, offset + 30, offset + logoHeight + 45);
            transcriptFile.text("Program:", offset + 10, offset + logoHeight + 51);
            transcriptFile.text(`${this.student.program}`, offset + 30, offset + logoHeight + 51);
            transcriptFile.text("Major:", offset + 10, offset + logoHeight + 57);
            transcriptFile.text(`${''}`, offset + 30, offset + logoHeight + 57);
            //
            let dateIssued = new Date().toLocaleDateString();
            transcriptFile.text("Exams Number:", offset + 122, offset + logoHeight + 32);
            transcriptFile.text(`${this.student.indexNmber}`, offset + 159, offset + logoHeight + 32);
            transcriptFile.text("Date of Birth(y/m/d):", offset + 122, offset + logoHeight + 38);
            transcriptFile.text(`${this.student.dateOfBirth.substring(0, 10)}`, offset + 159, offset + logoHeight + 38);
            transcriptFile.text("Total Credit:", offset + 122, offset + logoHeight + 45);
            transcriptFile.text(`${this.culculateTotalCredit(this.results)}`, offset + 159, offset + logoHeight + 45);
            transcriptFile.text("Date Issued(m/d/y):", offset + 122, offset + logoHeight + 51);
            transcriptFile.text(`${dateIssued}`, offset + 159, offset + logoHeight + 51);
            transcriptFile.text("Class:", offset + 122, offset + logoHeight + 57);
            transcriptFile.text("Second Class Lower", offset + 159, offset + logoHeight + 57);
            transcriptFile.rect(offset + 3, offset + logoHeight + 61, WIDTH - (offset + offset) - 6, 1, "F");
            // making changes here
            let groupedResults = _.groupBy(this.results, function (result) {
                return {
                    academicYear: result.academicYear,
                    semester: result.semester,
                    level: result.level,
                };
            });
            let examResults = Object.keys(groupedResults).map(function (result) {
                let r = JSON.parse(result);
                return {
                    academicYear: r.academicYear,
                    semester: r.semester.substring(9),
                    level: r.level,
                    data: groupedResults[result],
                };
            });
            let previousResults = [];
            for (const result of examResults) {
                previousResults.push(...result.data);
                result.semester.substring(8);
                let finalY = transcriptFile.previousAutoTable.finalY;
                //Auto table data generation
                autoTable(transcriptFile, {
                    head: [
                        [`AC. YEAR: ${result.academicYear}`, `LEVEL: ${result.level}`, `SEMESTER: ${result.semester}`, `CGPA:  ${this.commonService.culculateCGPA(previousResults)}`, ""],
                        ["Code", "Course", "Credit", "GP", "Grade"]
                    ],
                    body: this.setBody(result),
                    theme: "plain",
                    startY: finalY == undefined ? 100 : finalY + 1,
                    styles: {
                        fontSize: 8, lineWidth: 0, minCellHeight: 1, cellPadding: 1, overflow: "linebreak",
                        cellWidth: "auto", fontStyle: "normal",
                    },
                    columnStyles: {
                        0: { cellWidth: 20 },
                        1: { cellWidth: 100 },
                        2: { cellWidth: 22 },
                        3: { cellWidth: 20 },
                        4: { cellWidth: 20 },
                    },
                    headStyles: { fontStyle: "bold" },
                    didDrawPage: function (examResults) {
                        // Reseting top margin. The change will be reflected only after print the first page.
                        transcriptFile.setLineWidth(1.0);
                        transcriptFile.setDrawColor("#000");
                        transcriptFile.rect(offset, offset * 1.5, WIDTH - (offset + offset), HEIGHT - offset * 3);
                        transcriptFile.setLineWidth(0.5);
                        transcriptFile.rect(offset + 3, offset * 1.5 + 3, WIDTH - (offset + offset) - 6, HEIGHT - (offset * 3 + 6));
                        let finalY = transcriptFile.previousAutoTable.finalY;
                        examResults.settings.startY = finalY == undefined ? 100 : finalY + 15;
                    },
                    // margin: { left: 10, top:100},
                    // pageBreak: 'auto',   
                });
                //doc.addPage()
            }
            this.degreeClassification(transcriptFile);
            transcriptFile.save(`stu_transcript_${this.student.indexNmber}.pdf`);
            //End of auto table data
        });
    }
    ;
    setBody(result) {
        let body = [];
        for (let x of result.data) {
            let innerTable = [];
            innerTable.push(x.courseCode);
            innerTable.push(x.courseName);
            innerTable.push(x.credit);
            innerTable.push(x.gradePoint);
            innerTable.push(x.grade);
            body.push(innerTable);
        }
        body.push([" ", " ", " ", " ", `GPA: ${this.commonService.culculateGPA(result.data)}`]);
        return body;
    }
    //class.............
    getDegreeClassification(culculateGPA) {
        let studentClass;
        switch (culculateGPA) {
            case 4:
                studentClass = "First Class";
                break;
            case 3:
                studentClass = "Second Class Upper";
                break;
            case 2:
                studentClass = "Second Class Lower";
                break;
            case 1:
                studentClass = "Third Class";
                break;
            // case range(1.00-1.49):
            // studentClass="Pass";
            //         break;
            default:
                studentClass = "no class1";
                //break;
                console.log(studentClass);
        }
    }
    //end of class...........
    //tottal credit calculatetor
    culculateTotalCredit(results) {
        return results.map(x => x.credit).reduce((a, b) => a + b, 0);
    }
    degreeClassification(transcriptFile) {
        //var gradingSystem = new jsPDF();
        console.log("new page");
        transcriptFile.addPage("a4", "p");
        const offset = 5;
        //const transcript = new jsPDF();
        const WIDTH = transcriptFile.internal.pageSize.width;
        const HEIGHT = transcriptFile.internal.pageSize.height;
        transcriptFile.setFontSize(10);
        transcriptFile.setLineWidth(1.2);
        const logoWidth = 25;
        const logoHeight = 30;
        transcriptFile.setFontSize(18);
        transcriptFile.setTextColor("#000");
        transcriptFile.text("DEGREE CLASSIFICATION", (offset + logoWidth + 22.5), offset + logoHeight + 33);
        transcriptFile.setFillColor("#774e00");
        transcriptFile.rect(offset + 3, offset + logoHeight + 40, WIDTH - (offset + offset) - 6, 0.5, "F");
        // degree values
        transcriptFile.setFontSize(12);
        transcriptFile.setFillColor("#000");
        transcriptFile.rect((offset + logoWidth) + 22.5, offset + logoHeight + 46, 2, 2, "F");
        transcriptFile.text("First Class Honours: 3.60-4.00", (offset + logoWidth) + 26, offset + logoHeight + 48.5);
        transcriptFile.rect((offset + logoWidth) + 22.5, offset + logoHeight + 54, 2, 2, "F");
        transcriptFile.text("Second Class Honours (Upper Division): 3.00-3.59", (offset + logoWidth) + 26, offset + logoHeight + 56.5);
        transcriptFile.rect((offset + logoWidth) + 22.5, offset + logoHeight + 62, 2, 2, "F");
        transcriptFile.text("Second Class Honours (Lower Division): 2.00-2.99", (offset + logoWidth) + 26, offset + logoHeight + 64.5);
        transcriptFile.rect((offset + logoWidth) + 22.5, offset + logoHeight + 70, 2, 2, "F");
        transcriptFile.text("Third Class Honours: 1.00-1.99", (offset + logoWidth) + 26, offset + logoHeight + 72.5);
        transcriptFile.rect((offset + logoWidth) + 22.5, offset + logoHeight + 78, 2, 2, "F");
        transcriptFile.text("Pass: 1.00-1.99", (offset + logoWidth) + 26, offset + logoHeight + 80.5);
        transcriptFile.setFillColor("#774e00");
        transcriptFile.rect(offset + 3, offset + logoHeight + 86, WIDTH - (offset + offset) - 6, 0.5, "F");
        // grading system
        transcriptFile.setFontSize(18);
        transcriptFile.setTextColor("#000");
        transcriptFile.text("GRADING SYSTEM", (offset + logoWidth + 22.5), offset + logoHeight + 100);
        transcriptFile.setFillColor("#774e00");
        transcriptFile.rect(offset + 3, offset + logoHeight + 180, WIDTH - (offset + offset) - 6, 0.5, "F");
        autoTable(transcriptFile, {
            head: [
                ['Grade', "Mark (%)", "Interpretation", "Grade Point (GP)"]
            ],
            body: [
                ["A", "80-100", "Excellent", "4.00"],
                ["B+", "75-79", "Very Good", "3.50"],
                ["C+", "65-69", "Fairly Good", "2.50"],
                ["C", "60-64", "Average", "2.00"],
                ["D+", "55-59", "Below Average", "1.50"],
                ["D", "50-54", "Marginal Pass", "1.00"],
                ["E", "45-49", "Below Marginal Pass", "0.50"],
                ["F", "0-44", "Fail", "0.00"],
                ["I", "-", "Incomplete", "-"]
            ],
            startY: offset + logoHeight + 105,
            theme: "plain",
            styles: {
                fontSize: 8, lineWidth: 0.25, minCellHeight: 1.5, cellPadding: 1, overflow: "linebreak",
                lineColor: "#000",
                cellWidth: "auto", fontStyle: "normal", halign: 'center'
            }
        });
    }
    //generate statement of result......
    generateStatementOfResult() {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = 5;
            var statementOfResult = new jsPDF();
            const WIDTH = statementOfResult.internal.pageSize.width;
            const HEIGHT = statementOfResult.internal.pageSize.height;
            statementOfResult.setFontSize(10);
            statementOfResult.setLineWidth(0.29);
            const logoWidth = 25;
            const logoHeight = 30;
            statementOfResult.rect(offset, offset * 1.5, WIDTH - (offset + offset), HEIGHT - offset * 3);
            //statementOfResult.setLineWidth(0.5);
            //statementOfResult.rect(offset + 3, offset * 1.5 + 3, WIDTH - (offset + offset) - 6, HEIGHT - (offset * 3 + 6));
            let img = "../assets/uenr-logo-768x998.png";
            statementOfResult.addImage(img, "jpeg", offset + 10, offset + 15, logoWidth, logoHeight);
            statementOfResult.setFontSize(14);
            statementOfResult.setTextColor("#058709");
            statementOfResult.text("UNIVERSITY OF ENERGY AND NATURAL RESOURCES", offset + logoWidth + 22.5, offset + 20);
            statementOfResult.setTextColor("#000");
            statementOfResult.setFontSize(11);
            statementOfResult.text("Academic and Students Affair Division", offset + logoWidth + 53, offset + 24);
            statementOfResult.setFontSize(9);
            statementOfResult.text("P.O Box 214, Sunyani-Ghana || Email: registrar@uenr.edu.gh", offset + logoWidth + 45, offset + 28);
            //
            statementOfResult.setFontSize(14);
            statementOfResult.text("STATEMENT OF RESULTS", offset + logoWidth + 45, offset + 37);
            statementOfResult.setFillColor("#628d9c");
            statementOfResult.rect(5, offset + logoHeight + 20, WIDTH - (offset) - 5.5, 6, "F");
            //
            statementOfResult.setFontSize(11);
            statementOfResult.setTextColor("#d0d0d0");
            statementOfResult.text("A BLACK AND WHITE DOCUMENT IS NOT OFFICIAL", offset + logoWidth + 22.5, offset + logoHeight + 25);
            statementOfResult.setFillColor("#000");
            statementOfResult.setTextColor("#000");
            //
            statementOfResult.setFontSize(11);
            statementOfResult.text("Name:", offset + 10, offset + logoHeight + 32);
            statementOfResult.text(`${this.student.name}`, offset + 30, offset + logoHeight + 32);
            statementOfResult.text("Gender:", offset + 10, offset + logoHeight + 38);
            statementOfResult.text(`${this.student.gender}`, offset + 30, offset + logoHeight + 38);
            statementOfResult.text(`CGPA:`, offset + 10, offset + logoHeight + 45);
            statementOfResult.text(`${this.commonService.culculateGPA(this.results)}`, offset + 30, offset + logoHeight + 45);
            statementOfResult.text("Program:", offset + 10, offset + logoHeight + 51);
            statementOfResult.text(`${this.student.program}`, offset + 30, offset + logoHeight + 51);
            //const pages = statementOfResult.getNumberOfPages();
            //statementOfResult.text("Major:", offset + 10, offset + logoHeight + 57);
            //statementOfResult.text(`${student.specialization}`, offset + 30, offset + logoHeight + 57);
            //
            let selectedDateTime = (this.student.dateOfBirth);
            let fomatDob = selectedDateTime.split("/");
            let preDate = fomatDob[0].split("-");
            let nDate = preDate[1] + "/" + preDate[2] + "/" + preDate[0];
            let dateIssued = new Date().toLocaleDateString();
            statementOfResult.setFontSize(11);
            statementOfResult.text("Exams Number:", offset + 122, offset + logoHeight + 32);
            statementOfResult.text(`${this.student.indexNmber}`, offset + 164, offset + logoHeight + 32);
            statementOfResult.text("Date of Birth(m/d/y)", offset + 122, offset + logoHeight + 38);
            statementOfResult.text(`${nDate}`, offset + 164, offset + logoHeight + 38);
            statementOfResult.text("Total Credit:", offset + 122, offset + logoHeight + 45);
            statementOfResult.text(`${this.culculateTotalCredit(this.results)}`, offset + 164, offset + logoHeight + 45);
            statementOfResult.text("Date Issued(m/d/y):", offset + 122, offset + logoHeight + 51);
            statementOfResult.text(`${dateIssued}`, offset + 165, offset + logoHeight + 51);
            statementOfResult.setLineWidth(0.25);
            statementOfResult.rect(offset, logoHeight + 61, WIDTH - (offset) - 5.5, 1, "F");
            // making changes here
            let groupedResults = _.groupBy(this.results, function (result) {
                return {
                    academicYear: result.academicYear,
                    semester: result.semester,
                    level: result.level,
                };
            });
            let examResults = Object.keys(groupedResults).map(function (result) {
                let r = JSON.parse(result);
                return {
                    academicYear: r.academicYear,
                    semester: r.semester.substring(9),
                    level: r.level,
                    data: groupedResults[result],
                };
            });
            //const pages = statementOfResult.internal.getNumberOfPages();
            const pageWidth = statementOfResult.internal.pageSize.width; //Optional
            const pageHeight = statementOfResult.internal.pageSize.height; //Optional
            statementOfResult.setFontSize(10); //Optional
            let previousResults = [];
            for (const result of examResults) {
                let finalY = statementOfResult.previousAutoTable.finalY;
                previousResults.push(...result.data);
                result.semester.substring(8);
                //Auto table data generation
                autoTable(statementOfResult, {
                    head: [
                        [`LEVEL: ${result.level}`, `SEMESTER: ${result.semester}`, "", "", ""],
                        ["Code", "Course", "Credit", "Mark", "Grade"]
                    ],
                    body: this.setBodyMarks(result),
                    startY: finalY == undefined ? 100 : finalY + 1,
                    theme: "plain",
                    styles: {
                        fontSize: 8, lineWidth: 0, minCellHeight: 1, cellPadding: 1, overflow: "linebreak",
                        cellWidth: "auto", fontStyle: "normal",
                    },
                    columnStyles: {
                        0: { cellWidth: 20 },
                        1: { cellWidth: 100 },
                        2: { cellWidth: 22 },
                        3: { cellWidth: 20 },
                        4: { cellWidth: 20 },
                    },
                    headStyles: { fontStyle: "bold" },
                    didDrawPage: function (examResults) {
                        // Reseting top margin. The change will be reflected only after print the first page.
                        statementOfResult.setLineWidth(1.0);
                        statementOfResult.setDrawColor("#000");
                        statementOfResult.rect(offset, offset * 1.5, WIDTH - (offset + offset), HEIGHT - offset * 3);
                        statementOfResult.setLineWidth(0.5);
                        statementOfResult.rect(offset + 3, offset * 1.5 + 3, WIDTH - (offset + offset) - 6, HEIGHT - (offset * 3 + 6));
                        let finalY = statementOfResult.previousAutoTable.finalY;
                        examResults.settings.startY = finalY == undefined ? 100 : finalY + 15;
                    },
                });
            }
            //this.degreeClassification(statementOfResult);
            statementOfResult.save(`stu_statementOfResult_${this.student.indexNmber}.pdf`);
            //End of auto table data
        });
    }
    ;
    //end of generation of statement of result..........
    setBodyMarks(result) {
        let body = [];
        for (let x of result.data) {
            let innerTable = [];
            innerTable.push(x.courseCode);
            innerTable.push(x.courseName);
            innerTable.push(x.credit);
            innerTable.push(x.totalMark).toFixed(1);
            innerTable.push(x.grade);
            body.push(innerTable);
            console.log("the value of result" + x);
        }
        body.push([" ", " ", " ", " ", `GPA: ${this.commonService.culculateGPA(result.data)}`]);
        return body;
    }
}
//# sourceMappingURL=transcriptGenerationVm.js.map