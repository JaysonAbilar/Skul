import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';
/*
  Generated class for the TeacherClassAttendanceAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-attendance-add',
  templateUrl: 'teacher-class-attendance-add.html'
})
export class TeacherClassAttendanceAddPage {
  
  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;
  public SubjectCode:any;

  public attendanceStudentList: FirebaseListObservable<any>;
 
  public attendanceStudent = {
  Username: '',
	Firstname: '',
	Middlename:'',
	Lastname: '',
	Age: '',
	Gender: '',
	Email: '',
	Contactnumber: '',
	Guardian: ''
  };

  public attendancePresentStudentObject: FirebaseObjectObservable<any>;
  public attendancePresentStudent = {
  Username: '',
	Firstname: '',
	Middlename:'',
	Lastname: '',
	Age: '',
	Gender: '',
	Email: '',
	Contactnumber: '',
	Guardian: ''
  };

  public attendanceDateList: FirebaseListObservable<any>;
  public attendanceDate = {
  	Date:''
  };

  public attendanceList: FirebaseListObservable<any>;
  public attendance = {
  	Date:'',
  	Student:''
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');
  	 this.SubjectCode = this.navParams.get('Subjectcode');

  	 this.attendanceStudentList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId);

  }

  
  addAttendance(Username, ClassId, Startyear, Endyear, SubjectCode, AttendanceDate, Student)
  {  
  	for (var i = 0; i < Student.length; i++) { 
	  this.attendancePresentStudentObject = this.af.database.object('/student/' + Student[i]);
	  console.log('/student/' + Student[i]);
	  this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Firstname = snapshot.Firstname); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Middlename = snapshot.Middlename); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Lastname = snapshot.Lastname); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Age = snapshot.Age); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Gender = snapshot.Gender); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Email = snapshot.Email); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Contactnumber = snapshot.Contactnumber); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Guardian = snapshot.Guardian); 

      firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/subject-attendance/' + AttendanceDate + '/' + Student[i]).set({ 
	  	  Firstname: this.attendancePresentStudent.Firstname,
	      Middlename: this.attendancePresentStudent.Middlename,
	      Lastname: this.attendancePresentStudent.Lastname,
	      Age: this.attendancePresentStudent.Age,
	      Gender: this.attendancePresentStudent.Gender,
	      Email: this.attendancePresentStudent.Email,
	      Contactnumber: this.attendancePresentStudent.Contactnumber,
	      Guardian: this.attendancePresentStudent.Guardian
	  	 }).then( newTeacher => {		      
		    }, error => {
		      console.log(error);
	   });
	}
  	 
  	this.navCtrl.pop();
  }
  

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAttendanceAddPage');
  }

}
