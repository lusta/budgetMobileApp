import { ExpensePage } from './../expenses/expenses';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Dashboard } from '../dashboard/dashboard';
import { Register } from './../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  resposeData : any;
 
  constructor(private nav: NavController, 
    private auth: AuthService, 
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private menu : MenuController) {
     }
  public createAccount() {
    this.nav.push(Register);
  }

  public login() {
    this.showLoading()
    if(this.registerCredentials.username !== "" && this.registerCredentials.password !== "") {
      this.auth.login(this.registerCredentials, "signin").then((result) =>{
      this.resposeData = result;
        if(this.resposeData.success) {
          localStorage.setItem('userData', JSON.stringify(this.resposeData) )
          this.menu.enable(true);
          this.nav.push(Dashboard);
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