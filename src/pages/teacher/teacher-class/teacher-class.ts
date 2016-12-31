import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { TeacherClassStudentsPage } from '../teacher-class-students/teacher-class-students';
import { TeacherClassSubjectsPage } from '../teacher-class-subjects/teacher-class-subjects';
import { TeacherClassAssignmentListPage } from '../teacher-class-assignment-list/teacher-class-assignment-list';
import { TeacherClassAttendanceListPage } from '../teacher-class-attendance-list/teacher-class-attendance-list';
/*
/*
  Generated class for the TeacherClass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class',
  templateUrl: 'teacher-class.html'
})
export class TeacherClassPage {
  public Username: any;
  public ClassId: any;
  public Startyear:any;
  public Endyear:any;

  public currentAcademicYearObject : FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.Username = this.navParams.get('Username');
  	this.ClassId = this.navParams.get('ClassId');

    this.currentAcademicYearObject = this.af.database.object('/current-academic-year');
    this.currentAcademicYearObject.subscribe(snapshot => this.Startyear = snapshot.Startyear); 
    this.currentAcademicYearObject.subscribe(snapshot => this.Endyear = snapshot.Endyear); 
  }
  viewStudents(classId,startYear,endYear){
   this.navCtrl.push(TeacherClassStudentsPage, {
     ClassId:classId,
     Startyear:startYear,
     Endyear:endYear
   });
  }


  viewSubjects(Username,classId,startYear,endYear){
   this.navCtrl.push(TeacherClassSubjectsPage, {
     Username:Username,
     ClassId:classId,
     Startyear:startYear,
     Endyear:endYear
   });
  }

  viewHomeworks(Username,classId,startYear,endYear){
   this.navCtrl.push(TeacherClassAssignmentListPage, {
     Username:Username,
     ClassId:classId,
     Startyear:startYear,
     Endyear:endYear
   });
  }

  viewAttendance(Username,classId,startYear,endYear){
    this.navCtrl.push(TeacherClassAttendanceListPage, {
     Username:Username,
     ClassId:classId,
     Startyear:startYear,
     Endyear:endYear
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassPage');
  }

}
