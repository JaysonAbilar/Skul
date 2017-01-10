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

  public classYear;
  public classSection;

  public currentAcademicYearObject : FirebaseObjectObservable<any>;
  public classObject: FirebaseObjectObservable<any>;
  
  public Count = {
    Students: 0,
    Subjects: 0

  };

  public classStudentList : FirebaseListObservable<any>;
  public classSubjectList : FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.Username = this.navParams.get('Username');
  	this.ClassId = this.navParams.get('ClassId');

    this.Startyear = this.navParams.get('Startyear');
    this.Endyear = this.navParams.get('Endyear');


    this.classObject= this.af.database.object('/academic-year/' + this.Startyear + '-' + this.Endyear + '/class/'+ this.ClassId);
    this.classObject.subscribe(snapshot => this.classYear = snapshot.Year); 
    this.classObject.subscribe(snapshot => this.classSection = snapshot.Section); 
    
    this.classStudentList = this.af.database.list('/academic-year/' + this.Startyear + '-' + this.Endyear + '/class-student/'+ this.ClassId);
    this.classSubjectList = this.af.database.list('/academic-year/' + this.Startyear + '-' + this.Endyear + '/class-subject/'+ this.ClassId);

  }

/*
  countObjects()
  {
    this.classStudentList.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log('students - ' + snapshot.$key + '- ' +this.Count.Students);
          this.Count.Students++;
        });
    })
    this.classSubjectList.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log('subjects - ' + snapshot.$key + '- ' + this.Count.Subjects);
          this.Count.Subjects++;
        });
    })
  }
*/
  viewStudents(classId,startYear,endYear){
   this.navCtrl.push(TeacherClassStudentsPage, {
     ClassId:classId,
     Startyear:startYear,
     Endyear:endYear,
     Username: this.Username
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

  viewReminders(Username,classId,startYear,endYear){
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
