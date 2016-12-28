import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminTeacherAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-teacher-add',
  templateUrl: 'admin-teacher-add.html'
})
export class AdminTeacherAddPage {
  
  teacherList: FirebaseListObservable<any>;
  teacher = {
  Username: '',
	Password: '',
	Firstname: '',
	Middlename:'',
	Lastname: '',
	Age: '',
	Gender: '',
	Email: '',
	Contactnumber: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.teacherList = this.af.database.list('/teacher');

  }

  addTeacher(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber) {	   	
  	  firebase.database().ref("/teacher/" + Username).set({ 
  	  Password: Password,
      Firstname: Firstname,
      Middlename: Middlename,
      Lastname: Lastname,
      Age: Age,
      Gender: Gender,
      Email: Email,
      Contactnumber: Contactnumber
  	 }).then( newTeacher => {
	      this.navCtrl.pop();
	    }, error => {
	      console.log(error);
	    });
	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTeacherAddPage');
  }

}
