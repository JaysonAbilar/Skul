import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GuardianHomePage } from '../guardian-home/guardian-home';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

/*
  Generated class for the GuardianProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-profile',
  templateUrl: 'guardian-profile.html'
})
export class GuardianProfilePage {
	public Username: '';
  guardianObject: FirebaseObjectObservable<any>;
    guardian = {
    Firstname: '',
    Middlename:'',
    Lastname: '',
    Age: '',
    Gender: '',
    Email: '',
    Contactnumber: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
      this.Username =  this.navParams.data.Username;
      this.guardianObject = this.af.database.object('/guardian/' + this.Username);
      this.guardianObject.subscribe(snapshot => this.guardian.Firstname = snapshot.Firstname);
      this.guardianObject.subscribe(snapshot => this.guardian.Middlename = snapshot.Middlename);
      this.guardianObject.subscribe(snapshot => this.guardian.Lastname = snapshot.Lastname);
      this.guardianObject.subscribe(snapshot => this.guardian.Age = snapshot.Age);
      this.guardianObject.subscribe(snapshot => this.guardian.Gender = snapshot.Gender);
      this.guardianObject.subscribe(snapshot => this.guardian.Email = snapshot.Email);
      this.guardianObject.subscribe(snapshot => this.guardian.Contactnumber = snapshot.Contactnumber);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardianProfilePage');
  }

}
