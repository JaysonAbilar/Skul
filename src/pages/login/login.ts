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
	  Password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire,public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  loginUser(Username, Password) {	

    var adminObjectPassword;

    var root = firebase.database().ref('admin/'+Username);
    var navigation = this.navCtrl;
    root.on('value', function(snap){
      adminObjectPassword = snap.val().Password;  
      if(adminObjectPassword == Password) {  
        navigation.push(AdminHomePage);
      }
    });
    this.presentLoading();

    // if(adminObjectPassword){
    //   this.navCtrl.push(AdminHomePage);
    // }   
    // this.adminObject = this.af.database.object('admin/' + Username);
    
   
    // var adminObjectPassword;
    // this.adminObject.subscribe(snapshot => adminObjectPassword = snapshot.Password);
    // this.adminObject.subscribe(console.log);
    // console.log(adminObjectPassword);
    // this.adminObject.loaded().then(function(){
      
    // });

    

    // if(adminObjectPassword == Password)
    // {	
    // 	this.navCtrl.push(AdminHomePage);
    // }
    // else
    // {
    // 	let toast = this.toastCtrl.create({
	   //    message: 'Invalid Username or Password',
	   //    duration: 500
	   //  });
	   //  toast.present();
    // }

	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 

}
