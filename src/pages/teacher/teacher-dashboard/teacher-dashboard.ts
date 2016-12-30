import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeacherHomePage } from '../teacher-home/teacher-home';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

/*
  Generated class for the TeacherDashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-dashboard',
  templateUrl: 'teacher-dashboard.html'
})
export class TeacherDashboardPage {
  
  Username:'';
  
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

  	this.Username =  this.navParams.data.Username;

    this.currentAcademicYearObject = this.af.database.object('/current-academic-year');
    this.currentAcademicYearObject.subscribe(snapshot => this.classs.StartYear = snapshot.Startyear); 
    this.currentAcademicYearObject.subscribe(snapshot => this.classs.EndYear = snapshot.Endyear); 

    this.classsList = this.af.database.list('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/class-subject');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherDashboardPage');
  }

}
