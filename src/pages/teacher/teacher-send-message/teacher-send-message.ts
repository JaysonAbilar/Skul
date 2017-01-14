import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

/*
  Generated class for the TeacherSendMessage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-send-message',
  templateUrl: 'teacher-send-message.html'
})
export class TeacherSendMessagePage {

	public teacherKey: '';
	public guardianKey; '';
	public StudFirstname: '';
	public StudLastname: '';
	Message = {
	  	subject: '',
		body: '',
	};
	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire)  {
	  	this.teacherKey = this.navParams.get('teacherKey');
	  	this.guardianKey = this.navParams.get('guardianKey');
	  	this.StudFirstname = this.navParams.get('StudFirstname');
	  	this.StudLastname = this.navParams.get('StudLastname');
	}

	sendMessage(subject,body){
		var dt = new Date();
		var utcDate = dt.toUTCString();
		console.log(utcDate);
		firebase.database().ref('/guardian/' + this.guardianKey+ '/inbox/'+utcDate).set({ 
	        sender: this.teacherKey,
	        subject : subject,
	        body: body,
	        StudentFirstname: this.StudFirstname,
	        StudentLastname: this.StudLastname,
	        timestamp: utcDate
      	}).then( popOut => {
         	alert("message sent");
        }, error => {
          console.log(error);
     	});
	}
	ionViewDidLoad() {
	    console.log('ionViewDidLoad TeacherSendMessagePage');
	}

}
