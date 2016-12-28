import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';


/*
  Generated class for the AdminSubjectUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-subject-update',
  templateUrl: 'admin-subject-update.html'
})
export class AdminSubjectUpdatePage {
  
  subjectList: FirebaseListObservable<any>;
  subject = {
    SubjectCode: '',
	Name: '',
	Description: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.subjectList = this.af.database.list('/subject');
  	this.subject.SubjectCode = this.navParams.get('key');
    this.subject.Name = this.navParams.get('Name');
    this.subject.Description = this.navParams.get('Description');

  }

  editSubject(SubjectCode, Name, Description) {	   	
   this.subjectList.update(SubjectCode, {
      Name: Name,
      Description: Description,

    }).then( newSubject => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSubjectUpdatePage');
  }

}
