import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UserData } from '../app/userData';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { ExpenseItem } from './../models/ExpenseItem';

@Injectable()
export class ExpenseItemService {

  private token : any;
  private data : any;
  userInfo = { token : '' };
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private baseUrl = 'http://localhost:8080/api/expense/';
  private onlineUrl = "http://budget.openode.io/api/expense/";

  constructor(private http: Http, private userData : UserData) {
    this.getUserToken();
    this.token = this.userData !== null ? "?token="+ this.userInfo.token : "";
  }

  getUserToken() {
    this.userData.getUserToken()
      .then(data => {
        this.userInfo.token = data.token;
      })
      .catch(error => {
        
      })
  }

  getAll(): Promise<ExpenseItem[]> {
    this.data = {
      headers: this.headers
    };
    return this.http.get(this.baseUrl+"list", this.data)
        .toPromise()
        .then(response => response.json() as ExpenseItem[])
        .catch(this.handleError);
  }

  getByExpense(expenseId): Promise<ExpenseItem[]> {
    this.data = {
      expense : JSON.stringify(expenseId),
      headers: this.headers
    };
    return this.http.get(this.baseUrl+"list", this.data)
        .toPromise()
        .then(response => response.json() as ExpenseItem[])
        .catch(this.handleError);
  }


  getById(id: string): {} {
    const url = `${this.onlineUrl}?_id=${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.onlineUrl}?_id=${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(expenseItem : any): Promise<{}> {
    return this.http
      .post(this.onlineUrl+this.token, JSON.stringify(expenseItem), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(expenseItem: any): Promise<{}> {
    const url = `${this.onlineUrl}${expenseItem.Id}`;
    return this.http
      .put(url+this.token, JSON.stringify(expenseItem), {headers: this.headers})
      .toPromise()
      .then(() => expenseItem)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}


