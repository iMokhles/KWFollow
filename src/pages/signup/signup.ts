import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
// import { SignupPage } from '../signup/signup';
import { SignupService } from './signup.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signup: {email?: string, username?: string, password?: string, password2?: string} = {};
  submitted = false;


  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public signupServ: SignupService,
    public loginServ: LoginService,
    public userData: UserData) {

  }
  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
      if (this.signup.password === this.signup.password2) {
        if (this.validateEmail(this.signup.email)) {
          this.presentNotValidEmailAlert();
          return;
        }
        let loading = this.loadingCtrl.create({content: 'برجاء الانتظار'});
        loading.present();
        this.signupServ.signup(this.signup.email, this.signup.username, this.signup.password, this.signup.password2).subscribe(res=> {
          if (res) {
            if (res.code) {
              loading.dismiss();
              console.log('Response: ', res);
              return;
            }
            console.log('Response SignUp: ', res);
            if (res.hasOwnProperty('success')) {
              this.loginServ.login(this.signup.username, this.signup.password).subscribe(res=> {
                if (res) {
                  if (res.code) {
                    console.log('Response: ', res);
                    return;
                  }
                  if (res.hasOwnProperty('success')) {
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
              loading.dismiss();
              this.presentValidAlert(res.errors.message);
            }
          }
        })
      } else {
        this.presentWrongPasswordAlert();
      }
      // this.navCtrl.push(TabsPage);
    } else {
      this.presentNotValidAlert();
    }
  }
  presentNotValidAlert() {
    let alert = this.alertCtrl.create({
      title: 'تنبيه',
      subTitle: 'لا يمكن تنفيذ طلبك دون ادخال جميع البيانات بشكل صحيح',
      buttons: ['موافق']
    });
    alert.present();
  }
  popView(){
     this.navCtrl.pop();
   }
   presentNotValidEmailAlert() {
     let alert = this.alertCtrl.create({
       title: 'تنبيه',
       subTitle: 'يجب التأكد من إدخالك بريد الكتروني صحيح',
       buttons: ['موافق']
     });
     alert.present();
   }
   validateEmail(email) {
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(email);
   }
   presentValidAlert(message) {
     let alert = this.alertCtrl.create({
       title: 'تنبيه',
       subTitle: message,
       buttons: ['موافق']
     });
     alert.present();
   }
  presentWrongPasswordAlert() {
    let alert = this.alertCtrl.create({
      title: 'تنبيه',
      subTitle: 'تأكد من تطابق كلمتي المرور',
      buttons: ['موافق']
    });
    alert.present();
  }
}
