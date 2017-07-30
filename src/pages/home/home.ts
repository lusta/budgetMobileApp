import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  constructor(private nav: NavController, 
    private auth: AuthService,
    private menu : MenuController) {
     menu.enable(true);
    // let info = this.auth.getUserInfo();
    // this.username = info['name'];
    // this.email = info['email'];
  }
  showMenu() {
    this.menu.toggle();
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('Login')
    });
  }
}