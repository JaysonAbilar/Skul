import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { StudentHomePage } from '../student-home/student-home';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { LoginPage } from '../../login/login';
import { StudentClassSubjectPage } from '../student-class-subject/student-class-subject';

/*
  Generated class for the StudentDashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html'
})
export class StudentDashboardPage {
 
  public Username:'';
  
  public classs = {
    Id: '',
    StartYear: '',
    EndYear: '',
    Year: '',
    Section: ''
  };

  public studentClassObject: FirebaseObjectObservable<any>;
  public studentClass = {
    classId: ''
  };

  currentAcademicYearObject: FirebaseObjectObservable<any>;

  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.Username =  this.navParams.data.Username;
    this.classs.StartYear = this.navParams.get('Startyear');
    this.classs.EndYear = this.navParams.get('Endyear')

    this.studentClassObject = this.af.database.object('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear  + '/student-class/' + this.Username);
    this.studentClassObject.subscribe(snapshot => this.studentClass.classId = snapshot.ClassId); 

    console.log('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/teacher-class/' + this.Username)

  }
  
  initializeStudentClassObject(syr,eyr)
  {
    

    console.log('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/student-class/' + this.Username)
  }
  
  goToSelectedClass(Username,ClassId)
  {
     this.navCtrl.push(StudentClassSubjectPage,
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
    console.log('ionViewDidLoad StudentDashboardPage');
  }

}
