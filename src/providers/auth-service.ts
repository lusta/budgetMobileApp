import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
let apiUrl = "http://localhost:8080/api/",
    hostedUrl = "http://budget.openode.io/api/";

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public http: Http) {}

  public login(credentials, type) {
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(hostedUrl+type, credentials, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });
  }
 
  public register(credentials, type) {
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(hostedUrl+type, credentials, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}