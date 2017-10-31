import { Component } from '@angular/core';
import { IonicPage, NavController, 
  NavParams, Loading, LoadingController,
  AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';

@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignup {

  loading: Loading;
  registerCredentials = { username: '', password: '' };
  resposeData : any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public Auth : AuthService,
     public loadingCtrl :LoadingController,
     public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
  }

  dashboardPage(){ 
    this.navCtrl.push(Dashboard); 
  }
  loginPage(){ 
    this.navCtrl.push(UserLogin);
  }
  forgotPasswordPage(){ 
    this.navCtrl.push(UserForgotpassword);
  }
  register() {
    this.showLoading()
    if(this.registerCredentials.username !== "" && this.registerCredentials.password !== "") {
      this.Auth.register(this.registerCredentials, "signup").then((result) =>{
      this.resposeData = result;
        if(this.resposeData.success) {
          this.navCtrl.push(UserLogin);
        }
        else {
          this.showError(this.resposeData.msg);
        }
      }, (err) => {
        this.showError(err);
      });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
