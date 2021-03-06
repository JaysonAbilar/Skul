import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminClassSubjectList2Page } from '../admin-class-subject-list-2/admin-class-subject-list-2';

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

  goToSelectedClassList(classs)
  {
  	this.navCtrl.push(AdminClassSubjectList2Page, {
      key: classs.$key,
      StartYear: classs.StartYear,
      EndYear: classs.EndYear,
      Year: classs.Year,
      Section: classs.Section,

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassSubjectListPage');
  }

}
