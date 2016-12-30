import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';
import { AdminHomePage } from '../admin/admin-home/admin-home';
import { TeacherHomePage } from '../teacher/teacher-home/teacher-home';
import { GuardianHomePage } from '../guardian/guardian-home/guardian-home';
import { StudentHomePage } from '../student/student-home/student-home';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  adminObject: FirebaseObjectObservable<any>;
  teacherObject: FirebaseObjectObservable<any>;
  guardianObject: FirebaseObjectObservable<any>;
  studentObject: FirebaseObjectObservable<any>;

  login = {
  	Username: '',
	  Password: '',
    Role: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire,public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }

 presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  }


  authenticate(root, Password, LandingPage,Username){
    var RolePassword;
    var navigation = this.navCtrl;
    var toaster = this.toastCtrl;

    root.on('value', function(snap){
      try{
        RolePassword = snap.val().Password;  
        if(RolePassword == Password) {  
          navigation.push(LandingPage,{
            Username:Username
          });
        } else {
          let toast = toaster.create({
            message: 'Invalid Username or Password',
            duration: 500
          });
          toast.present();
        }
      } catch(e){
        let toast = toaster.create({
            message: 'Invalid Username or Password',
            duration: 500
          });
          toast.present();
        console.log("auth username failed");
      }
    });
  }

  loginUser(Username, Password, Role) { 

    if(Role == "admin"){
      var root = firebase.database().ref('admin/'+Username);
      this.authenticate(root,Password,AdminHomePage,Username);
    } else if(Role == "teacher"){
      var root = firebase.database().ref('teacher/'+Username);
      this.authenticate(root,Password,TeacherHomePage,Username);
    } else if(Role == "student"){
      var root = firebase.database().ref('student/'+Username);
      this.authenticate(root,Password,StudentHomePage,Username);
    } else if(Role == "guardian"){
      var root = firebase.database().ref('guardian/'+Username);
      this.authenticate(root,Password,GuardianHomePage,Username);
    }
    this.presentLoading();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 

}
