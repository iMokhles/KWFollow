import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { KWFollowApp } from './app.component';

// Providers
import { UserData } from '../providers/user-data';
import { HttpClient } from '../providers/HttpClient';
import { LoginService } from '../pages/login/login.service';
import { SignupService } from '../pages/signup/signup.service';
import { HomeService } from '../pages/home/home.service';

// pages
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { HistoryPage } from '../pages/history/history';
import { InfoPage } from '../pages/info/info';
import { InstructionsPage } from '../pages/instructions/instructions';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { NotificationsPage } from '../pages/notifications/notifications';
import { OrderPage } from '../pages/order/order';
import { TutorialPage } from '../pages/tutorial/tutorial';

@NgModule({
  declarations: [
    KWFollowApp,
    AccountPage,
    HomePage,
    CartPage,
    CheckoutPage,
    HistoryPage,
    InfoPage,
    InstructionsPage,
    LoginPage,
    SignupPage,
    NotificationsPage,
    OrderPage,
    TutorialPage
  ],
  imports: [
    IonicModule.forRoot(KWFollowApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    KWFollowApp,
    AccountPage,
    HomePage,
    CartPage,
    CheckoutPage,
    HistoryPage,
    InfoPage,
    SignupPage,
    InstructionsPage,
    LoginPage,
    NotificationsPage,
    OrderPage,
    TutorialPage
  ],
  providers: [UserData, HttpClient, LoginService, SignupService, HomeService, Storage]
})
export class AppModule {}
