import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import { HttpClient } from '../../providers/HttpClient';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

  options: RequestOptions;

  constructor(public http: Http, public httpClient: HttpClient) {
  }

  getAllServices() {
    return this.httpClient.request("services/enabled", 0, null, {'Content-Type': 'application/json'})
                .map(res => res.json());
  }
}
