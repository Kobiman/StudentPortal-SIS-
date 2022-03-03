import { CommonService } from "../services/commonService";
import { App } from "../app";
import { _ } from "../group";

var editstatus = "";
export class LecturerProfileVm {
    lecturer:any;
    constructor(private commonService: CommonService) {
   
    }
     //FETCH A LECTURER WITH HIS/HER ID 
   getLecturer = async () => {
      this.lecturer =  this.commonService.lecturers.find(x=> x.staffId === App.user.profile.userId);   
   }

  /// GET THE DEPARTMENT FROM THE DEPARTMENT ID
  getDepartment(departmentId: string) {
    return this.commonService.departments.find((department) => department.departmentId === departmentId)?.name;
  }

  //ENABLE AND DISABLE TEXTBOXES ON A CLICK
  enableTexbox() {
    var txtStaffId = document.getElementById("staffId");
    var txtContact = document.getElementById("contact");
    var txtEmyContact = document.getElementById("emyContact");
    var txtPersonalEmail = document.getElementById("personalEmail");
    document.getElementById("save-visibility").style.visibility = "visible";
    var txtBorderChange = document.getElementsByClassName("editTable") as HTMLCollectionOf<HTMLElement>;
    if (editstatus == "") {
      txtStaffId.removeAttribute("disabled");
      txtContact.removeAttribute("disabled");
      txtEmyContact.removeAttribute("disabled");
      txtPersonalEmail.removeAttribute("disabled");
      editstatus = "edited";
      for (var x in txtBorderChange) {
        txtBorderChange[x].style.borderColor = "#807e7e";
      }
    }
  }
  //Upload and preview image
  profileImagePreview(e: any) {
    if (e.target.files.length > 0) {
      let file;
      const fileReader = new FileReader();
      file = e.target.files[0];
      //
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: Event) => {
        let imgElement: HTMLImageElement = <HTMLImageElement>document.getElementById("uploaded-img");

        imgElement.srcset = fileReader.result.toString();
      };
    }
  }
  //DISABLE AND DISABLE TEXTBOXES ON A CLICK
  disableTextBox() {
    var txtStaffId = document.getElementById("staffId");
    var txtContact = document.getElementById("contact");
    var txtEmyContact = document.getElementById("emyContact");
    var txtPersonalEmail = document.getElementById("personalEmail");
    var txtBorderChange = document.getElementsByClassName("editTable") as HTMLCollectionOf<HTMLElement>;
    document.getElementById("fade").style.visibility = "hidden";
    document.getElementById("save-visibility").style.visibility = "hidden";
    if (editstatus == "edited") {
      txtStaffId.setAttribute("disabled", "disabled");
      txtContact.setAttribute("disabled", "disabled");
      txtEmyContact.setAttribute("disabled", "disabled");
      txtPersonalEmail.setAttribute("disabled", "disabled");
      for (var x in txtBorderChange) {
        txtBorderChange[x].style.borderColor = "#bebebe";
      }
    }
  }
}
