import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the TeacherStudentProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-student-profile',
  templateUrl: 'teacher-student-profile.html'
})
export class TeacherStudentProfilePage {
  Student:'';
  studentObject: FirebaseObjectObservable<any>;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

    this.Student = this.navParams.get('Student');
  	this.studentObject = af.database.object('/student/' + this.Student);
    
    this.studentObject.subscribe(snapshot => this.student.Username = snapshot.$key); 
    this.studentObject.subscribe(snapshot => this.student.Password = snapshot.Password);
    this.studentObject.subscribe(snapshot => this.student.Firstname = snapshot.Firstname);
    this.studentObject.subscribe(snapshot => this.student.Middlename = snapshot.Middlename);
    this.studentObject.subscribe(snapshot => this.student.Lastname = snapshot.Lastname);
    this.studentObject.subscribe(snapshot => this.student.Age = snapshot.Age);
    this.studentObject.subscribe(snapshot => this.student.Gender = snapshot.Gender);
    this.studentObject.subscribe(snapshot => this.student.Email = snapshot.Email);
    this.studentObject.subscribe(snapshot => this.student.Contactnumber = snapshot.Contactnumber);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherStudentProfilePage');
  }

}
