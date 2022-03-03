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
import { BallLoader } from "../loader/ballLoader";
import { _ } from "../group";
import { HttpService } from "../services/httpService";
import { Required, Rules } from "../validator";
import { Toast } from "../toast/toast";
export class GradingSystemVm {
    //gradeType: any[];
    constructor(commonService) {
        this.commonService = commonService;
        this.resultsList = [];
        this.groupedGrades = [];
        this.getGradingSystem = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                const data = yield this.httpService.get("GradesSettings/GetGradesSettings");
                this.results = data.value;
                this.groupedGrades = this.groupCourses(this.results);
                BallLoader.hide();
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getGradeType = () => {
            debugger;
            return this.commonService.lookups.filter((x) => x.type === "GRADE TYPE");
        };
        this.viewModelHelper = new ViewModelHelper();
        this.httpService = new HttpService();
    }
    setupRules() {
        return [
            new Rules("commissionDate", [new Required(this.results.commissionDate)]),
            new Rules("grade", [new Required(this.results.grade)]),
            new Rules("upperLimit", [new Required(this.results.upperLimit)]),
            new Rules("lowerLimit", [new Required(this.results.lowerLimit)]),
            new Rules("gradeRemarks", [new Required(this.results.gradeRemarks)]),
            new Rules("gradePoint", [new Required(this.results.gradePoint)]),
        ];
    }
    groupCourses(arr) {
        let groups = _.groupBy(arr, function (result) {
            return {
                type: result.type,
                commissionDate: result.commissionDate,
            };
        });
        let groupedGrades = [];
        for (var group of Object.keys(groups)) {
            debugger;
            let j = JSON.parse(group);
            let g = groups[group];
            groupedGrades.push({
                type: j.type,
                commissionDate: j.commissionDate,
                results: g,
            });
        }
        return groupedGrades;
    }
    save(cDate, type, uLimit, lLimit, grade, gradePoint, remarks) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            // let rules = this.setupRules();
            // var errors = this.validator.addRules(rules).validate();
            // this.viewModelHelper.showErrors(errors);
            // if (!this.validator.hasErrors) {
            var request = { grade: grade, gradePoint: gradePoint, upperLimit: uLimit, lowerLimit: lLimit, gradeRemarks: remarks, commissionDate: cDate, type: type };
            debugger;
            const result = yield new HttpService().post("GradesSettings/AddGradesSettings", request);
            debugger;
            this.getGradingSystem();
            Toast.success(result.message);
            BallLoader.hide();
            // }
        });
    }
}
//# sourceMappingURL=gradingSystemVm.js.map