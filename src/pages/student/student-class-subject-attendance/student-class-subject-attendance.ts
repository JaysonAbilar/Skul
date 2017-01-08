import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the StudentClassSubjectAttendance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-class-subject-attendance',
  templateUrl: 'student-class-subject-attendance.html'
})
export class StudentClassSubjectAttendancePage {

  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;
  public SubjectCode:any;
 
  attendanceDateList: FirebaseListObservable<any>;
  attendanceDate = {
  	Date:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');
  	 this.SubjectCode = this.navParams.get('Subjectcode');

  	 this.attendanceDateList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/student-attendance/' + this.Username);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentClassSubjectAttendancePage');
  }

}
