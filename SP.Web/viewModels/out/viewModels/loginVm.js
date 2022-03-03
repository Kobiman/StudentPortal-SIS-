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
import * as Oidc from "oidc-client";
export class LoginVm {
    constructor(commonService) {
        this.commonService = commonService;
        this.studentResults = [];
        this.courses = [];
        this.viewModelHelper = new ViewModelHelper();
    }
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            let config = {
                authority: "https://localhost:44345/",
                client_id: "js",
                redirect_uri: "http://127.0.0.1:55541/app/index.html",
                //silent_redirect_uri: `${environment.clientRoot}assets/silent-callback.html`,
                //post_logout_redirect_uri: `${environment.clientRoot}`,
                response_type: "token",
                scope: "api1",
            };
            let userManager = new Oidc.UserManager(config);
            userManager.signinRedirect();
            let user = yield userManager.getUser();
            console.log(user);
            console.log("user");
        });
    }
}
//# sourceMappingURL=loginVm.js.map