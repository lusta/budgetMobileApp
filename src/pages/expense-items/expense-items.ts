import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ExpenseItemService } from './../../providers/expense-item-service';
import { AddExpenseItemPage } from './add-expense-item/add-expense-item';

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
    public EiService : ExpenseItemService,
    public toastCtrl: ToastController) {
    this.expense = navParams.get('expense');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseItems');
  }

  ngOnInit() {
    this.getExpenseItems();
  }

  addExpenseItem() {
    this.navCtrl.push(AddExpenseItemPage);
  }

  presentToast(message : any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  getExpenseItems() : void{
   this.EiService.getByExpense(this.expense)
    .then(expenseItems => {
      expenseItems.forEach(element => {
        this.data.push(element);
      });
    }).
    catch(error => {
      this.presentToast("Ooops something went wrong!");
    });
  }

}
