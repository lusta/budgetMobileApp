import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from './../../providers/expense-service';

import { Expense } from './../../models/expense';
import { ExpenseItems } from './../expense-items/expense-items';

@Component({
  selector: 'page-expense',
  templateUrl: 'expenses.html'
})
export class ExpensePage implements OnInit {
 data : any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public Nav : NavController,
    public expenseApi :ExpenseService ) {}

  ngOnInit(){
    this.getExpenses();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePage');
  }

  getExpenses() : void{
    this.expenseApi.getAll()
      .then(expenses => {
        expenses.forEach(element => {
          this.data.push(element);
        });
      });
  }
  viewExpenseItems(item : any) {
    this.Nav.push(ExpenseItems);
  }
}
