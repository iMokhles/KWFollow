import { Component, Pipe, PipeTransform } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import {servicemodel} from '../../models/servicemodel'
import { HomeService } from './home.service';

@Pipe({
    name: "filterServices",
    pure: false
})
export class ArrayFilterPipe implements PipeTransform {
    transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
        return items.filter(item => {
            for (let field in conditions) {
                if (item[field] !== conditions[field]) {
                    return false;
                }
            }
            return true;
        });
    }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  order: {url?: string, quantity?: string} = {};
  services: servicemodel[];
  servicesCurrent: servicemodel[];

  mainservice: string = "0";
  mainserviceString: string = "منشن";

  mainserviceCurrent: string = "0";
  mainserviceCurrentString: string = "";

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public homeService: HomeService,
    public userData: UserData) {

       // get all services :)
    this.homeService.getAllServices().subscribe(res=> {
        if (res) {
           this.services = res.services;
           this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
           this.mainserviceCurrentString = this.servicesCurrent.toString[0];
           console.log("SERVS: " + this.servicesCurrent);
        }
      })
  }

  onChangeMini(value) {
    this.mainserviceCurrentString = this.servicesCurrent.toString[value];
    console.log("Value Selected: "+value);
  }
  onChange(value) {

    if (value == 0) {
      this.mainserviceString = "منشن";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 1) {
      this.mainserviceString = "إنستقرام";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 2) {
      this.mainserviceString = "تويتر";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 3) {
      this.mainserviceString = "سناب شات";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 4) {
      this.mainserviceString = "أوتو لايك";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 5) {
      this.mainserviceString = "أوتو كومنت";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 6) {
      this.mainserviceString = "اوتو ريتويت";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 7) {
      this.mainserviceString = "اوتو مشاهدة";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 8) {
      this.mainserviceString = "تعليقات علي صورة";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 9) {
      this.mainserviceString = "فيسبوك";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 10) {
      this.mainserviceString = "يوتيوب";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    } else if (value == 11) {
      this.mainserviceString = "زوار";
      this.servicesCurrent = this.services.filter(record => record.groupe === this.mainserviceString);
    }
    // console.log("HERERERE");
    // console.log("Value Selected: "+value);

  }
}
