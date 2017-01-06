import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
/*
  Generated class for the GuardianChildProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-child-profile',
  templateUrl: 'guardian-child-profile.html'
})
export class GuardianChildProfilePage {

	public ChildKey: '';

  	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  		this.ChildKey = this.navParams.get('ChildKey');
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad GuardianChildProfilePage');
  	}
}
