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
export class FeesStatementVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.statement = [];
        this.getFeesStatus = () => __awaiter(this, void 0, void 0, function* () {
            try {
                BallLoader.show();
                const data = yield new HttpService().get("Student/GetFeeStatement/" + App.user.profile.userId);
                this.statement = data.value;
                BallLoader.hide();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    calculateAmount() {
        var total = this.statement.map((x) => x.amount).reduce((a, b) => a + b, 0);
        debugger;
        if (total <= 0) {
            document.getElementById("arrears").innerHTML = `Arrears:${total.toString()}`;
            document.getElementById("balance").innerHTML = "Balance: 0";
        }
        else {
            document.getElementById("arrears").innerHTML = "Arrears: 0";
            document.getElementById("balance").innerHTML = `Balance${total.toString()}`;
        }
    }
}
//# sourceMappingURL=FeesStatementVm.js.map