import { Component } from '@angular/core';
import { UserData } from '../../app/userData';
import { IonicPage, NavController, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {

  loading: Loading;
  registerCredentials = { username: '', password: '' };
  resposeData : any;

  constructor(private navCtrl: NavController, 
    private auth: AuthService, 
    private userData : UserData,
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private menu : MenuController) {
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
  }

  dashboardPage(){ 
    this.navCtrl.push(Dashboard); 
  }
  signupPage(){ 
    this.navCtrl.push(UserSignup); 
  }
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword); }
  public login() {
    this.showLoading()
    if(this.registerCredentials.username !== "" && this.registerCredentials.password !== "") {
      this.auth.login(this.registerCredentials, "signin").then((result) =>{
      this.resposeData = result;
        if(this.resposeData.success) {
          this.userData.setUserData(this.resposeData);
          this.menu.enable(true);
          this.navCtrl.push(Dashboard);
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
    alert.present(prompt);
  }
}
