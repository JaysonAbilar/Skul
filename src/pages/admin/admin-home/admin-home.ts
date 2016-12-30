import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AdminTeacherListPage } from '../admin-teacher-list/admin-teacher-list';
import { AdminGuardianListPage } from '../admin-guardian-list/admin-guardian-list';
import { AdminSubjectListPage } from '../admin-subject-list/admin-subject-list';
import { AdminStudentListPage } from '../admin-student-list/admin-student-list';
import { AdminClassListPage } from '../admin-class-list/admin-class-list';
import { AdminClassSubjectListPage } from '../admin-class-subject-list/admin-class-subject-list';
import { AdminClassStudentListPage } from '../admin-class-student-list/admin-class-student-list';
import { LoginPage } from '../../login/login';
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
  currentAcademicYearObject: FirebaseObjectObservable<any>;
  currentAcademicYear = {
    Startyear: '',
    Endyear: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

    this.currentAcademicYearObject = this.af.database.object('/current-academic-year');
    this.currentAcademicYearObject.subscribe(snapshot => this.currentAcademicYear.Startyear = snapshot.Startyear); 
    this.currentAcademicYearObject.subscribe(snapshot => this.currentAcademicYear.Endyear = snapshot.Endyear); 
  }


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

  goToAdminClassList(Startyear, Endyear){

    this.navCtrl.push(AdminClassListPage,{
      Startyear:Startyear,
      Endyear:Endyear
    });

  }
  
  goToAdminClassSubjectList()
  {
    this.navCtrl.push(AdminClassSubjectListPage);
  }

  goToAdminClassStudentList()
  {
    this.navCtrl.push(AdminClassStudentListPage);
  }

  logOut(){
    this.navCtrl.push(LoginPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

}
