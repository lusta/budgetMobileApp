import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from './../../providers/expense-service';

@Component({
  selector: 'page-expense',
  templateUrl: 'expenses.html'
})
export class ExpensePage implements OnInit {
 data : any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public expenseApi :ExpenseService ) {}
  ngOnInit(){
    this.getExpenses();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePage');
  }

  getExpenses() {
    this.data = this.expenseApi.getAll();
  }
}
