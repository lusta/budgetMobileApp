import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class UserData {
    public token : any;
    public username : any;
    userDedails : any;
    constructor(private storage : Storage) {
        this.userDedails = this.storage.get('userData');
    }

    setUserData(userInfor : any) : void {
        this.storage.set('userData', userInfor);
    }

    getUserToken() : void {
        this.userDedails
            .then(data => {
                this.token = data.token;
            })
            .catch(error => {
                this.token = null;
            })
    }

    getUserName() : void {
        this.userDedails
            .then(data => {
                this.username = data.username;
            })
            .catch(error => {
                this.username = null;
            });
    }

    removeUserData() : void {
        this.storage.remove('userData');
    }

    isLoggedIn() : Boolean {
        return this.userDedails !== null ? true : false;
    }

}