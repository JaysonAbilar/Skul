import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the StudentClassSubjectAttendance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-class-subject-attendance',
  templateUrl: 'student-class-subject-attendance.html'
})
export class StudentClassSubjectAttendancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentClassSubjectAttendancePage');
  }

}
