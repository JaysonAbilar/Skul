import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminClassSubjectAddPage } from '../admin-class-subject-add/admin-class-subject-add';
import { AdminClassSubjectUpdatePage } from '../admin-class-subject-update/admin-class-subject-update';

/*
  Generated class for the AdminClassSubjectList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-subject-list',
  templateUrl: 'admin-class-subject-list.html'
})
export class AdminClassSubjectListPage {
  
  classsList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.classsList = af.database.list('/class');
  }

  goToSelectedClass(classs)
  {
  	this.navCtrl.push(AdminClassSubjectAddPage, {
      key: classs.$key,
      StartYear: classs.EndYear,
      Year: classs.Year,
      Section: classs.Section,

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassSubjectListPage');
  }

}
