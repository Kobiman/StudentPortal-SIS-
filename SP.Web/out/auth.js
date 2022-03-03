var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Oidc from "oidc-client";
export class Auth {
    static signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            Auth.userManager.signinRedirect();
        });
    }
    static signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            Auth.userManager.signoutRedirect();
        });
    }
}
Auth.config = {
    authority: "https://auth.uenr.edu.gh/",
    client_id: "Attachment",
    redirect_uri: "https://localhost:44384",
    response_type: "id_token token",
    scope: "openid profile api1",
    loadUserInfo: true,
    post_logout_redirect_uri: "https://localhost:44384",
};
Auth.userManager = new Oidc.UserManager(Auth.config);
//# sourceMappingURL=auth.js.map