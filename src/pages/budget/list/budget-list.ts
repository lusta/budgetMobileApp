import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Budget } from '../budget';
import { BudgetDetail } from '../details/budget-detail';
import { BudgetService } from '../../../providers/budget-service';

@Component({
    selector: 'page-budget',
    templateUrl: 'budget-list.html',
  })

export class BudgetList implements OnInit {
    data : any = [];
    constructor(
    public Nav : NavController,
    public budgetApi : BudgetService,
    public toastController : ToastController) {}

    ngOnInit(){
        this.list();
    }
    ionViewDidLoad() {

    }
    list() : void {
        this.budgetApi.getAll()
            .then(expenseItems => {
                expenseItems.forEach(element => {
                    this.data.push(element);
                });
            }).
            catch(error => {
            this.presentToast("Ooops something went wrong!");
        });
      }
    Add() {
        this.Nav.push(Budget);
    }
    detail(details : any) {
        this.Nav.push(BudgetDetail,{
          budgetDetails : details
        });
    }
    presentToast(message : any) {
        let toast = this.toastController.create({
          message: message,
          duration: 3000
        });
        toast.present();
      }
}
