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
var editstatus = "";
export class LecturerProfileVm {
    constructor(commonService) {
        this.commonService = commonService;
        //FETCH A LECTURER WITH HIS/HER ID 
        this.getLecturer = () => __awaiter(this, void 0, void 0, function* () {
            this.lecturer = this.commonService.lecturers.find(x => x.staffId === App.user.profile.userId);
        });
    }
    /// GET THE DEPARTMENT FROM THE DEPARTMENT ID
    getDepartment(departmentId) {
        var _a;
        return (_a = this.commonService.departments.find((department) => department.departmentId === departmentId)) === null || _a === void 0 ? void 0 : _a.name;
    }
    //ENABLE AND DISABLE TEXTBOXES ON A CLICK
    enableTexbox() {
        var txtStaffId = document.getElementById("staffId");
        var txtContact = document.getElementById("contact");
        var txtEmyContact = document.getElementById("emyContact");
        var txtPersonalEmail = document.getElementById("personalEmail");
        document.getElementById("save-visibility").style.visibility = "visible";
        var txtBorderChange = document.getElementsByClassName("editTable");
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
    profileImagePreview(e) {
        if (e.target.files.length > 0) {
            let file;
            const fileReader = new FileReader();
            file = e.target.files[0];
            //
            fileReader.readAsDataURL(file);
            fileReader.onload = (e) => {
                let imgElement = document.getElementById("uploaded-img");
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
        var txtBorderChange = document.getElementsByClassName("editTable");
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
//# sourceMappingURL=lecturerProfileVm.js.map