import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import {orderhistory} from '../../models/orderhistory'
import { HistoryService } from './history.service';
import {InAppBrowser} from 'ionic-native';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [HistoryService]
})
export class HistoryPage {

  page: number;
  orders: orderhistory[];
  ordersNew: orderhistory[];
  isLoading: boolean;

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public historyServ: HistoryService,
    public userData: UserData) {
      this.isLoading = true;
      this.page = 1;
      this.getAllOrdersHistory();
  }

  openLink(url){
        let urlString:string = url;
        let browser = new InAppBrowser(urlString, '_blank', 'location=no');
        browser.show();
  }
  doRefresh(refresher) {
    this.isLoading = true;
    this.page = 1;
    this.getAllOrdersHistory();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  doInfinite(infiniteScroll) {
    this.page++;
    console.log('Begin async operation');
    this.storage.get('token').then((val) => {
      this.historyServ.getUserHistoryWithPage(val,this.page).subscribe(res=> {
        if (res) {
          if (res.hasOwnProperty('orders')) {
            this.ordersNew = res.orders;
            if (this.ordersNew.length == 0) {
              this.isLoading = false;
              infiniteScroll.complete();
            } else {
              this.orders.push.apply(this.orders, this.ordersNew);
              infiniteScroll.complete();
            }
          } else {
            infiniteScroll.complete();
          }
        }
      })
    });
  }
  getAllOrdersHistory() {
    let toast = this.toastCtrl.create({
      message: 'جاري تحديث الصفحة',
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
    this.storage.get('token').then((val) => {
      this.historyServ.getUserHistory(val).subscribe(res=> {
        if (res) {
          if (res.hasOwnProperty('orders')) {
            if (res.orders.length < 20) {
              this.isLoading = false;
            }
            toast.dismiss();
            this.orders = res.orders;
            console.log('Response: ', this.orders);
          }

        }
      })
    });

  }

}
