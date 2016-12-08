import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {loginApi} from "../../../api.config";
import {forgotApi} from "../../../api.config";
@Injectable()
export class LoginService {

  options: RequestOptions;

  constructor(public http: Http) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.options = new RequestOptions({
      headers: headers
    });
  }

  resetPassword(email) {
    let body = 'email=' + email;
    return this.http.post(forgotApi, body, this.options)
      .map(res => res.json());
  }
  login(username, password) {
    let body = 'login=' + username + '&password=' + password;
    return this.http.post(loginApi, body, this.options)
      .map(res => res.json());
  }

}
