import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenseItemService } from './../../providers/expense-item-service';

@Component({
  selector: 'page-expense-items',
  templateUrl: 'expense-items.html',
})
export class ExpenseItems implements OnInit{
 data : any = [];
  expense : any;
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public EiService : ExpenseItemService) {
    this.expense = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseItems');
  }

  ngOnInit() {
    this.getExpenseItems();
  }

  getExpenseItems() : void{
   this.EiService.getAll(this.expense)
    .then(expenseItems => {
      console.log("expenseItems", expenseItems);
      expenseItems.forEach(element => {
        this.data.push(element);
      });
    });
  }

}
