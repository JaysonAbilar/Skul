import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { StudentHomePage } from '../student-home/student-home';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { LoginPage } from '../../login/login';
import { StudentClassSubjectPage } from '../student-class-subject/student-class-subject';
import { LocalNotifications } from 'ionic-native';
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

  public classReminderList: FirebaseListObservable<any>;

  public classReminder = {
    code: '',
    DateAdded: '',
    Description: '',
    DueDate: '',
    DueTime: '',
    Title: '',
    Type: ''
  };
  
  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.Username =  this.navParams.data.Username;
    this.classs.StartYear = this.navParams.get('Startyear');
    this.classs.EndYear = this.navParams.get('Endyear');

    this.studentClass.classId = this.navParams.get('Classid');
    console.log(this.studentClass.classId);

    console.log('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear + '/teacher-class/' + this.Username)

  }

  
  initializeStudentClassObject(syr,eyr)
  {
     

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
     var currentDate = new Date();
     var day = currentDate.getDate();
     var month = currentDate.getMonth();
     var year = currentDate.getFullYear();
     var hour = currentDate.getHours();
     var minute = currentDate.getMinutes() + 1;

     var currenttime = new Date(year,month,day);
    this.classReminderList = this.af.database.list('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear  + '/class-reminder/' + this.studentClass.classId);

    this.classReminderList.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {

          var duedate = new Date(snapshot.DueDate);
          duedate.setHours(0);
          duedate.setMinutes(0);
          duedate.setSeconds(0);

          var duetime = duedate.getTime();
          var curtime = currenttime.getTime();
          var difftime = duetime - curtime;

          var sub = Math.round(difftime/1000*60*60*24); 
          console.log('due ' + duedate);
          console.log('ttime ' + currenttime);
          console.log('ans ' + sub);

          if(sub < 86400000)
          {

            LocalNotifications.schedule({
                  title: snapshot.Type + ": " + snapshot.Title,
                  text: "DueDate: " + snapshot.DueDate + " " + snapshot.DueTime ,
                  at: new Date(new Date().getTime() + 2 * 1000),
                  sound: 'file://assets/sounds/notif.mp3'
              });
          }
        });
    })

    console.log('/academic-year/'+ this.classs.StartYear  + '-' + this.classs.EndYear  + '/class-reminder/' + this.studentClass.classId);

  }

}
