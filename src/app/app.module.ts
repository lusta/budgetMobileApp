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
 
import { MyApp } from './app.component';
import {HomePage} from '../pages/home/home';
import { Profile } from './../pages/profile/profile';
import { Login } from './../pages/login/login';
import { Register } from './../pages/register/register';
import { ExpensePage } from './../pages/expenses/expenses';
import { Budget } from './../pages/budget/budget';
import { Income } from './../pages/income/income';
import { Summary } from './../pages/summary/summary';
import { ExpenseItems } from './../pages/expense-items/expense-items';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Profile,
    Login,
    Budget,
    Income,
    Summary,
    Register,
    ExpensePage,
    ExpenseItems
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
    HomePage,
    Profile,
    Register,
    ExpensePage,
    ExpenseItems
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