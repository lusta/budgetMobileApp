import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Profile } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Budget } from './../pages/budget/budget';
import { Summary } from './../pages/summary/summary';
import { Income } from './../pages/income/income';
import { ExpensePage } from './../pages/expenses/expenses';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = Login;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar : StatusBar,
    public splashscreen : SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Income', component: Income },
      { title: 'Expenses', component: ExpensePage },
      { title: 'Budget', component: Budget },
      { title: 'Summary', component: Summary },
      { title: 'Profile', component: Profile }
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
