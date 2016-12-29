import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeacherHomePage } from '../teacher-home/teacher-home';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the TeacherProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-profile',
  templateUrl: 'teacher-profile.html'
})
export class TeacherProfilePage {

  Username:'';
  teacherObject: FirebaseObjectObservable<any>;

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

  	this.Username =  this.navParams.data.Username;

  	this.teacherObject = af.database.object('/teacher/' + this.Username);
    
    this.teacherObject.subscribe(snapshot => this.teacher.Username = snapshot.$key); 
    this.teacherObject.subscribe(snapshot => this.teacher.Password = snapshot.Password);
    this.teacherObject.subscribe(snapshot => this.teacher.Firstname = snapshot.Firstname);
    this.teacherObject.subscribe(snapshot => this.teacher.Middlename = snapshot.Middlename);
    this.teacherObject.subscribe(snapshot => this.teacher.Lastname = snapshot.Lastname);
    this.teacherObject.subscribe(snapshot => this.teacher.Age = snapshot.Age);
    this.teacherObject.subscribe(snapshot => this.teacher.Gender = snapshot.Gender);
    this.teacherObject.subscribe(snapshot => this.teacher.Email = snapshot.Email);
    this.teacherObject.subscribe(snapshot => this.teacher.Contactnumber = snapshot.Contactnumber);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherProfilePage');
  }

}
