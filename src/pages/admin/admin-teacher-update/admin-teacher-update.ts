import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';
/*
  Generated class for the AdminTeacherUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-teacher-update',
  templateUrl: 'admin-teacher-update.html'
})
export class AdminTeacherUpdatePage {
  
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.teacherList = this.af.database.list('/teacher');
  	this.teacher.Username = this.navParams.get('key');
    this.teacher.Password = this.navParams.get('Password');
    this.teacher.Firstname = this.navParams.get('Firstname');
    this.teacher.Middlename = this.navParams.get('Middlename');
    this.teacher.Lastname = this.navParams.get('Lastname');
    this.teacher.Age = this.navParams.get('Age');
    this.teacher.Gender = this.navParams.get('Gender');
    this.teacher.Email = this.navParams.get('Email');
    this.teacher.Contactnumber = this.navParams.get('Contactnumber');
  }

  editTeacher(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber) {	   	
   this.teacherList.update(Username, {
      Password: Password,
      Firstname: Firstname,
      Middlename: Middlename,
      Lastname: Lastname,
      Age: Age,
      Gender: Gender,
      Email: Email,
      Contactnumber: Contactnumber
    }).then( newTeacher => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTeacherUpdatePage');
  }

}
