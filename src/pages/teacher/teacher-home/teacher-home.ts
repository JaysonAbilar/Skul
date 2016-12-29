import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { TeacherDashboardPage } from '../teacher-dashboard/teacher-dashboard';
import { TeacherProfilePage } from '../teacher-profile/teacher-profile';
import { TeacherInboxPage } from '../teacher-inbox/teacher-inbox';

/*
  Generated class for the TeacherHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'teacher-home.html'
})


export class TeacherHomePage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  Username:'';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Username =  this.navParams.data;

    this.tab1Root = TeacherDashboardPage;
    this.tab2Root = TeacherProfilePage ;
    this.tab3Root = TeacherInboxPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherHomePage');
  }

}
