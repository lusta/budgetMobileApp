import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  createSuccess = false;
  registerCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, 
    private auth: AuthService, 
    private alertCtrl: AlertController,
    private menu : MenuController) { 
      this.menu.enable(false);
    }
 
  public register() {
    this.auth.register(this.registerCredentials, "khjk").then(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }
 
  // signup() {
  //   this.auth.postData(this.userData, "signup").then((result) =>{
  //   this.resposeData = result;
  //   console.log(this.resposeData);
  //   localStorage.setItem('userData', JSON.stringify(this.resposeData) )
  //   this.navCtrl.push(HomePage);
  //   }, (err) => {
  //     this.errorMessage = err;
  //   });
  // }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}