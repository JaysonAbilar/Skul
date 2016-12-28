import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminClassStudentList2Page } from '../admin-class-student-list-2/admin-class-student-list-2';

/*
  Generated class for the AdminClassStudentList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-student-list',
  templateUrl: 'admin-class-student-list.html'
})
export class AdminClassStudentListPage {

  classsList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.classsList = af.database.list('/class');
  }

  goToSelectedClassList(classs)
  {
  	this.navCtrl.push(AdminClassStudentList2Page, {
      key: classs.$key,
      StartYear: classs.StartYear,
      EndYear: classs.EndYear,
      Year: classs.Year,
      Section: classs.Section,

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassStudentListPage');
  }

}
