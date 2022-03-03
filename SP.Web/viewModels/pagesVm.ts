import { ViewModelHelper } from "../viewModelHelper";
import { CommonService } from "../services/commonService";
import { HttpService } from "../services/httpService";

export class PagesVm {
    viewModelHelper: ViewModelHelper;
    userPages: any[] = [];
    
  constructor(private commonService: CommonService) {
    this.viewModelHelper = new ViewModelHelper();
  }
   
    getPages = async () => {
        const res = await new HttpService().get("Page/GetPages");
        this.userPages=res.value;
    }
}
