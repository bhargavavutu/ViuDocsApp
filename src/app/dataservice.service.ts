import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Http,Headers} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  validuser = new Subject<string>();
  constructor(private http: Http) { }
  getData(url): Observable<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-methods', 'POST,GET,OPTIONS,PUT,DELETE');
    headers.append('Access-Control-Allow-origin', '*');
    return this.http.get(url).pipe(map((response: any) => response.json()));
  }

  postloginData(login) {
      this.validuser.next(login);
  }

  // tslint:disable-next-line: whitespace
  getLoginData():Observable<any>{
    return this.validuser.asObservable();
  }
}

