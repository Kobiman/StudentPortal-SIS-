import { ViewModelHelper } from "../viewModelHelper";
import { CommonService } from "../services/commonService";
import { BallLoader } from "../loader/ballLoader";
import { _ } from "../group";
import { HttpService } from "../services/httpService";
import { Required, Rules } from "../validator";
import { Toast } from "../toast/toast";

export class GradingSystemVm {
  viewModelHelper: ViewModelHelper;
  //groupedGrades: any;
  results: any;
  httpService: HttpService;
  validator: any;
  //gradeType: any[];

  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
    this.httpService = new HttpService();
  }

  resultsList: any[] = [];
  groupedGrades: any[] = [];
 
  getGradingSystem = async () => {
    try {
      BallLoader.show();
      const data = await this.httpService.get("GradesSettings/GetGradesSettings");
      this.results = data.value
      this.groupedGrades = this.groupCourses(this.results);
      BallLoader.hide();
    } catch (error) {
      console.log(error);
    }
  };

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

  getGradeType = () => {
    debugger
    return this.commonService.lookups.filter((x) => x.type === "GRADE TYPE");
  };

  groupCourses(arr) {
    let groups = _.groupBy(arr, function (result) {
      return {
        type: result.type,
        commissionDate: result.commissionDate,
      };
    });

    let groupedGrades = [];
    for (var group of Object.keys(groups)) {
      debugger
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

  async save(cDate,type, uLimit, lLimit, grade, gradePoint, remarks) {
    debugger;
    // let rules = this.setupRules();
    // var errors = this.validator.addRules(rules).validate();
    // this.viewModelHelper.showErrors(errors);
    // if (!this.validator.hasErrors) {
      var request = { grade: grade, gradePoint: gradePoint, upperLimit: uLimit, lowerLimit: lLimit,gradeRemarks:remarks,commissionDate:cDate,type:type };
      debugger;
      const result = await new HttpService().post("GradesSettings/AddGradesSettings", request);
      debugger;
      this.getGradingSystem();
      Toast.success(result.message);
      BallLoader.hide();
    // }
  }
 
}
