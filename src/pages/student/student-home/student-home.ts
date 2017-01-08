import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { StudentDashboardPage } from '../student-dashboard/student-dashboard';
import { StudentProfilePage } from '../student-profile/student-profile';
/*
  Generated class for the StudentHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html'
})
export class StudentHomePage {

  tab1Root: any;
  tab2Root: any;

  Username:'';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.Username =  this.navParams.data;
	this.tab1Root = StudentDashboardPage;
	this.tab2Root = StudentProfilePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentHomePage');
  }

}
