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
import { HttpService } from "../services/httpService";
export class PagesVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.userPages = [];
        this.getPages = () => __awaiter(this, void 0, void 0, function* () {
            const res = yield new HttpService().get("Page/GetPages");
            this.userPages = res.value;
        });
        this.viewModelHelper = new ViewModelHelper();
    }
}
//# sourceMappingURL=pagesVm.js.map