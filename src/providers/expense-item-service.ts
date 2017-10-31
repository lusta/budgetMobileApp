import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';

import { ExpenseItem } from './../models/ExpenseItem';

@Injectable()
export class ExpenseItemService {

  private data : any;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private baseUrl = 'http://localhost:8080/api/expense/';
  private onlineUrl = "http://budget.openode.io/api/expense/";

  constructor(private http: Http, private storage : Storage) {
  }

  getAll(): Promise<any> {
    return this.storage.get('userData').then(data => {
      let token = data.token;
      return this.http.get(this.baseUrl+"list?token="+token)
        .toPromise()
        .then(response => response.json() as ExpenseItem[])
        .catch(this.handleError);
    })
    .catch(this.handleError);
  }

  getByExpense(expenseId): Promise<ExpenseItem[]> {
    this.data = {
      expense : JSON.stringify(expenseId),
      headers: this.headers
    };
    return this.storage.get('userData').then(data => {
      let token = data.token;
      return this.http.get(this.baseUrl+"list?token="+token, this.data)
        .toPromise()
        .then(response => response.json() as ExpenseItem[])
        .catch(this.handleError);
    })
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
    const url = `${this.baseUrl}?_id=${id}`;

    return this.storage.get('userData').then(data => {
      return this.http.delete(url+"&token="+data.token, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    })
    .catch(this.handleError);
  }

  create(expenseItem : any): Promise<{}> {
    return this.storage.get('userData').then(data => {
      let token = data.token;
      return this.http
      .post(this.onlineUrl+"?token="+token, JSON.stringify(expenseItem), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
    })
    .catch(this.handleError);
  }

  update(expenseItem: any): Promise<{}> {
    const url = `${this.onlineUrl}${expenseItem.Id}`;
    return this.http
      .put(url, JSON.stringify(expenseItem), {headers: this.headers})
      .toPromise()
      .then(() => expenseItem)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}


