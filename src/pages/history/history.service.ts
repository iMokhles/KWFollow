import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import { HttpClient } from '../../providers/HttpClient';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HistoryService {

  options: RequestOptions;

  constructor(public http: Http, public httpClient: HttpClient) {
  }

  getUserHistory(token) {
    return this.httpClient.request("history/"+token, 0, null, {'Content-Type': 'application/json'})
                .map(res => res.json());
  }
  getUserHistoryWithPage(token, page) {
    return this.httpClient.request("history/"+token+"?page="+page, 0, null, {'Content-Type': 'application/json'})
                .map(res => res.json());
  }
}
