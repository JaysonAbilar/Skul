import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { StudentClassSubjectAttendancePage } from '../student-class-subject-attendance/student-class-subject-attendance';
import { StudentClassSubjectReminderPage } from '../student-class-subject-reminder/student-class-subject-reminder';
/*
  Generated class for the StudentClassSubject page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-class-subject',
  templateUrl: 'student-class-subject.html'
})
export class StudentClassSubjectPage {
  
  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any; 

  subjecttList: FirebaseListObservable<any>;
  subject = {
    Subjectcode: '',
	Name: '',
	Description: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.Username = this.navParams.get('Username');
  	this.ClassId = this.navParams.get('ClassId');
  	this.Startyear = this.navParams.get('Startyear');
  	this.Endyear = this.navParams.get('Endyear');

  	this.subjecttList= this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId);
  	console.log('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId)

  }

  viewReminders(Username,ClassId,Startyear,Endyear,Subjectcode)
  {
  	this.navCtrl.push(StudentClassSubjectReminderPage,
  	{
  	     Username:Username,
         ClassId:ClassId,
         Startyear:Startyear,
         Endyear:Endyear,
         Subjectcode:Subjectcode
  	});
  }

  viewAttendance(Username,ClassId,Startyear,Endyear,Subjectcode)
  {
  	this.navCtrl.push(StudentClassSubjectAttendancePage,
  	{
  	     Username:Username,
         ClassId:ClassId,
         Startyear:Startyear,
         Endyear:Endyear,
         Subjectcode:Subjectcode
  	});
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentClassSubjectPage');
  }

}
