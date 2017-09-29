import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UserData } from '../app/userData';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Expense } from './../models/expense';

@Injectable()
export class ExpenseService {
  private token = "";
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private baseUrl = 'http://localhost:8080/api/expense/';
  private onlineUrl = "http://budget.openode.io/api/expense/";

  constructor(private http: Http, private userData : UserData) {
    this.userData.getUserToken();
    this.userData.getUserName();
    this.token = this.userData !== null ? "?token="+ this.userData.token : "";
    console.log(this.userData.token);
  }

  getAll(): Promise<Expense[]> {
    
    return this.http.get(this.onlineUrl+"list"+this.token)
               .toPromise()
               .then(response => response.json() as Expense[])
               .catch(this.handleError);
  }


  getById(id: string): {} {
    const url = `${this.onlineUrl}?_id=${id}`;
    return this.http.get(url+this.token, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<any> {
    const url = `${this.baseUrl}?_id=${id}`;
    return this.http.delete(url+this.token, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(expense : any): Promise<{}> {
    const url = `${this.onlineUrl}${'add'}`;
    return this.http
      .post(url+this.token, JSON.stringify(expense), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(expense: any): Promise<any> {
    const url = `${this.baseUrl}/${expense.Id}`;
    return this.http
      .put(url+this.token, JSON.stringify(expense), {headers: this.headers})
      .toPromise()
      .then(() => expense)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}


