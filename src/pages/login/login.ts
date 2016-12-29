import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire,public toastCtrl: ToastController) {

  }

  loginUser(Username, Password) {	
    this.adminObject = this.af.database.object('/admin/' + Username);
    this.teacherObject = this.af.database.object('/teacher/' + Username);
    this.guardianObject = this.af.database.object('/guardian/' + Username);
    this.studentObject = this.af.database.object('/student/' + Username);
    
    var adminObjectPassword;
    var teacherObjectPassword;
    var guardianObjectPassword;
    var studentObjectPassword;

    this.adminObject.subscribe(snapshot => adminObjectPassword = snapshot.Password); 
    this.teacherObject.subscribe(snapshot => teacherObjectPassword = snapshot.Password); 
    this.guardianObject.subscribe(snapshot => guardianObjectPassword = snapshot.Password); 
    this.studentObject.subscribe(snapshot => studentObjectPassword = snapshot.Password); 

    if(adminObjectPassword == Password)
    {	
    	this.navCtrl.push(AdminHomePage);
    }
    else if(teacherObjectPassword == Password)
    {
    	this.navCtrl.push(TeacherHomePage);
    }
    else if(guardianObjectPassword == Password)
    {
    	this.navCtrl.push(GuardianHomePage);
    }
    else if(studentObjectPassword == Password)
    {
    	this.navCtrl.push(StudentHomePage);
    }
    else
    {
    	let toast = this.toastCtrl.create({
	      message: 'Invalid Username or Password',
	      duration: 3000
	    });
	    toast.present();
    }

	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 

}
