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

  guardianObject: FirebaseObjectObservable<any>;
  guardian = {
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
  	this.studentList = this.af.database.list('/temp-student');
    this.classsList = this.af.database.list('/class');

    this.classs.Id = this.navParams.get('key');
    this.classs.StartYear = this.navParams.get('StartYear');
    this.classs.EndYear = this.navParams.get('EndYear');
    this.classs.Year = this.navParams.get('Year');
    this.classs.Section = this.navParams.get('Section');

    this.classStudentList = this.af.database.list('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-student/' + this.classs.Id);
  }
  addClassStudent(Student) {   
    
    for (var i = 0; i < Student.length; i++) { 
      
      this.studentOjbect  = this.af.database.object('/student/' + Student[i]);
      this.studentOjbect.subscribe(snapshot => this.student.Firstname = snapshot.Firstname); 
      this.studentOjbect.subscribe(snapshot => this.student.Middlename = snapshot.Middlename); 
      this.studentOjbect.subscribe(snapshot => this.student.Lastname = snapshot.Lastname); 
      this.studentOjbect.subscribe(snapshot => this.student.Age = snapshot.Age); 
      this.studentOjbect.subscribe(snapshot => this.student.Gender = snapshot.Gender); 
      this.studentOjbect.subscribe(snapshot => this.student.Email = snapshot.Email); 
      this.studentOjbect.subscribe(snapshot => this.student.Contactnumber = snapshot.Contactnumber); 

      this.guardianObject = this.af.database.object('/student/' + Student[i] + '/Guardian');    
      this.guardianObject.subscribe(snapshot => this.guardian.Username = snapshot.Username); 
      this.guardianObject.subscribe(snapshot => this.guardian.Firstname = snapshot.Firstname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Middlename = snapshot.Middlename); 
      this.guardianObject.subscribe(snapshot => this.guardian.Lastname = snapshot.Lastname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Age= snapshot.Age); 
      this.guardianObject.subscribe(snapshot => this.guardian.Gender = snapshot.Gender); 
      this.guardianObject.subscribe(snapshot => this.guardian.Email = snapshot.Email); 
      this.guardianObject.subscribe(snapshot => this.guardian.Contactnumber = snapshot.Contactnumber); 

      console.log('/student/' + Student[i]);  
      firebase.database().ref('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-student/' + this.classs.Id + "/" + Student[i]).set({ 
      Firstname:this.student.Firstname,
      Middlename:this.student.Middlename,
      Lastname:this.student.Lastname,
      Age:this.student.Age,
      Gender:this.student.Gender,
      Email:this.student.Email,
      Contactnumber:this.student.Contactnumber
      });

      firebase.database().ref('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/student-class/' + Student[i]).set({ 
        ClassId: this.classs.Id
       });

      firebase.database().ref('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-student/' + this.classs.Id + '/' + Student[i] + '/Guardian').set({ 
        Username: this.guardian.Username,
        Firstname : this.guardian.Firstname,
        Middlename: this.guardian.Middlename,
        Lastname: this.guardian.Lastname,
        Age: this.guardian.Age,
        Gender: this.guardian.Gender,
        Email: this.guardian.Email,
        Contactnumber: this.guardian.Contactnumber
      });

       this.studentList.remove(Student[i]);

    }
    this.navCtrl.pop();
      
    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassStudentAddPage');
  }

}
