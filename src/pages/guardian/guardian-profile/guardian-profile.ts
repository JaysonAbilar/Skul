import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GuardianHomePage } from '../guardian-home/guardian-home';
/*
  Generated class for the GuardianProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-profile',
  templateUrl: 'guardian-profile.html'
})
export class GuardianProfilePage {
	public Username: '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.Username =  this.navParams.data.Username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardianProfilePage');
  }

}
