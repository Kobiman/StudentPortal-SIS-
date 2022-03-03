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
import { ViewModelHelper } from "../viewModelHelper";
import { HttpService } from "../services/httpService";
import { Toast } from "../toast/toast";
export class ControlsVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.controls = [];
        this.programs = [];
        this.getSchools = () => {
            return this.commonService.schools;
        };
        this.getByDepartment = () => {
            return this.commonService.departments;
        };
        this.getPrograms = () => {
            return this.commonService.programs;
        };
        this.getControlType = () => {
            return this.commonService.lookups.filter((x) => x.type === "CONTROL TYPE");
        };
        this.getAcademicYear = () => {
            return this.commonService.lookups.filter((x) => x.type === "ACADEMIC YEAR");
        };
        this.viewModelHelper = new ViewModelHelper();
        this.getByDepartment();
    }
    getControls(academicYear) {
        return __awaiter(this, void 0, void 0, function* () {
            BallLoader.show();
            const data = yield new HttpService().get(`StatusControl/GetStatusControls?academicYear=${academicYear}`);
            this.controls = data.value;
            BallLoader.hide();
        });
    }
    addControls(program, controlType, AcademicYear) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            BallLoader.show();
            let programId = this.commonService.programs.find((x) => x.name === program).programId;
            var request = {
                active: this.active,
                programId: programId,
                academicYear: AcademicYear,
                controlType: controlType,
            };
            const res = yield new HttpService().post("StatusControl/AddStatusControl", request);
            BallLoader.hide();
            if (res.isSucessful) {
                Toast.success(res.message);
            }
            else {
                Toast.error(res.message);
            }
            this.getControls(AcademicYear);
        });
    }
    updateControl(programId, controlType, active, id) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            let departmentId = this.commonService.programs.find((x) => x.programId === programId).departmentId;
            let schoolId = this.getByDepartment().find((x) => x.departmentId === departmentId).schoolId;
            var request = {
                id: id,
                active: active,
                programId: programId,
                academicYear: this.getSchools().find((x) => x.schoolId === schoolId).academicYear,
                controlType: controlType,
            };
            BallLoader.show();
            const res = yield new HttpService().post("StatusControl/UpdateStatusControl", request);
            BallLoader.hide();
            if (res.isSucessful) {
                Toast.success(res.message);
            }
            else {
                Toast.error(res.message);
            }
        });
    }
    updateControls(active) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            var request = this.controls.map((x) => ({
                id: x.id,
                active: active,
                programId: x.programId,
                academicYear: x.academicYear,
                controlType: x.controlType,
            }));
            BallLoader.show();
            const res = yield new HttpService().post("StatusControl/UpdateStatusControls", request);
            BallLoader.hide();
            if (res.isSucessful) {
                Toast.success(res.message);
                yield this.getControls(request[0].academicYear);
            }
            else {
                Toast.error(res.message);
            }
        });
    }
    setControlType() {
        this.programs = [];
        for (var c of this.commonService.programs) {
            let control = this.controls.find(x => x.programId === c.programId && x.controlType === this.controlType);
            if (control) {
                let dd = {
                    controlType: control.controlType,
                    active: control.active,
                    id: control.id,
                    name: c.name,
                    programId: control.programId
                };
                this.programs.push(dd);
            }
        }
    }
}
//# sourceMappingURL=controlsVm.js.map