import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';


/*
  Generated class for the AdminClassStudentAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-student-add',
  templateUrl: 'admin-class-student-add.html'
})
export class AdminClassStudentAddPage {
  
  studentList: FirebaseListObservable<any>;
  studentOjbect: FirebaseObjectObservable<any>;
  student = {
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

  classsList: FirebaseListObservable<any>;
  classs = {
    Id: '',
  	StartYear: '',
  	EndYear: '',
  	Year:'',
  	Section:''

  };


  classStudentList: FirebaseListObservable<any>;
  classStudent= {
  	Student:''
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.studentList = this.af.database.list('/student');
    this.classsList = this.af.database.list('/class');

    this.classs.Id = this.navParams.get('key');
    this.classs.StartYear = this.navParams.get('StartYear');
    this.classs.EndYear = this.navParams.get('EndYear');
    this.classs.Year = this.navParams.get('Year');
    this.classs.Section = this.navParams.get('Section');

    this.classStudentList = this.af.database.list('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-student/' + this.classs.Id);
  }

  addClassStudent(Student) {      
      this.studentOjbect  = this.af.database.object('/student/' + Student);

      this.studentOjbect.subscribe(snapshot => this.student.Firstname = snapshot.Firstname); 
      this.studentOjbect.subscribe(snapshot => this.student.Middlename = snapshot.Middlename); 
      this.studentOjbect.subscribe(snapshot => this.student.Lastname = snapshot.Lastname); 
      this.studentOjbect.subscribe(snapshot => this.student.Age = snapshot.Age); 
      this.studentOjbect.subscribe(snapshot => this.student.Gender = snapshot.Gender); 
      this.studentOjbect.subscribe(snapshot => this.student.Email = snapshot.Email); 
      this.studentOjbect.subscribe(snapshot => this.student.Contactnumber = snapshot.Contactnumber); 


      firebase.database().ref('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-student/' + this.classs.Id + "/" + Student).set({ 
      Student: Student,
      Firstname:this.student.Firstname,
      Middlename:this.student.Middlename,
      Lastname:this.student.Lastname,
      Age:this.student.Age,
      Gender:this.student.Gender,
      Email:this.student.Email,
      Contactnumber:this.student.Contactnumber

      }).then( newClassSubject=> {
        firebase.database().ref('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/student-class/' + Student + "/" + this.classs.Id).set({ 
          Student: Student,
         }).then( newClassSubject=> {
            this.navCtrl.pop();
          }, error => {
            console.log(error);
        });
      }, error => {
        console.log(error);
      });
    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassStudentAddPage');
  }

}
