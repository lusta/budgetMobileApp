import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { ExpenseService } from './../../providers/expense-service';

import { Expense } from './../../models/expense';
import { ExpenseItems } from './../expense-items/expense-items';
import { AddExpensePage } from './add-expense/add-expense';
import { AddExpenseItemPage } from './../../pages/expense-items/add-expense-item/add-expense-item';

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
      }).
      catch(error => {
      this.presentToast("Ooops something went wrong!");
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

  addExpenseItem(expense : any) {
    this.Nav.push(AddExpenseItemPage, {
      expense : expense
    });
  }

  remove(expense : any) {
    this.expenseApi.delete(expense)
      .then(result => {
        this.presentToast(result.message);
      }).catch(err => {
        this.presentToast("Ooops something went wrong!");
      });
  }

  edit(expense : any) {
    this.expenseApi.update(expense)
      .then(result => {
        this.presentToast(result.message);
      }).catch(err => {
        this.presentToast("Ooops something went wrong!");
      });
  }

  viewExpenseItems(item : any) {
    this.Nav.push(ExpenseItems);
  }
}
