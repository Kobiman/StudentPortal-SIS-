import { App } from "../app";

export class HttpService {
  public post(url: string, data: any, header?: any) {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + App.user.access_token,
        ...header,
      },
    };
    return fetch(`${App.baseUri}/api/${url}`, options).then((res) => res.json());
  }

  public get(url: string, header?: any) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + App.user.access_token,
        ...header,
      },
    };
    return fetch(`${App.baseUri}/api/${url}`, options).then((res) => res.json());
  }

  public put(url: string, data: any, header?: any) {
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        ...header,
      },
    };
    return fetch(`${App.baseUri}/api/${url}`, options).then((res) => res.json());
  }
}
