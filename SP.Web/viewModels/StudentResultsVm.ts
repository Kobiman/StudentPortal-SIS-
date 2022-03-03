import { BindingList2 } from "../BindingList2";
import { ViewModelHelper } from "../viewModelHelper";
import { CommonService } from "../services/commonService";
import { BallLoader } from "../loader/ballLoader";
import { _ } from "../group";
import { HttpService } from "../services/httpService";
import { App } from "../app";
import { Command } from "../Command";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";

export class StudentResultsVm {
  viewModelHelper: ViewModelHelper;
  totalCredit: string;
  totalGPA: string;
  resultChangedCommand: Command;
  cummulativeGPA: string;
  cummulativeCredit: string;
  groupedGrades: any;

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.getLookups();
    this.getPrograms();
    this.request = {};
    this.resultChangedCommand = new Command();
  }

  resultsList: any[] = [];
  groupedResults: any[] = [];
  results: any[];
  request: any;
  semesters: any[] = [];
  programs: any[] = [];
  levels: any[] = [];
  querys: any = [];
  student: any;

  getStudentResults = async () => {
    try {
      BallLoader.show();
      const data = await new HttpService().get("Student/CheckResults/" + App.user.profile.userId);
      this.student = data.value;
      this.results = this.student.examResults;
      this.resultsSummaryCalc(this.results);
      this.groupedResults = this.groupCourses(this.results);
      BallLoader.hide();
    } catch (error) {
      console.log(error);
    }
  };

  resultsSummaryCalc = (results) => {
    var totalCredit = 0;
    var totalGPA = 0;
    var calcTGP = 0;
    for (var i = 0; i < results.length; i++) {
      totalCredit += this.results[i].credit;
      calcTGP += this.results[i].credit * this.results[i].gradePoint;
    }
    totalGPA = calcTGP / totalCredit;
    this.totalCredit = `${totalCredit}`;
    this.totalGPA = `${totalGPA.toPrecision(3)}`;
    this.cummulativeGPA = `${totalGPA.toPrecision(3)}`;
    this.cummulativeCredit = `${totalCredit}`;
  };

  groupCourses(arr) {
    let groups = _.groupBy(arr, function (result) {
      return {
        semester: result.semester,
        level: result.level,
      };
    });

    let groupedValues = [];
    let accumulatedResults = [];
    for (var group of Object.keys(groups)) {
      let j = JSON.parse(group);
      let g = groups[group];
      accumulatedResults.push(...g);
      groupedValues.push({
        semester: j.semester,
        level: j.level,
        gpa: this.commonService.culculateGPA(g),
        cugpa: this.commonService.culculateCGPA(accumulatedResults),
        credit: g.map((x) => x.credit).reduce((a, b) => a + b, 0),
        cuCredit: accumulatedResults.map((x) => x.credit).reduce((a, b) => a + b, 0),
        results: g,
      });
    }
    return groupedValues;
  }

  getPrograms = () => {
    this.programs = this.commonService.programs;
  };

  getLookups = () => {
    this.semesters = this.commonService.lookups.filter((x) => x.type === "SEMESTER");
    this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
  };

  addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(30);
      doc.setTextColor(220);
      doc.text(30, doc.internal.pageSize.height - 60, "THIS COPY OF RESULTS IS NOT OFFICIAL ", null, 45);
    }
    return doc;
  }

  generateResultsPDF() {
    var doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    //
    const WIDTH = doc.internal.pageSize.width;
    const HEIGHT = doc.internal.pageSize.height;
    doc.rect(5, 5 * 1.5, WIDTH - 10, HEIGHT - 5 * 3);
    doc.setLineWidth(0.5);
    doc.rect(8, 5 * 1.5 + 3, WIDTH - 10 - 6, HEIGHT - (5 * 3 + 6));
    //

    doc.setFontSize(11);
    doc.setTextColor("black");
    doc.text("UNIVERSITY OF ENERGY AND NATURAL RESOURCES", 52, 20);
    doc.setLineWidth(0.5);
    doc.rect(8, 22, WIDTH - 10 - 6, 0.1);
    //

    doc.setFontSize(10);
    doc.text(`Name: ${this.student.name}`, 14, 30);
    doc.text(`Index Number: ${App.user.profile.UserId}`, 14, 34);
    doc.text(`Program: ${this.student.program}`, 14, 38);
    doc.text(`CuCredit: ${this.cummulativeCredit}`, 14, 42);
    doc.text(`CuGPA: ${this.cummulativeGPA}`, 14, 46);
    var current = new Date();
    doc.text(`Date Issued(d/m/y): ${current.toLocaleString()}`, 14, 50);

    //
    doc.setFillColor("#628d9c");
    doc.rect(8, 55, WIDTH - 10 - 6, 4, "F");
    doc.text("THIS COPY OF RESULTS IS NOT OFFICIAL ", 65, 58);

    var results = this.groupedResults;
    doc = this.addWaterMark(doc);
    // Generating the table from the html table tag
    for (const result of results) {
      let finalY = (doc as any).previousAutoTable.finalY;
      autoTable(doc, {
        head: [
          [
            `LEVEL: ${result.level}`,
            `${result.semester} Crd:${result.credit}  CCrd:${result.cuCredit}  GPA:${result.gpa}  CGPA:${result.cugpa}`,
            "",
            "",
            "",
            "",
          ],
          ["Code", "Course", "Credit", "Total mark", "Grade", "GP"],
        ],
        body: this.setBody(result.results),
        startY: finalY == undefined ? 65 : finalY + 5,
        theme: "plain",
        styles: { fontSize: 7, cellWidth: "auto", minCellHeight: 0.5, cellPadding: 0.4 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 100 },
          2: { cellWidth: 15 },
          3: { cellWidth: 15 },
          4: { cellWidth: 15 },
          5: { cellWidth: 15 },
        },
        headStyles: { fontStyle: "bold" },
        didDrawPage: function (results) {
          doc.rect(5, 5 * 1.5, WIDTH - 10, HEIGHT - 5 * 3);
          doc.setLineWidth(0.5);
          doc.rect(8, 5 * 1.5 + 3, WIDTH - 10 - 6, HEIGHT - (5 * 3 + 6));
          let finalY = (doc as any).previousAutoTable.finalY;
          results.settings.startY = finalY == undefined ? 65 : finalY + 15;
        },
      });
    }
    doc.save(`stu_results_${App.user.profile.UserId}.pdf`);
  }

  setBody(result) {
    let body = [];
    for (let x of result) {
      let innerTable = [];
      innerTable.push(x.courseCode);
      innerTable.push(x.courseName);
      innerTable.push(x.credit);
      innerTable.push(x.totalMark);
      innerTable.push(x.grade);
      innerTable.push(x.gradePoint);
      body.push(innerTable);
    }
    return body;
  }
}
