import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminClassAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-add',
  templateUrl: 'admin-class-add.html'
})
export class AdminClassAddPage {

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

    this.currentAcademicYearObject = this.af.database.object('/current-academic-year');
    this.currentAcademicYearObject.subscribe(snapshot => this.classs.StartYear = snapshot.Startyear); 
    this.currentAcademicYearObject.subscribe(snapshot => this.classs.EndYear = snapshot.Endyear); 

  	this.classsList = this.af.database.list('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/class');
    
  }

  addClass(StartYear, EndYear, Year, Section) {	   	
  	  firebase.database().ref('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/class/' + StartYear+"-"+EndYear+"_"+Year+"-"+Section).set({ 
  	  StartYear: StartYear,
      EndYear: EndYear,
      Year: Year,
      Section: Section

  	 }).then( newClasss => {
	      this.navCtrl.pop();
	    }, error => {
	      console.log(error);
	    });
	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassAddPage');
  }

}
