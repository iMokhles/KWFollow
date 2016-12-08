import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { TutorialPage } from '../tutorial/tutorial';
import { UserData } from '../../providers/user-data';
import { SignupPage } from '../signup/signup';
import { LoginService } from './login.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login: {username?: string, password?: string} = {};
  submitted = false;


  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public loginServ: LoginService,
    public userData: UserData) {

  }
  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      let loading = this.loadingCtrl.create({content: 'برجاء الانتظار'});
      loading.present();
      this.loginServ.login(this.login.username, this.login.password).subscribe(res=> {
        if (res) {
          if (res.code) {
            console.log('Response: ', res);
            // this.message = res.message;
            return;
          }
          if (res.hasOwnProperty('user')) {
            loading.dismiss();
            this.userData.login(res.user.spent,
              res.user.id,
              res.user.role,
              res.user.enabled,
              res.user.username,
              res.user.email,
              res.user.token,
              res.user.ip,
              res.user.balance);
          } else {
            loading.dismiss();
            this.presentValidAlert(res.error);
          }

        }
      })
    } else {
      this.presentNotValidAlert();
    }
  }
  presentNotValidAlert() {
    let alert = this.alertCtrl.create({
      title: 'تنبيه',
      subTitle: 'لا يمكن تنفيذ طلبك دون ادخال جميع البيانات',
      buttons: ['موافق']
    });
    alert.present();
  }
  presentResetPasswordAlert() {
    let alert = this.alertCtrl.create({
      title: 'إستعادة كلمة المرور',
      subTitle: 'قم بإدخال بريدك الالكتروني لأستعادة كلمة المرور الخاصة بك',
      inputs: [
        {
          name: 'email',
          placeholder: 'البريد الالكتروني'
        }
      ],
      buttons: [
        {
          text: 'إلغاء',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'تم',
          handler: data => {
            if (this.validateEmail(data.email)){
              // logged in!
              let loading = this.loadingCtrl.create({content: 'برجاء الانتظار'});
              loading.present();
              this.loginServ.resetPassword(data.email).subscribe(res=> {
                if (res) {
                  if (res.code) {
                    console.log('Response: ', res);
                    // this.message = res.message;
                    return;
                  }
                  if (res.hasOwnProperty('success')) {
                    loading.dismiss();
                    this.presentValidAlert(res.success);
                  } else {
                    loading.dismiss();
                    this.presentValidAlert(res.errors.message);
                  }
                }
              })
            } else {
              // invalid login
              this.presentNotValidEmailAlert();
            }
          }
        }
      ]
    });
    alert.present();
  }
  validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
  }
  presentNotValidEmailAlert() {
    let alert = this.alertCtrl.create({
      title: 'تنبيه',
      subTitle: 'يجب التأكد من إدخالك بريد الكتروني صحيح',
      buttons: ['موافق']
    });
    alert.present();
  }
  presentValidAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'تنبيه',
      subTitle: message,
      buttons: ['موافق']
    });
    alert.present();
  }
  presentLoadingDefault(message) {
    let loading = this.loadingCtrl.create({
      content: message
    });

    loading.present();
    // loading.dismiss();
  }
  onSignup() {
    this.navCtrl.push(SignupPage);
  }
  startApp() {
    // this.navCtrl.push(TutorialPage);
    // this.storage.set('hasSeenTutorial', 'false');
  }

}
