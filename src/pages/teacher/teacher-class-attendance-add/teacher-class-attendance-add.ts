import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { TeacherClassAttendanceListPage } from '../teacher-class-attendance-list/teacher-class-attendance-list';
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
 

  public attendanceDateList: FirebaseListObservable<any>;
  public attendanceDate = {
    Date:''
  };

  public attendanceList: FirebaseListObservable<any>;
  public attendance = {
    Date:'',
    Student: []
  };

  public attendancePresentStudent = {
  Username: [],
  Firstname: [],
  Middlename:[],
  Lastname: [],
  Age: [],
  Gender: [],
  Email: [],
  Contactnumber: [],
  Guardian: []
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
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Firstname[i] = snapshot.Firstname); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Middlename[i] = snapshot.Middlename); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Lastname[i] = snapshot.Lastname); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Age[i] = snapshot.Age); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Gender[i] = snapshot.Gender); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Email[i] = snapshot.Email); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Contactnumber[i] = snapshot.Contactnumber); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Guardian[i] = snapshot.Guardian); 

      firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/subject-attendance/' + AttendanceDate + '/' + Student[i]).set({ 
        Firstname: this.attendancePresentStudent.Firstname[i],
        Middlename: this.attendancePresentStudent.Middlename[i],
        Lastname: this.attendancePresentStudent.Lastname[i],
        Age: this.attendancePresentStudent.Age[i],
        Gender: this.attendancePresentStudent.Gender[i],
        Email: this.attendancePresentStudent.Email[i],
        Contactnumber: this.attendancePresentStudent.Contactnumber[i],
        Guardian: this.attendancePresentStudent.Guardian[i]
       }).then( newTeacher => {  
         firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/student-attendance/' + Student[i] + '/' + AttendanceDate).set({ 
         Date:AttendanceDate
       }).then( newTeacher => {         
        }, error => {
          console.log(error);
     });       
        }, error => {
          console.log(error);
     });
  }
     
    this.navCtrl.pop();
  }
  
  selectedValueChanged(Student)
  {
    for (var i = 0; i < Student.length; i++) { 
      
      this.attendancePresentStudent.Firstname[i] = ['temp'];
      this.attendancePresentStudent.Middlename[i] = ['wtemp'];
      this.attendancePresentStudent.Lastname[i] = ['temp'];
      this.attendancePresentStudent.Age[i] = ['temp'];
      this.attendancePresentStudent.Gender[i] = ['temp'];
      this.attendancePresentStudent.Email[i] = ['temp'];
      this.attendancePresentStudent.Contactnumber[i] = ['temp'];
      this.attendancePresentStudent.Guardian[i] = ['temp'];
  
      this.attendancePresentStudentObject = this.af.database.object('/student/' + Student[i]);
      console.log('/student/' + Student[i]);
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Firstname[i] = snapshot.Firstname); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Middlename[i] = snapshot.Middlename); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Lastname[i] = snapshot.Lastname); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Age[i] = snapshot.Age); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Gender[i] = snapshot.Gender); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Email[i] = snapshot.Email); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Contactnumber[i] = snapshot.Contactnumber); 
      this.attendancePresentStudentObject.subscribe(snapshot => this.attendancePresentStudent.Guardian[i] = snapshot.Guardian); 
    }
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAttendanceAddPage');
  }

}
