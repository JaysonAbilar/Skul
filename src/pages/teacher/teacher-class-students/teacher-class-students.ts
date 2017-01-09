import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TeacherStudentProfilePage } from '../teacher-student-profile/teacher-student-profile';
import { TeacherSendMessagePage } from '../teacher-send-message/teacher-send-message';
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
  guardianObject: FirebaseObjectObservable<any>;
  guardianUsername: '';
  teacherUsername: '';
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
     this.teacherUsername = this.navParams.get('Username');
  	 this.studentList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId);
  }

  createMessage(Student,StudFirstname,StudLastname)
  {
    this.guardianObject = this.af.database.object('/student/' + Student + '/Guardian');
    this.guardianObject.subscribe(snapshot => this.guardianUsername = snapshot.Username); 
    if(!this.guardianUsername){
      alert("not yet ready");
    } else {
        this.navCtrl.push(TeacherSendMessagePage,
        {
          guardianKey:this.guardianUsername,
          teacherKey:this.teacherUsername,
          StudFirstname: StudFirstname,
          StudLastname: StudLastname
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassStudentsPage');
  }

}
