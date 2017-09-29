import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ExpenseService } from './../../providers/expense-service';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class Budget implements OnInit {

  data : any = [];
  items : any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl : ToastController,
    public expenseApi : ExpenseService) {
  }

  ngOnInit(){
    //this.getExpenses();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Budget');
  }

  addToList(aEvent) {
    if (aEvent.checked) {
      console.log("checked.."); 
    }
    else {
      console.log("not checked..");
    }
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

  presentToast(message : any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  saveBudget() {
    console.log("booom"); 
  }

  cancel() {
    console.log("cancelled..");
  }

}
