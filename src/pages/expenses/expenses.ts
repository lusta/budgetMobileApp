import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { ExpenseService } from './../../providers/expense-service';

import { Expense } from './../../models/expense';
import { ExpenseItems } from './../expense-items/expense-items';
import {AddExpensePage} from './add-expense/add-expense';

@Component({
  selector: 'page-expense',
  templateUrl: 'expenses.html'
})
export class ExpensePage implements OnInit {
 data : any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public Nav : NavController,
    public expenseApi :ExpenseService,
    public toastCtrl: ToastController) {}

  ngOnInit(){
    this.getExpenses();
  }
  ionViewDidLoad() {

  }

  getExpenses() : void{
    this.expenseApi.getAll()
      .then(expenses => {
        expenses.forEach(element => {
          this.data.push(element);
        });
      });
  }

  addExpense() : any {
    this.Nav.push(AddExpensePage);
  }

  presentToast(message : any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  viewExpenseItems(item : any) {
    this.Nav.push(ExpenseItems);
  }
}
