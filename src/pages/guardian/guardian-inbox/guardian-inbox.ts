import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

/*
  Generated class for the GuardianInbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-inbox',
  templateUrl: 'guardian-inbox.html'
})
export class GuardianInboxPage {

	public messageList: FirebaseListObservable<any>;
	public Username:'';
  	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire)  {
  		this.Username =  this.navParams.data.Username;
  		this.messageList = this.af.database.list('/guardian/' + this.Username + '/inbox');
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad GuardianInboxPage');
  	}
}
