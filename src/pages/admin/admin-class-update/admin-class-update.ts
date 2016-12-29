import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminClassUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-update',
  templateUrl: 'admin-class-update.html'
})
export class AdminClassUpdatePage {
  
  classsList: FirebaseListObservable<any>;
  classs = {
    Id: '',
  	StartYear: '',
  	EndYear: '',
  	Year: '',
  	Section: ''
  };

  currentAcademicYearObject: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {  	
  	this.classs.Id = this.navParams.get('key');
  	this.classs.StartYear = this.navParams.get('StartYear');
    this.classs.EndYear = this.navParams.get('EndYear');
    this.classs.Year = this.navParams.get('Year');
    this.classs.Section = this.navParams.get('Section');

    this.classsList = this.af.database.list('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/class');

  }

  editClass(Id, StartYear, EndYear, Year, Section, classs) {	 
      this.classsList.remove(Id);  	   	
  	  firebase.database().ref('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/class/' + StartYear+"-"+EndYear+"_"+Year+"-"+Section).set({ 
  	  StartYear: StartYear,
      EndYear: EndYear,
      Year: Year,
      Section: Section
  	 }).then( newClass => {
  	 	  
	      this.navCtrl.pop();
	    }, error => {
	      console.log(error);
	    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassUpdatePage');
  }

}
