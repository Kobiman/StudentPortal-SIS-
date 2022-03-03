import { BallLoader } from "../loader/ballLoader";
import { SelectedCourse } from "../models/SelectedCourse";
import { CommonService } from "../services/commonService";
import { ViewModelHelper } from "../viewModelHelper";
import { _ } from "../group";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { HttpService } from "../services/httpService";
import {
  ResultsHead,
  ResultsRow,
} from "../views/resultsSummary/resultsSummaryTable";

export class ResultsSummaryVm {
  viewModelHelper: ViewModelHelper;
  mountedCourse: SelectedCourse = new SelectedCourse();
  checked: boolean;

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.getPrograms();
    this.getLookups();
    // this.getByDepartment();
  }

  lookups: any[] = [];
  programs: any;
  levels: any;
  querys: any = [];
  semesters: any;
  selectedCourses: SelectedCourse[] = [];
  request: any;
  academicYear: any;
  examResults: any[] = [];
  eResultsData: any[] = [];
  summary = [
    {
      pass: 0,
      trail: 0,
      probation: 0,
      withdrawn: 0,
      defered: 0,
      suspended: 0,
      total: 0,
    },
  ];

  public async getStudentResults(program, academicYear, level, semester) {
    var request = {
      program: program,
      academicYear: academicYear,
      level: level,
      semester: semester,
    };
    BallLoader.show();

    const data = await new HttpService().post(
      "Department/GetExamResults",
      request
    );
    this.examResults = data.value;
    this.eResultsData = this.examResults;
    // let probation = this.eResultsData.filter((x) => x.progStatus === "probation");
    // let withdrawn = this.eResultsData.filter((x) => x.progStatus === "withdrawn");
    // let defered = this.eResultsData.filter((x) => x.progStat us === "defered");
    // let suspended = this.eResultsData.filter((x) => x.progStatus === "suspended");
    // let active = this.eResultsData.filter((x) => x.progStatus === "inprogress");
    // let pass = active.filter((x) => x.remark === "pass");
    // let trail = active.filter((x) => x.remark !=="pass");
    new ResultsHead(this).render();
    new ResultsRow(this).render();
    BallLoader.hide();
    console.log(this.eResultsData);
  }
  ///aprove result by academic board
  async approveResultByAcademicBoard(examResultId) {
    const data = await new HttpService().get("Department/ApproveResults?");

    // this.eResultsData.forEach((resultData) => {
    //   resultData["status"] = 2;
    //   console.log(resultData);
    // });
  }
  getPrograms = () => {
    return this.commonService.getProgramsByUserType();
  };

  getLookups = () => {
    this.semesters = this.commonService.lookups.filter(
      (x) => x.type === "SEMESTER"
    );
    this.levels = this.commonService.lookups.filter((x) => x.type === "LEVEL");
    this.academicYear = this.commonService.lookups.filter(
      (x) => x.type === "ACADEMIC YEAR"
    );
  };

  generateSummarySheet(academicYear, programId, level, semester) {
    const doc = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
    });
    let program = this.commonService.programs.find(
      (x) => x.programId === programId
    );
    let department = this.commonService.departments.find(
      (x) => x.departmentId === program.departmentId
    );
    let school = this.commonService.schools.find(
      (x) => x.schoolId === department.schoolId
    );

    //Logo Image
    let img = "../assets/uenr-logo-768x998.png";
    doc.addImage(img, "jpeg", 14, 10, 25, 30);

    //Header Files
    doc.setFontSize(8);
    var current = new Date();
    doc.text(`Date Issued(d/m/y): ${current.toLocaleString()}`, 14, 4);
    doc.setFontSize(14);
    doc.text("UNIVERSITY OF ENERGY AND NATURAL RESOURCES", 100, 10);
    doc.setFontSize(11);
    doc.text("Academic and Students Affairs Division", 120, 15);
    doc.setFontSize(12);
    doc.text("SUMMARY OF RESULTS", 130, 23);

    //left Program Particulars
    doc.setFontSize(11);
    doc.text(`School: ${department.schoolName}`, 14, 44);
    doc.text(`Program: ${program.name}`, 14, 50);
    doc.text(`Level: ${level} `, 14, 56);

    //right Program Particulars
    doc.text(`Department: ${department.name}`, 178, 44);
    doc.text(`Academic Year: ${academicYear}`, 178, 50);
    doc.text(`Semester: ${semester} `, 178, 56);

    //Summary table
    doc.text("Summary", 130, 64);
    autoTable(doc, {
      html: "#summmaryTable",
      startY: 68,
      theme: "plain",
      styles: {
        fontStyle: "normal",
        fontSize: 10,
        cellWidth: "auto",
        minCellHeight: 0.5,
        cellPadding: 0.4,
      },
    });

    // Second Table
    doc.text(
      `PASSED STUDENTS: Have satisfied all requirements as at ${semester}, ${academicYear} academic year`,
      60,
      (doc as any).previousAutoTable.finalY + 10
    );
    autoTable(doc, {
      html: "#summmaryDetailsTable",
      startY: (doc as any).previousAutoTable.finalY + 15,
      theme: "plain",
      styles: {
        fontStyle: "normal",
        fontSize: 15,
        cellWidth: "auto",
        minCellHeight: 0.5,
        cellPadding: 0.4,
      },
    });

    //Signature
    doc.text(
      ".....................................................",
      14,
      (doc as any).previousAutoTable.finalY + 30
    );
    let lecturerName = this.commonService.lecturers.find(
      (x) => x.lecturerId === school.lecturerId
    ).name;
    doc.text(`${lecturerName}`, 14, (doc as any).previousAutoTable.finalY + 35);
    doc.text(
      "(DEAN/CHAIRMAN, SCHOOL BOARD)",
      14,
      (doc as any).previousAutoTable.finalY + 40
    );

    //Page Numbering Codes
    const pages = (doc as any).internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.width; //Optional
    const pageHeight = doc.internal.pageSize.height; //Optional
    doc.setFontSize(10); //Optional
    for (let j = 1; j < pages + 1; j++) {
      let horizontalPos = pageWidth / 2; //Can be fixed number
      let verticalPos = pageHeight - 10; //Can be fixed number
      doc.setPage(j);
      doc.text(`page ${j} of ${pages}`, horizontalPos, verticalPos, {
        align: "center",
      });
    }
    doc.save(`ABF-${program.name}.pdf`);
  }
}
