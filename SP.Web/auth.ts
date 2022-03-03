import * as Oidc from "oidc-client";

export class Auth {
  private static config = {
    authority: "https://auth.uenr.edu.gh/",
    client_id: "Attachment",
    redirect_uri: "https://localhost:44384",
    response_type: "id_token token",
    scope: "openid profile api1",
    loadUserInfo: true,
    post_logout_redirect_uri: "https://localhost:44384",
  };

  static userManager: Oidc.UserManager = new Oidc.UserManager(Auth.config);
  static user: Oidc.User;
  static async signIn() {
    Auth.userManager.signinRedirect();
  }

  static async signOut() {
    Auth.userManager.signoutRedirect();
  }
}
