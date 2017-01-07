import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { TeacherClassAttendanceListPage } from '../teacher-class-attendance-list/teacher-class-attendance-list';
import * as firebase from 'firebase';
import { SMS } from 'ionic-native'
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
  

  public hours:any;


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

  guardianObject: FirebaseObjectObservable<any>;

  public guardian = {
    Username: '',
    Password: '',
    Firstname: '',
    Middlename:'',
    Lastname: '',
    Age: '',
    Gender: '',
    Email: '',
    Contactnumber: ''
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


    for (var i = 0; i < Student.length; i++) 
    { 
      var date = new Date();
      this.hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      var am_pm = date.getHours() >= 12 ? "PM" : "AM";
      this.hours = this.hours < 10 ? "0" + this.hours : this.hours;
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var time = this.hours + ":" + minutes + ":" + seconds + " " + am_pm;


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

      this.guardianObject = this.af.database.object('/student/' + Student[i] + '/Guardian');    
      this.guardianObject.subscribe(snapshot => this.guardian.Username = snapshot.Username); 
      this.guardianObject.subscribe(snapshot => this.guardian.Firstname = snapshot.Firstname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Middlename = snapshot.Middlename); 
      this.guardianObject.subscribe(snapshot => this.guardian.Lastname = snapshot.Lastname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Age= snapshot.Age); 
      this.guardianObject.subscribe(snapshot => this.guardian.Gender = snapshot.Gender); 
      this.guardianObject.subscribe(snapshot => this.guardian.Email = snapshot.Email); 
      this.guardianObject.subscribe(snapshot => this.guardian.Contactnumber = snapshot.Contactnumber); 

      var message = "Greetings mam/sir. " + 
          this.attendancePresentStudent.Firstname[i] + " " + this.attendancePresentStudent.Lastname[i] + " is present in his/her current subject " +
          SubjectCode + " at exactly " + time;


      var options={
            replaceLineBreaks: true, 
            android: {
                 intent: ''
              }
        }

      console.log(this.guardian.Contactnumber);
      console.log(message);
      SMS.send(this.guardian.Contactnumber, message ,options)
        .then(()=>{
          alert("success");
        },()=>{
        alert("failed");
        });

      firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/subject-attendance/' + AttendanceDate + '/' + Student[i]).set({ 
        Firstname: this.attendancePresentStudent.Firstname[i],
        Middlename: this.attendancePresentStudent.Middlename[i],
        Lastname: this.attendancePresentStudent.Lastname[i],
        Age: this.attendancePresentStudent.Age[i],
        Gender: this.attendancePresentStudent.Gender[i],
        Email: this.attendancePresentStudent.Email[i],
        Contactnumber: this.attendancePresentStudent.Contactnumber[i],
        Guardian: this.attendancePresentStudent.Guardian[i]
       });

       firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/student-attendance/' + Student[i] + '/' + AttendanceDate).set({ 
         Date:AttendanceDate
       })
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

      this.guardianObject = this.af.database.object('/student/' + Student[i] + '/Guardian');    
      this.guardianObject.subscribe(snapshot => this.guardian.Username = snapshot.Username); 
      this.guardianObject.subscribe(snapshot => this.guardian.Firstname = snapshot.Firstname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Middlename = snapshot.Middlename); 
      this.guardianObject.subscribe(snapshot => this.guardian.Lastname = snapshot.Lastname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Age= snapshot.Age); 
      this.guardianObject.subscribe(snapshot => this.guardian.Gender = snapshot.Gender); 
      this.guardianObject.subscribe(snapshot => this.guardian.Email = snapshot.Email); 
      this.guardianObject.subscribe(snapshot => this.guardian.Contactnumber = snapshot.Contactnumber); 

    }
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAttendanceAddPage');
  }

}
