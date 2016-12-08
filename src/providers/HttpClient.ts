import { Injectable } from '@angular/core';
// import { Events } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions, RequestMethod, Request} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class HttpClient {
    apiUrl = 'https://kwfollow.com/api/v1/';

    constructor (public http: Http) {}
    
    request (url, method, body, header?): Observable<any>{
        let head;
        let opt;

        if (header) {
            head = new Headers(header);
            console.log(head);
            opt = new RequestOptions({
              method: RequestMethod[method],
              url: this.apiUrl + url,
              headers: head,
              body: body
            });

        }else{
            opt = new RequestOptions({
              method: RequestMethod[method],
              url: this.apiUrl + url,
              body: body
            });
        }
        var req = new Request(opt);
        return this.http.request(req)
                        .map(res => {return res})
                        .catch(ex => {return Observable.throw(ex)});

    }
}
