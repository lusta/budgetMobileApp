import { Component } from '@angular/core';
import { NavController, NavParams, Loading, ToastController, LoadingController } from 'ionic-angular';
import { ExpenseService } from './../../../providers/expense-service';

/**
 * Generated class for the AddExpensePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpensePage {

  loading : Loading;

  public expenseItem = {
    name : '',
    description : '',
    ampunt : 0,
    create_at: '1990-02-19',
    updated_at: '1990-02-19',
    time: '07:43'
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public expenseApi : ExpenseService,
    public toastController : ToastController,
    public loadingController : LoadingController) {
  }

  ionViewDidLoad() {

  }

  presentToast(message : any) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
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

  save() : any {
    this.showLoading();
    this.expenseApi.create(this.expenseItem)
    .then(expenses => {
      this.hideLoading();
      this.presentToast("Success");
    }).
    catch(error => {
      this.hideLoading();
      this.presentToast(error);
    });
  }

}
