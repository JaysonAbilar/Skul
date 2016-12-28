import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminTeacherListPage } from '../admin-teacher-list/admin-teacher-list';
import { AdminGuardianListPage } from '../admin-guardian-list/admin-guardian-list';
import { AdminSubjectListPage } from '../admin-subject-list/admin-subject-list';
import { AdminStudentListPage } from '../admin-student-list/admin-student-list';
import { AdminClassListPage } from '../admin-class-list/admin-class-list';
import { AdminClassSubjectListPage } from '../admin-class-subject-list/admin-class-subject-list';
/*
  Generated class for the AdminHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html'
})
export class AdminHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  goToAdminTeacherList(){

    this.navCtrl.push(AdminTeacherListPage);

  }

  goToAdminGuardianList(){

    this.navCtrl.push(AdminGuardianListPage);

  }

  goToAdminSubjectList(){

    this.navCtrl.push(AdminSubjectListPage);

  }

  goToAdminStudentList(){

    this.navCtrl.push(AdminStudentListPage);

  }

  goToAdminClassList(){

    this.navCtrl.push(AdminClassListPage);

  }
  
  goToAdminClassSubjectList()
  {
    this.navCtrl.push(AdminClassSubjectListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

}
