import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
    selector: 'page-detail',
    templateUrl: 'budget-detail.html',
  })

export class BudgetDetail implements OnInit{
  data : any = [];
  constructor(
  public navParams : NavParams) {
    this.data = navParams.get('budgetDetails');
  }

  ngOnInit(){
    console.log("data", this.data);
  }
}
