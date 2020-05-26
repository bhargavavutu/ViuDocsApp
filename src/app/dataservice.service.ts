import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class DataserviceService {
  userData;
  validuser = new Subject<string>();
  constructor(private http: Http, private angfireAuth: AngularFireAuth, private router: Router) {
    this.userData = angfireAuth.authState;
  }
  getData(url): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-methods', 'POST,GET,OPTIONS,PUT,DELETE');
    headers.append('Access-Control-Allow-origin', '*');
    return this.http.get(url).pipe(map((response: any) => response.json()));
  }

  signin(email, password) {
    this.angfireAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('successfully logged in');
      this.router.navigate(["/"]);
      this.postloginData(true);
    });
  }
  signup(email, password) {
    this.angfireAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('successfully signed up');
      this.router.navigate(["/user_login"]);
      window.alert("You have been successfully registered to ViuDocs")
    });
  }
  postloginData(login) {
    this.validuser.next(login);
  }

  // tslint:disable-next-line: whitespace
  getLoginData(): Observable<any> {
    return this.validuser.asObservable();
  }
}

