import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TeacherClassAssignmentUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-assignment-update',
  templateUrl: 'teacher-class-assignment-update.html'
})
export class TeacherClassAssignmentUpdatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAssignmentUpdatePage');
  }

}
