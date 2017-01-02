import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { TeacherHomePage } from '../teacher-home/teacher-home';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { LoginPage } from '../../login/login';
import { TeacherClassPage } from '../teacher-class/teacher-class';
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
  
  public Username:'';
  
  public classsList: FirebaseListObservable<any>;
  public classs = {
    Id: '',
    StartYear: '',
    EndYear: '',
    Year: '',
    Section: ''
  };

  public teacherClassList: FirebaseListObservable<any>;
  public teacherClass = {
    classId: ''
  };


  currentAcademicYearObject: FirebaseObjectObservable<any>;

  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.Username =  this.navParams.data.Username;

    this.currentAcademicYearObject = this.af.database.object('/current-academic-year');
    this.currentAcademicYearObject.subscribe(snapshot => this.classs.StartYear = snapshot.Startyear); 
    this.currentAcademicYearObject.subscribe(snapshot => this.classs.EndYear = snapshot.Endyear); 

    this.classsList = this.af.database.list('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/class-subject');

    this.teacherClassList = this.af.database.list('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/teacher-class/' + this.Username);

    console.log('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/teacher-class/' + this.Username)
  }
  
  initializeTeacherClassList(syr,eyr)
  {
    this.teacherClassList = this.af.database.list('/academic-year/'+ syr  + '-' + eyr + '/teacher-class/' + this.Username);

    console.log('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/teacher-class/' + this.Username)
  }

  goToSelectedClass(Username,ClassId)
  {
     this.navCtrl.push(TeacherClassPage,
      {
         Username: Username,
         ClassId: ClassId,
         Startyear: this.classs.StartYear,
         Endyear: this.classs.EndYear
      });
  }
  logOut(){
    this.app.getRootNav().push(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherDashboardPage');
  }

}
