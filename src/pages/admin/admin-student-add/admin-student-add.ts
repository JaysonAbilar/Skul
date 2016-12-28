import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminStudentAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-student-add',
  templateUrl: 'admin-student-add.html'
})
export class AdminStudentAddPage {
  guardianList: FirebaseListObservable<any>;
  guardian = {
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

  studentList: FirebaseListObservable<any>;
  student = {
    Username: '',
	Password: '',
	Firstname: '',
	Middlename:'',
	Lastname: '',
	Age: '',
	Gender: '',
	Email: '',
	Contactnumber: '',
	Guardian: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.guardianList = this.af.database.list('/guardian');
    this.studentList = this.af.database.list('/student');

  }

   addStudent(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber,Guardian) {	   	
  	  firebase.database().ref("/student/" + Username).set({ 
  	  Password: Password,
      Firstname: Firstname,
      Middlename: Middlename,
      Lastname: Lastname,
      Age: Age,
      Gender: Gender,
      Email: Email,
      Contactnumber: Contactnumber,
      Guardian: Guardian

  	 }).then( newStudent => {
	      this.navCtrl.pop();
	    }, error => {
	      console.log(error);
	    });
	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStudentAddPage');
  }

}
