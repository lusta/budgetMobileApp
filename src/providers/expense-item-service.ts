import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { ExpenseItem } from './../models/ExpenseItem';

@Injectable()
export class ExpenseItemService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'http://localhost:8080/api/expenseItem/';
  private onlineUrl = "http://budget.openode.io/api/expenseItem/";
  private data : any;

  constructor(private http: Http) { }

  getAll(expenseId): Promise<ExpenseItem[]> {
    this.data = {
      expenseId : JSON.stringify(expenseId),
      headers: this.headers
    };
    return this.http.get(this.onlineUrl+"list", this.data)
        .toPromise()
        .then(response => response.json() as ExpenseItem[])
        .catch(this.handleError);
  }


  getById(id: string): {} {
    const url = `${this.baseUrl}?_id=${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.baseUrl}?_id=${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(expenseItem : any): Promise<{}> {
    return this.http
      .post(this.baseUrl, JSON.stringify(expenseItem), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(expenseItem: any): Promise<{}> {
    const url = `${this.baseUrl}/${expenseItem.Id}`;
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

