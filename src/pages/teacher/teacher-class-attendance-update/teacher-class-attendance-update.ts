import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TeacherClassAttendanceUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-attendance-update',
  templateUrl: 'teacher-class-attendance-update.html'
})
export class TeacherClassAttendanceUpdatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAttendanceUpdatePage');
  }

}
