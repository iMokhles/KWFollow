import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {signupApi} from "../../../api.config";

@Injectable()
export class SignupService {

  options: RequestOptions;

  constructor(public http: Http) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.options = new RequestOptions({
      headers: headers
    });
  }

  signup(email, username, password, password2) {
    let body = 'email='+ email +'&username=' + username + '&password=' + password + '&password2=' + password2;
    return this.http.post(signupApi, body, this.options)
      .map(res => res.json());
  }

}
