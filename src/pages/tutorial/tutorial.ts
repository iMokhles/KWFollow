import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage) {
    this.slides = [
      {
        title: 'مرحبا بك في كويتي فولو',
        description: 'كويتي فولو لخدمات تواصل الإحتماعي: •متابعين •رتويت •مفضله •جميع خدمات تواصل الإجتماعي بمكان واحد',
        image: 'assets/kwlogo/logo.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.setRoot(LoginPage);
    // this.navCtrl.push(LoginPage);
    this.storage.set('hasSeenTutorial', 'true');
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
