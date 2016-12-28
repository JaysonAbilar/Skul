import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminGuardianAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-guardian-add',
  templateUrl: 'admin-guardian-add.html'
})
export class AdminGuardianAddPage {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.guardianList = this.af.database.list('/guardian');

  }


  addGuardian(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber) {	   	
  	  firebase.database().ref("/guardian/" + Username).set({ 
  	  Password: Password,
      Firstname: Firstname,
      Middlename: Middlename,
      Lastname: Lastname,
      Age: Age,
      Gender: Gender,
      Email: Email,
      Contactnumber: Contactnumber
  	 }).then( newGuardian => {
	      this.navCtrl.pop();
	    }, error => {
	      console.log(error);
	    });
	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminGuardianAddPage');
  }

}
