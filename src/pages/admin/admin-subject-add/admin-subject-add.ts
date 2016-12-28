import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';


/*
  Generated class for the AdminSubjectAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-subject-add',
  templateUrl: 'admin-subject-add.html'
})
export class AdminSubjectAddPage {
  
  subjectList: FirebaseListObservable<any>;
  subject = {
  SubjectCode: '',
	Name: '',
	Description: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.subjectList = this.af.database.list('/subject');
  }

  addSubject(SubjectCode, Name, Description) {	   	
  	  firebase.database().ref("/subject/" + SubjectCode).set({ 
  	  Name: Name,
      Description: Description,

  	 }).then( newSubject => {
	      this.navCtrl.pop();
	    }, error => {
	      console.log(error);
	    });
	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSubjectAddPage');
  }

}
