import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminStudentAddPage } from '../admin-student-add/admin-student-add';
import { AdminStudentUpdatePage } from '../admin-student-update/admin-student-update';
/*
  Generated class for the AdminStudentList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-student-list',
  templateUrl: 'admin-student-list.html'
})
export class AdminStudentListPage {
  
  studentList: FirebaseListObservable<any>;
  
  guardianStudentList: FirebaseListObservable<any>;
  public taf: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.taf = af;
  	this.studentList = af.database.list('/student');
  }

  goToAdminStudentAdd(){

    this.navCtrl.push(AdminStudentAddPage);

  }

  editStudent(student){
    console.log(student);
    this.navCtrl.push(AdminStudentUpdatePage, {
      key: student.$key,
      Password: student.Password,
      Firstname: student.Firstname,
      Middlename: student.Middlename,
      Lastname: student.Lastname,
      Age: student.Age,
      Gender: student.Gender,
      Email: student.Email,
      Contactnumber: student.Contactnumber,
      Guardian: student.Guardian
    });
  }

  deleteStudent(student) {
    console.log("/guardian-student/" + student.Guardian);
    console.log("student.Username");
    this.guardianStudentList = this.taf.database.list("/guardian-student/" + student.Guardian);   
    this.guardianStudentList.remove(student.$key); 
    this.studentList.remove(student);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStudentListPage');
  }

}
