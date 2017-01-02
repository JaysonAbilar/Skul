import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the TeacherClassAttendanceList2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-attendance-list-2',
  templateUrl: 'teacher-class-attendance-list-2.html'
})
export class TeacherClassAttendanceList2Page {

  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;
  public SubjectCode:any;
  public AttendanceDate:any;

  presentStudentsList: FirebaseListObservable<any>;
  presentStudents = {
    Username: '',
	Password: '',
	Firstname: '',
	Middlename:'',
	Lastname: '',
	Age: '',
	Gender: '',
	Email: '',
	Contactnumber: '',
	Guardian: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');
  	 this.SubjectCode = this.navParams.get('Subjectcode');
  	 this.AttendanceDate = this.navParams.get('Attendancedate');


  	 this.presentStudentsList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode +
  	 					'/subject-attendance/' + this.AttendanceDate);
  	 console.log('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode +
  	 					'/subject-attendance/' + this.AttendanceDate);

  }
  
  deletePresentStudents(presentStudents)
  {
     this.presentStudentsList.remove(presentStudents);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAttendanceList2Page');
  }

}
