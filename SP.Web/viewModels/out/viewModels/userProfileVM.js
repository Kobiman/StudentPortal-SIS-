var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { App } from "../app";
import { BallLoader } from "../loader/ballLoader";
import { HttpService } from "../services/httpService";
export class UserProfileVm {
    constructor(commonService) {
        this.commonService = commonService;
        //FETCH SPECIAL STUDENT RESOURCES
        this.getStudentList = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                debugger;
                const data = yield this.httpService.get(`Student/GetStudent/${App.user.profile.userId}`);
                this.student = data.value;
                var school = yield new HttpService().get(`School/GetSchoolByProgram/${this.student.programId}`);
                this.student.school = school.value.name;
                this.student.studentName = `${this.student.surname} ${this.student.othernames}`;
                let program = yield new HttpService().get(`Program/GetProgram/${this.student.programId}`);
                this.student.program = program.value.name;
                BallLoader.hide();
                return this.student;
            }
            catch (error) {
                console.log(error);
            }
        });
        this.httpService = new HttpService();
    }
    //ENABLE AND DISABLE TEXTBOXES ON A CLICK
    // EnableTextBox() {
    //   var txtContact1=document.getElementById("contact1");
    //   var textContact2=document.getElementById("contact2");
    //   var txtGender=document.getElementById("gender");
    //   var txtPersonalEmail=document.getElementById("personalEmail");
    //   document.getElementById("fade").style.visibility="visible";
    //   document.getElementById("save-visibility").style.visibility="visible";
    //   var txtMaritalStaus=document.getElementById("maritalStatus");
    //   var txtBorderChange=document.getElementsByClassName("editTable")as HTMLCollectionOf<HTMLElement>
    //  var i=0;
    //       if (editstatus =="") {
    //           txtContact1.removeAttribute("disabled");
    //           textContact2.removeAttribute("disabled");
    //           txtGender.removeAttribute("disabled");
    //           txtPersonalEmail.removeAttribute("disabled");
    //           txtMaritalStaus.removeAttribute("disable");
    //           txtContact1.removeAttribute("disabled");
    //           editstatus="edited";
    //         for(var x in txtBorderChange) {
    //         txtBorderChange[x].style.borderColor = "#807e7e";}
    //       }
    //     }
    EnableTextBox() {
        document.getElementById("profileSaveMobileButton").style.visibility =
            "visible";
        document.getElementById("fade").style.visibility = "visible";
        document.getElementById("save-visibility").style.visibility = "visible";
        let input = document.querySelectorAll("[input]");
        input.forEach(function (item) {
            item.toggleAttribute("disabled");
        });
    }
    //Disable all the selected text fields
    // DisableTextBox() {
    //   var txtContact1=document.getElementById("contact1");
    //   var textContact2=document.getElementById("contact2");
    //   var txtGender=document.getElementById("gender");
    //   var txtPersonalEmail=document.getElementById("personalEmail");
    //   var txtMaritalStaus=document.getElementById("maritalStatus")
    //    document.getElementById("fade").style.visibility="hidden";
    //     document.getElementById("save-visibility").style.visibility="hidden";
    //    var txtBorderChange=document.getElementsByClassName("editTable")as HTMLCollectionOf<HTMLElement>
    //           if (editstatus =="edited") {
    //            txtContact1.setAttribute("disabled", "disabled");
    //            textContact2.setAttribute("disabled", "disabled");
    //            txtGender.setAttribute("disabled", "disabled");
    //            txtPersonalEmail.setAttribute("disabled", "disabled");
    //            txtMaritalStaus.setAttribute("disabled", "disabled");
    //            editstatus="";
    //             for(var x in txtBorderChange) {
    //         txtBorderChange[x].style.borderColor = "#bebebe";}
    //       }
    // }
    DisableTextBox() {
        document.getElementById("profileSaveMobileButton").style.visibility =
            "hidden";
        let input = document.querySelectorAll("[input]");
        input.forEach(function (item) {
            item.toggleAttribute("disabled");
        });
    }
    //Upload and preview image
    profileImagePreview(e) {
        if (e.target.files.length > 0) {
            let file;
            const fileReader = new FileReader();
            file = e.target.files[0];
            //
            fileReader.readAsDataURL(file);
            fileReader.onload = (e) => {
                let imgElement = (document.getElementById("uploaded-img"));
                imgElement.srcset = fileReader.result.toString();
            };
        }
    }
}
//# sourceMappingURL=userProfileVM.js.map