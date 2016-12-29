import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeacherHomePage } from '../teacher-home/teacher-home';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
/*
  Generated class for the TeacherDashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-dashboard',
  templateUrl: 'teacher-dashboard.html'
})
export class TeacherDashboardPage {
  
  Username:'';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	 this.Username =  this.navParams.data.Username;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherDashboardPage');
  }

}
