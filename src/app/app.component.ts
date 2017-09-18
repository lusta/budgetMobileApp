import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Profile } from '../pages/profile/profile';
import { Login } from '../pages/login/login';
import { UserLogin } from '../pages/user-login/user-login';
import { Budget } from './../pages/budget/budget';
import { Summary } from './../pages/summary/summary';
import { Income } from './../pages/income/income';
import { ExpensePage } from './../pages/expenses/expenses';
import { Dashboard } from '../pages/dashboard/dashboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = UserLogin;
  pages: Array<{title: string, icon:string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar : StatusBar,
    public splashscreen : SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Dashboard', icon:'home', component: Dashboard },
      { title: 'Income' , icon:'cash', component: Income },
      { title: 'Expenses', icon:'cart', component: ExpensePage },
      { title: 'Budget', icon:'briefcase', component: Budget },
      { title: 'Summary', icon:'settings', component: Summary },
      { title: 'Profile', icon:'contact', component: Profile }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
