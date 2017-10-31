import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BudgetService {
  private token : any;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private baseUrl = 'http://localhost:8080/api/budget/';
  private onlineUrl = "http://budget.openode.io/api/budget/";

  constructor(private http: Http, private storage : Storage) {
  }

  getAll(): Promise<any> {
    return this.storage.get('userData').then(data => {
      let token = data.token;
      return this.http.get(this.baseUrl+"list?token="+token)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    })
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
    
      return this.storage.get('userData').then(data => {
        return this.http.delete(url+"&token="+data.token, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  create(budget : any): Promise<{}> {
    const url = `${this.baseUrl}${'add'}`;
    return this.storage.get('userData').then(data => {
      let token = data.token;
      return this.http
        .post(url+"?token="+token, JSON.stringify(budget), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    })
    .catch(this.handleError);
  }

  update(budget: any): Promise<any> {
    const url = `${this.baseUrl}/${budget.Id}`;
    return this.http
      .put(url+this.token, JSON.stringify(budget), {headers: this.headers})
      .toPromise()
      .then(() => budget)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
