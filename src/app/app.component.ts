import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Profile } from '../pages/profile/profile';
import { UserLogin } from '../pages/user-login/user-login';
import { BudgetList } from './../pages/budget/list/budget-list';
import { Summary } from './../pages/summary/summary';
import { Income } from './../pages/income/income';
import { ExpensePage } from './../pages/expenses/expenses';
import { Dashboard } from '../pages/dashboard/dashboard';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  isLoggedIn : any;
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, icon:string, component: any}>;
  
  constructor(
    public platform: Platform,
    private storage : Storage,
    public menu: MenuController,
    public statusBar : StatusBar,
    public splashscreen : SplashScreen
  ) {
    storage.get('userData').then((data) => {
      this.rootPage = data!== null ? Dashboard : UserLogin;
    });
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Dashboard', icon:'home', component: Dashboard },
      { title: 'Income' , icon:'cash', component: Income },
      { title: 'Expenses', icon:'cart', component: ExpensePage },
      { title: 'Budget', icon:'briefcase', component: BudgetList },
      { title: 'Summary', icon:'settings', component: Summary },
      { title: 'Profile', icon:'contact', component: Profile },
      { title: 'Log out', icon:'exit', component: UserLogin }
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

  setvalue(data) {
    this.isLoggedIn = data;
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    if (page.component === UserLogin) {
      this.storage.clear();
    }
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
