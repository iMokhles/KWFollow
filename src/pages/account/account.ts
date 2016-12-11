import { Component, Pipe } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

@Pipe({
    name: "filterServices",
    pure: false
})
export class ExplodePipe {
    transform(value) {
        return value.split('-');
    }
}

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  account: {username?: string, email?: string, credit?: string} = {};
  
  constructor(public navCtrl: NavController,
    public userData: UserData,
    public storage: Storage,) {

      this.storage.get("email").then((value) => {
          this.account.email = value;
      });

      this.storage.get("username").then((value) => {
          this.account.username = value;
      });

      this.storage.get("balance").then((value) => {
          this.account.credit = "$"+value.substring(5, 0);;
      });
  }

}
