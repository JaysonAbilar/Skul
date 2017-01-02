import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GuardianHomePage } from '../guardian-home/guardian-home';

/*
  Generated class for the GuardianDashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-dashboard',
  templateUrl: 'guardian-dashboard.html'
})
export class GuardianDashboardPage {
	
	public Username: '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.Username =  this.navParams.data.Username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardianDashboardPage');
  }

}
