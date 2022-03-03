import { BallLoader } from "../loader/ballLoader";
import { CommonService } from "../services/commonService";
import { ViewModelHelper } from "../viewModelHelper";
import { _ } from "../group";
import { HttpService } from "../services/httpService";
import { Toast } from "../toast/toast";

export class ControlsVm {
  viewModelHelper: ViewModelHelper;
  controls: any[]=[];
  programs: any[] = [];
  control: any[];
  active: boolean;
  controlType: string

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.getByDepartment();
  }

  public async getControls(academicYear) {
    BallLoader.show();
    const data = await new HttpService().get(
      `StatusControl/GetStatusControls?academicYear=${academicYear}`);
    this.controls = data.value;
    BallLoader.hide();
  }

  public async addControls(program,controlType,AcademicYear) {
    debugger
    BallLoader.show();
    let programId = this.commonService.programs.find((x) => x.name === program).programId;
    var request = {
      active: this.active,
      programId: programId,
      academicYear: AcademicYear,
      controlType: controlType,
    };
    const res = await new HttpService().post(
      "StatusControl/AddStatusControl",
      request
    );
    BallLoader.hide();
    if (res.isSucessful) {
      Toast.success(res.message);
    } else {
      Toast.error(res.message);
    }
    this.getControls(AcademicYear);
  }

  public async updateControl(programId,controlType,active,id) {
     debugger
     let departmentId = this.commonService.programs.find((x) => x.programId === programId).departmentId
     let schoolId = this.getByDepartment().find((x) => x.departmentId === departmentId).schoolId;
    var request = {
      id:id,
      active: active,
      programId: programId,
      academicYear: this.getSchools().find((x) => x.schoolId === schoolId).academicYear,
      controlType: controlType,
    };
    BallLoader.show();
    const res = await new HttpService().post(
      "StatusControl/UpdateStatusControl",
      request
    );
    BallLoader.hide();
    if (res.isSucessful) {
      Toast.success(res.message);
    } else {
      Toast.error(res.message);
    }
  }

  public async updateControls(active) {
    debugger
    var request = this.controls.map((x) => ({
      id:x.id,
      active: active,
      programId: x.programId,
      academicYear: x.academicYear,
      controlType: x.controlType,
    }));
    BallLoader.show();
    const res = await new HttpService().post(
      "StatusControl/UpdateStatusControls",
      request
    );
    BallLoader.hide();
    if (res.isSucessful) {
      Toast.success(res.message);
     await this.getControls(request[0].academicYear);
    } else {
      Toast.error(res.message);
    }
  }

  setControlType() {
    this.programs = [];
    for (var c of this.commonService.programs) {
      let control = this.controls.find(x => x.programId === c.programId && x.controlType === this.controlType);
      if (control) {
        let dd = {
          controlType: control.controlType,
          active: control.active,
          id:control.id,
          name: c.name,
          programId: control.programId
        }
        this.programs.push(dd);
      }
    }
  }

  getSchools = () => {
    return this.commonService.schools;
  };
  getByDepartment = () => {
    return this.commonService.departments;
  }; 

  getPrograms = () => {
    return this.commonService.programs;
  }; 

   getControlType = () => {
    return this.commonService.lookups.filter((x)=>x.type==="CONTROL TYPE");
  }; 

   getAcademicYear = () => {
    return this.commonService.lookups.filter((x)=>x.type==="ACADEMIC YEAR");
  }; 
 
}
