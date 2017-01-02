import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TeacherStudentProfilePage } from '../teacher-student-profile/teacher-student-profile';
/*
  Generated class for the TeacherClassStudents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-students',
  templateUrl: 'teacher-class-students.html'
})
export class TeacherClassStudentsPage {

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

  public ClassId:any;
  public Startyear:any;
  public Endyear:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');

  	 this.studentList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId);
  	 console.log('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId)
  }

  viewStudentProfile(Student)
  {
    this.navCtrl.push(TeacherStudentProfilePage,
    {
       Student:Student
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassStudentsPage');
  }

}
