import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { OneSignal, StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

// providers
import { UserData } from '../providers/user-data';
import { HttpClient } from '../providers/HttpClient';
import { HomeService } from '../pages/home/home.service';

// pages
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
// import { CartPage } from '../pages/cart/cart';
// import { CheckoutPage } from '../pages/checkout/checkout';
import { HistoryPage } from '../pages/history/history';
import { InfoPage } from '../pages/info/info';
import { InstructionsPage } from '../pages/instructions/instructions';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
// import { OrderPage } from '../pages/order/order';
import { TutorialPage } from '../pages/tutorial/tutorial';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class KWFollowApp {

  @ViewChild(Nav) nav: Nav;

  notifications = [];
  loggedInPages: PageInterface[] = [
    { title: 'الرئيسية', component: HomePage, icon: 'assets/list_icons/home.png' },
    { title: 'حسابي', component: AccountPage, icon: 'assets/list_icons/account.png' },
    { title: 'الاشعارات', component: NotificationsPage, icon: 'assets/list_icons/notifications.png' },
    { title: 'سجل الطلبات', component: HistoryPage, icon: 'assets/list_icons/history.png' },
    { title: 'معلومات', component: InstructionsPage, icon: 'assets/list_icons/notes.png' },
    { title: 'حول التطبيق', component: InfoPage, icon: 'assets/list_icons/info.png'}
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'تسجيل دخول', component: LoginPage, icon: 'assets/list_icons/login.png' },
    { title: 'معلومات', component: InstructionsPage, icon: 'assets/list_icons/notes.png' },
    { title: 'حول التطبيق', component: InfoPage, icon: 'assets/list_icons/info.png' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public httpRequest: HttpClient,
    public homeServc: HomeService,
    public storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.oneSignal();
      StatusBar.styleDefault();
      // StatusBar.overlaysWebView(false);
      Splashscreen.hide();
    });
    // Check if the user has already seen the tutorial
    this.userData.checkHasSeenTutorial().then((hasSeenTutorial) => {
      if (hasSeenTutorial === null) {
        // User has not seen tutorial
        this.rootPage = TutorialPage;
      } else {
        // User has seen tutorial
        this.storage.get('hasLoggedIn').then((hasLoggedIn) =>  {

          console.log("hasLoggedIn: "+hasLoggedIn);
          if (hasLoggedIn == true) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        });
        //  else {
        //   this.rootPage = LoginPage;
        // }

      }
    });
    
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();

  }

  oneSignal() {
        if(this.platform.is('cordova') && OneSignal){
            OneSignal.startInit('4dc251ad-0ac6-4f5f-8ff0-3b8b45ac5d22', '121922309077');

            OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

            OneSignal.handleNotificationReceived().subscribe((data) => {
             // do something when notification is received
             console.debug("Received notifiction from onesignal: " + JSON.stringify(data));
            });

            OneSignal.handleNotificationOpened().subscribe((data) => {
              // do something when a notification is opened
              console.debug("Opened notifiction from onesignal: " + JSON.stringify(data));
            });

            OneSignal.endInit();
        }
    }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  logOut() {
    setTimeout(() => {
        this.userData.logout();
        this.nav.setRoot(LoginPage);
      }, 1000);
    
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.nav.setRoot(HomePage);
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}
