import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Budget } from '../budget';
import { BudgetDetail } from '../details/budget-detail';

@Component({
    selector: 'page-budget',
    templateUrl: 'budget-list.html',
  })

export class BudgetList implements OnInit {

    constructor( 
    public Nav : NavController) {}

    ngOnInit(){

    }
    ionViewDidLoad() {

    }  
    Add() {
        this.Nav.push(Budget);
    } 
    detail() {
        this.Nav.push(BudgetDetail);
    }
}