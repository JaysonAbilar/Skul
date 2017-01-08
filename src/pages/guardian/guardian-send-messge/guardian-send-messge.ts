import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

/*
  Generated class for the GuardianSendMessge page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-send-messge',
  templateUrl: 'guardian-send-messge.html'
})
export class GuardianSendMessgePage {

	public teacherCode: '';
	public childFirstname: '';
	public childLastname: '';
	public guardianUsername; '';
	  Message = {
	  	subject: '',
		body: '',
	  };
	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
	  	this.teacherCode = this.navParams.get('teacherCode');
	  	this.guardianUsername = this.navParams.get('GuardianUsername');
	  	this.childFirstname = this.navParams.get('ChildFirstname');
	  	this.childLastname = this.navParams.get('ChildLastname');

	  	console.log(this.guardianUsername);
	}

	sendMessage(subject,body){
		var dt = new Date();
		var utcDate = dt.toUTCString();
		console.log(utcDate);
		firebase.database().ref('/teacher/' + this.teacherCode+ '/inbox/'+this.guardianUsername+'/'+utcDate).set({ 
	        sender: this.guardianUsername,
	        subject : subject,
	        body: body,
	        childFirstname: this.childFirstname,
	        childLastname: this.childLastname,
	        timestamp: utcDate
      	}).then( popOut => {
          this.navCtrl.pop();
        }, error => {
          console.log(error);
     	});
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad GuardianSendMessgePage');
  	}	

}
