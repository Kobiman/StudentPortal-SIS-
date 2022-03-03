import { CommonService } from "../services/commonService";
import { ViewModelHelper } from "../viewModelHelper";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { BallLoader } from "../loader/ballLoader";
import { HttpService } from "../services/httpService";
import { Command } from "../Command";
export class ExamsListVm {
  viewModelHelper: ViewModelHelper;
    cCode: string;
  courses: any[] = [];
  updateCourseCommand: Command = new Command();
  
  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();  
  }

   public async getExamsList(academicYear,semester) {
     BallLoader.show();
     debugger
    const data = await new HttpService().get(
      `Course/GetAttendanceList?academicYear=${academicYear}&semester=${semester}`);
    this.courses = data.value;
    BallLoader.hide();
  }

  setCourses = () => {
    let course = [];
    for (var i = 0; i < this.courses.length; i++){
      
    }
  }

   getAcademicYear = () => {
    return this.commonService.lookups.filter((x)=>x.type==="ACADEMIC YEAR");
  }; 

   getSemester = () => {
    return this.commonService.lookups.filter((x)=>x.type==="SEMESTER");
  }; 



  async generateExamsList(cCode) {
        // var student = this.shownStudentList.find((x) => x.indexNumber === indexNumber);
        // var results = await this.getStudentResults(indexNumber);
        const examsList = new jsPDF({
            unit: "mm",
            format: "a4",
        });
      
        const offset = 5;
        const logoWidth = 25;
        const logoHeight = 30;
       
        let img = "../assets/uenr-logo-768x998.png";
        examsList.addImage(img, "jpeg", offset + 10, offset + 15, logoWidth, logoHeight);

        examsList.setFontSize(14);
        examsList.setTextColor("#058709");
        examsList.text("UNIVERSITY OF ENERGY AND NATURAL RESOURCES", offset + logoWidth + 22.5, offset + 20);

        examsList.setTextColor("#000");
        examsList.setFontSize(11);
        examsList.text("Academic and Students Affair Division", offset + logoWidth + 53, offset + 24);
        examsList.setFontSize(9);
        examsList.text("P.O Box 214, Sunyani-Ghana || Email: examinations@uenr.edu.gh", offset + logoWidth + 40, offset + 28);
        
        examsList.setFontSize(11);
        examsList.text("EXAMINATION LIST", 100, offset + logoHeight + 5);
        //
      
        examsList.setFontSize(10);
        examsList.text(`Program: ${""}`, 14, 60);
        examsList.text(`level: ${""}`, 14, 64);
        examsList.text(`Code: ${""}`, 14, 68);
        examsList.text(`Course Title: ${""}`, 14, 72);
      
        var current = new Date();
        examsList.text(`Credit Hours: ${""} `, 128, 60);
        examsList.text(`Semester: ${""} `, 128, 64);
        examsList.text(`Date Issued(d/m/y): ${current.toLocaleString()}`, 128, 68);
        examsList.text(`Lecturer: ${""} `, 128, 72);
      
      examsList.setFontSize(10);
        autoTable(examsList, {
        html: "#attendance",
        startY: 80,
        theme: "plain",
        styles: { fontStyle: "normal", fontSize: 7, cellWidth:"auto", lineWidth: 0.2, minCellHeight: 0.5, cellPadding: 0.4, overflow: "linebreak", lineColor: 10 },
        });
        examsList.save(`exams_form_${""}.pdf`);
  }
 
}