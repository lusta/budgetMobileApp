import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { HttpModule } from '@angular/http';
import { AuthService } from './../providers/auth-service';
import { ExpenseService } from './../providers/expense-service';
import { ExpenseItemService } from './../providers/expense-item-service';

import { UserLogin } from '../pages/user-login/user-login';
import { UserSignup } from '../pages/user-signup/user-signup';
import { UserForgotpassword } from '../pages/user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../pages/dashboard/dashboard';
 
import { MyApp } from './app.component';
import { Profile } from './../pages/profile/profile';
import { Login } from './../pages/login/login';
import { Register } from './../pages/register/register';
import { ExpensePage } from './../pages/expenses/expenses';
import { Budget } from './../pages/budget/budget';
import { Income } from './../pages/income/income';
import { Summary } from './../pages/summary/summary';
import { ExpenseItems } from './../pages/expense-items/expense-items';
import { AddExpensePage } from './../pages/expenses/add-expense/add-expense';
import { AddExpenseItemPage } from './../pages/expense-items/add-expense-item/add-expense-item';
 
@NgModule({
  declarations: [
    MyApp,
    Profile,
    Login,
    Budget,
    Income,
    Summary,
    Register,
    Dashboard,
    ExpensePage,
    ExpenseItems,
    AddExpensePage,
    UserLogin,
    UserSignup,
    UserForgotpassword,
    AddExpenseItemPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Budget,
    Income,
    Summary,
    Dashboard,
    Profile,
    Register,
    ExpensePage,
    ExpenseItems,
    AddExpensePage,
    UserLogin,
    UserSignup,
    UserForgotpassword,
    AddExpenseItemPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    AuthService,
    ExpenseService,
    ExpenseItemService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}