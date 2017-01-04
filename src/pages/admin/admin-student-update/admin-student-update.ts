import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminStudentUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-student-update',
  templateUrl: 'admin-student-update.html'
})
export class AdminStudentUpdatePage {
  
  guardianList: FirebaseListObservable<any>;
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

  studentList: FirebaseListObservable<any>;
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

  guardianStudentList: FirebaseListObservable<any>;
  public taf: any;
  public oldGuardian: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    this.taf = af;
  	this.guardianList = this.af.database.list('/guardian');
  	this.guardian.Username = this.navParams.get('key');
    this.guardian.Password = this.navParams.get('Password');
    this.guardian.Firstname = this.navParams.get('Firstname');
    this.guardian.Middlename = this.navParams.get('Middlename');
    this.guardian.Lastname = this.navParams.get('Lastname');
    this.guardian.Age = this.navParams.get('Age');
    this.guardian.Gender = this.navParams.get('Gender');
    this.guardian.Email = this.navParams.get('Email');
    this.guardian.Contactnumber = this.navParams.get('Contactnumber');

    this.studentList = this.af.database.list('/student');
  	this.student.Username = this.navParams.get('key');
    this.student.Password = this.navParams.get('Password');
    this.student.Firstname = this.navParams.get('Firstname');
    this.student.Middlename = this.navParams.get('Middlename');
    this.student.Lastname = this.navParams.get('Lastname');
    this.student.Age = this.navParams.get('Age');
    this.student.Gender = this.navParams.get('Gender');
    this.student.Email = this.navParams.get('Email');
    this.student.Contactnumber = this.navParams.get('Contactnumber');
    this.student.Guardian= this.navParams.get('Guardian');
    this.oldGuardian = this.navParams.get('Guardian');
  }

  editStudent(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber,Guardian) {	
     this.guardianStudentList = this.taf.database.list("/guardian-student/" + this.oldGuardian);   	
     this.guardianStudentList.remove(Username); 
  	 this.studentList.update(Username, {
      Password: Password,
      Firstname: Firstname,
      Middlename: Middlename,
      Lastname: Lastname,
      Age: Age,
      Gender: Gender,
      Email: Email,
      Contactnumber: Contactnumber,
      Guardian: Guardian
    }).then( newStudent => {
        firebase.database().ref("/guardian-student/" + Guardian + "/" + Username).set({ 
              Password: Password,
            Firstname: Firstname,
            Middlename: Middlename,
            Lastname: Lastname,
            Age: Age,
            Gender: Gender,
            Email: Email,
            Contactnumber: Contactnumber,
            Guardian: Guardian
             }).then( newStudent => {
                this.navCtrl.pop();
              }, error => {
                console.log(error);
        });
    }, error => {
      console.log(error);
    });
	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStudentUpdatePage');
  }

}
