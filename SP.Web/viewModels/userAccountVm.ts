import { App } from "../app";
import { BallLoader } from "../loader/ballLoader";
import { CommonService } from "../services/commonService";
import { HttpService } from "../services/httpService";
import { ViewModelHelper } from "../viewModelHelper";

export class UserAccountVm {
  viewModelHelper: ViewModelHelper;
  statement: any[] = [];

  constructor(private commonService: CommonService) {}
}
