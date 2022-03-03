import { App } from "../app";
export class HttpService {
    post(url, data, header) {
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: Object.assign({ "Content-Type": "application/json", Accept: "*/*", Authorization: "Bearer " + App.user.access_token }, header),
        };
        return fetch(`${App.baseUri}/api/${url}`, options).then((res) => res.json());
    }
    get(url, header) {
        const options = {
            method: "GET",
            headers: Object.assign({ "Content-Type": "application/json", Accept: "*/*", Authorization: "Bearer " + App.user.access_token }, header),
        };
        return fetch(`${App.baseUri}/api/${url}`, options).then((res) => res.json());
    }
    put(url, data, header) {
        const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: Object.assign({ "Content-Type": "application/json", Accept: "*/*" }, header),
        };
        return fetch(`${App.baseUri}/api/${url}`, options).then((res) => res.json());
    }
}
//# sourceMappingURL=httpService.js.map