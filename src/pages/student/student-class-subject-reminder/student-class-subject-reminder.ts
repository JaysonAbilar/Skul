import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the StudentClassSubjectReminder page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-class-subject-reminder',
  templateUrl: 'student-class-subject-reminder.html'
})
export class StudentClassSubjectReminderPage {
  
  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;
  public SubjectCode:any;
  public types: any;
  public DateToday: '';
  public todayString: any;
  homeworkList: FirebaseListObservable<any>;
  projectList: FirebaseListObservable<any>;
  meetingList: FirebaseListObservable<any>;

  attendanceDateList: FirebaseListObservable<any>;
  attendanceDate = {
    Date:''
  }
  
  homework = {
    homeworkCode: '',
    Type:'',
    Title: '',
    Description: '',
    DueDate: '',
    DueTime: '',
    DateAdded: ''
  }

  project = {
    projectCode: '',
    Type:'',
    Title: '',
    Description: '',
    DueDate: '',
    DueTime: '',
    DateAdded: ''
  }

  meeting = {
    meetingCode: '',
    Type:'',
    Title: '',
    Description: '',
    StartDate:'',
    StartTime:'',
    EndDate:'',
    EndTime:'',
    DateAdded: ''
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.types = 'Homeworks';
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
  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');
  	 this.SubjectCode = this.navParams.get('Subjectcode');

     this.attendanceDateList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/student-attendance/' + this.Username);
  	 this.homeworkList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/subject-homeworks/');
     this.projectList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/subject-projects/');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentClassSubjectReminderPage');
  }

}
