import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';


/*
  Generated class for the GuardianSubjectInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-subject-info',
  templateUrl: 'guardian-subject-info.html'
})
export class GuardianSubjectInfoPage {

	public SubjectCode: '';
	public SchoolYearAndSection: '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.SubjectCode = this.navParams.get('SubjectCode');
  	this.SchoolYearAndSection = this.navParams.get('SchoolYearAndSection');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardianSubjectInfoPage');
  }

}
