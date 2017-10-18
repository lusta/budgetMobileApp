import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Loading, ToastController,
         LoadingController } from 'ionic-angular';
import { ExpenseItemService } from './../../providers/expense-item-service';
import { BudgetService } from './../../providers/budget-service';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class Budget implements OnInit {

  loading : Loading;
  data : any = [];
  items : any = [];
  month : string;
  description : string;
  amount : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public BudgetApi : BudgetService,
    public toastController : ToastController,
    public loadingController : LoadingController,
    public expenseApi : ExpenseItemService) {
  }

  ngOnInit(){
    this.getExpenseItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Budget');
  }

  addToList(aEvent, item) {
    if (aEvent.checked) {
      this.items.push(item); 
      this.amount =  this.amount + item.amount;
    }
    else {
      this.removeItem(item);
      this.amount = this.amount - item.amount;
    }
  }

 removeItem(element) {
    const index = this.items.indexOf(element);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getExpenseItems() : void {
    this.expenseApi.getAll()
        .then(expenseItems => {
            expenseItems.forEach(element => {
                this.data.push(element);
            });
        }).
        catch(error => {
        this.presentToast("Ooops something went wrong!");
    });
  } 
  presentToast(message : any) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  saveBudget() {
    let budget = {
      month : this.month,
      amount : this.amount,
      description : this.description,
      expenseItems : this.items
    }; 
    this.showLoading();
    this.BudgetApi.create(budget)
    .then(budget => {
      this.hideLoading();
      this.presentToast("Success");
    }).
    catch(error => {
      this.hideLoading();
      this.presentToast(error);
    });
  }

  cancel() {
    console.log("cancelled..");
  }
  showLoading() {
    this.loading = this.loadingController.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }
}
