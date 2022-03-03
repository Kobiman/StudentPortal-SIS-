import * as Oidc from "oidc-client";
import { App } from "../app";
import { HttpService } from "../services/httpService";

export class FrontPageVm {
  constructor() {}

  async signIn() {
    App.signIn();
  }
}
