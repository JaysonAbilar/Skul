import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { TeacherHomePage } from '../teacher-home/teacher-home';
/*
  Generated class for the TeacherInbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-inbox',
  templateUrl: 'teacher-inbox.html'
})
export class TeacherInboxPage {

	public Username:'';
	public messageList: FirebaseListObservable<any>;


  	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  		this.Username =  this.navParams.data.Username;
  		this.messageList = this.af.database.list('/teacher/' + this.Username + '/inbox');
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad TeacherInboxPage');
  	}

}
