import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminClassSubjectAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-subject-add',
  templateUrl: 'admin-class-subject-add.html'
})
export class AdminClassSubjectAddPage {
  
  subjectList: FirebaseListObservable<any>;
  public subjectObject: FirebaseObjectObservable<any>;
  subject = {
  	SubjectCode:'',
    Name: '',
  	Description: '',

  };

  teacherList: FirebaseListObservable<any>;
  teacher = {
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


  classSubjectList: FirebaseListObservable<any>;
  classSubject = {
  	ClassSubjectCode:'',
    SubjectCode: '',
  	Teacher: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
  	this.subjectList = this.af.database.list('/subject');
    this.teacherList = this.af.database.list('/teacher');
    this.classsList = this.af.database.list('/class');

    this.classs.Id = this.navParams.get('key');
    this.classs.StartYear = this.navParams.get('StartYear');
    this.classs.EndYear = this.navParams.get('EndYear');
    this.classs.Year = this.navParams.get('Year');
    this.classs.Section = this.navParams.get('Section');

    this.classSubjectList = this.af.database.list('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-subject/' + this.classs.Id);

  }

  addClassSubject(SubjectCode, Teacher) {      
      this.subjectObject = this.af.database.object('/subject/' + SubjectCode);
      
      this.subjectObject.subscribe(snapshot => this.subject.Name = snapshot.Name); 
      this.subjectObject.subscribe(snapshot => this.subject.Description = snapshot.Description); 

      firebase.database().ref('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-subject/' + this.classs.Id + "/" + SubjectCode).set({ 
      SubjectCode: SubjectCode,
      Name: this.subject.Name,
      Description: this.subject.Description,
      Teacher: Teacher
     }).then( newClassSubject=> {
        firebase.database().ref('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/teacher-class/' +Teacher + "/" + this.classs.Id + "/" + SubjectCode).set({ 
        SubjectCode: SubjectCode,
        Teacher: Teacher,

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
    console.log('ionViewDidLoad AdminClassSubjectAddPage');
  }

}
