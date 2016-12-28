import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminGuardianUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-guardian-update',
  templateUrl: 'admin-guardian-update.html'
})
export class AdminGuardianUpdatePage {
  
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
  	this.guardian.Username = this.navParams.get('key');
    this.guardian.Password = this.navParams.get('Password');
    this.guardian.Firstname = this.navParams.get('Firstname');
    this.guardian.Middlename = this.navParams.get('Middlename');
    this.guardian.Lastname = this.navParams.get('Lastname');
    this.guardian.Age = this.navParams.get('Age');
    this.guardian.Gender = this.navParams.get('Gender');
    this.guardian.Email = this.navParams.get('Email');
    this.guardian.Contactnumber = this.navParams.get('Contactnumber');

  }
  

  editGuardian(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber) {	   	
   this.guardianList.update(Username, {
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
    console.log('ionViewDidLoad AdminGuardianUpdatePage');
  }

}
