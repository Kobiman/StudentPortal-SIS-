import { App } from "../app";
import { BallLoader } from "../loader/ballLoader";
import { CommonService } from "../services/commonService";
import { HttpService } from "../services/httpService";
import { ViewModelHelper } from "../viewModelHelper";

export class FeesStatementVm {
  viewModelHelper: ViewModelHelper;
  statement: any[] = [];

  constructor(private commonService: CommonService) {}
  getFeesStatus = async () => {
    try {
      BallLoader.show();
      const data = await new HttpService().get(
        "Student/GetFeeStatement/" + App.user.profile.userId
      );
      this.statement = data.value;
      BallLoader.hide();
    } catch (error) {
      console.log(error);
    }
  };
  calculateAmount() {
    var total = this.statement.map((x) => x.amount).reduce((a, b) => a + b, 0);
    debugger;
    if (total <= 0) {
      document.getElementById(
        "arrears"
      ).innerHTML = `Arrears:${total.toString()}`;
      document.getElementById("balance").innerHTML = "Balance: 0";
    } else {
      document.getElementById("arrears").innerHTML = "Arrears: 0";
      document.getElementById(
        "balance"
      ).innerHTML = `Balance${total.toString()}`;
    }
  }
}
