import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TeacherClassAttendanceAddPage } from '../teacher-class-attendance-add/teacher-class-attendance-add';
import { TeacherClassAttendanceList2Page } from '../teacher-class-attendance-list-2/teacher-class-attendance-list-2';

/*
  Generated class for the TeacherClassAttendanceList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-attendance-list',
  templateUrl: 'teacher-class-attendance-list.html'
})
export class TeacherClassAttendanceListPage {
  
  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;
  public SubjectCode:any;
  
  public currentDate: Date;
  subjectList: FirebaseListObservable<any>;
  subject = {
  	SubjectCode:'',
    Name: '',
  	Description: '',

  };

  attendanceDateList: FirebaseListObservable<any>;
  attendanceDate = {
  	Date:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');

  	 this.subjectList = this.af.database.list('/academic-year/' + this.Startyear + "-" + this.Endyear +  '/teacher-class/' + this.Username + "/" + this.ClassId);
  }

  selectedValueChanged(SubjectCode)
  {
  	 this.SubjectCode = SubjectCode;
  	 this.attendanceDateList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/subject-attendance/');
  }
  
  goToAttendanceStudentList(Username,ClassId,Startyear,Endyear,SubjectCode,AttendanceDate)
  {
  	console.log(AttendanceDate);
    this.navCtrl.push(TeacherClassAttendanceList2Page,
  	{
  	     Username:Username,
         ClassId:ClassId,
         Startyear:Startyear,
         Endyear:Endyear,
         Subjectcode:SubjectCode,
         Attendancedate:AttendanceDate
  	});
  }
  

  goToAddAttendance(Username,ClassId,Startyear,Endyear,SubjectCode)
  {
  	console.log(SubjectCode);
    this.navCtrl.push(TeacherClassAttendanceAddPage,
  	{
  	     Username:Username,
         ClassId:ClassId,
         Startyear:Startyear,
         Endyear:Endyear,
         Subjectcode:SubjectCode
  	});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAttendanceListPage');
  }

}
