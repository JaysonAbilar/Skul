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
	public DateToday: '';
	public todayString: any;	
	homeWorkList: FirebaseListObservable<any>;
	projectList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddString = dd.toString();
	var mmString = mm.toString();;
	var yyyyString = yyyy.toString();;
	

	var yyyy = today.getFullYear();
	if(dd<10){
	    ddString='0'+dd;
	} 
	if(mm<10){
	    mmString='0'+mm;
	} 
	this.todayString = yyyyString+'-'+mmString+'-'+ddString;
	console.log(this.todayString);
	this.SubjectCode = this.navParams.get('SubjectCode');
  	this.SchoolYearAndSection = this.navParams.get('SchoolYearAndSection');
  	this.homeWorkList = this.af.database.list('/academic-year/2016-2017/class-subject/' + this.SchoolYearAndSection + "/" + this.SubjectCode +'/subject-homeworks');
  	this.projectList = this.af.database.list('/academic-year/2016-2017/class-subject/' + this.SchoolYearAndSection + "/" + this.SubjectCode +'/subject-projects');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardianSubjectInfoPage');
  }

}
