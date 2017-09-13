import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams, PopoverController } from 'ionic-angular';
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
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController ) {}

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
  addExpense() : any {
    console.log('clicked');
  }

  presentToast(message : any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(AddExpensePage);
    popover.present();
  }

  viewExpenseItems(item : any) {
    this.Nav.push(ExpenseItems);
  }
}
