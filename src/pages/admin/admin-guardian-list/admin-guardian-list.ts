import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminGuardianAddPage } from '../admin-guardian-add/admin-guardian-add';
import { AdminGuardianUpdatePage } from '../admin-guardian-update/admin-guardian-update';
/*
  Generated class for the AdminGuardianList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-guardian-list',
  templateUrl: 'admin-guardian-list.html'
})
export class AdminGuardianListPage {
  
  guardianList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.guardianList = af.database.list('/guardian');
  }

  goToAdminGuardianAdd(){

    this.navCtrl.push(AdminGuardianAddPage);

  }

  editGuardian(guardian){
	  console.log(guardian);
	  this.navCtrl.push(AdminGuardianUpdatePage, {
	    key: guardian.$key,
	    Password: guardian.Password,
	    Firstname: guardian.Firstname,
	    Middlename: guardian.Middlename,
	    Lastname: guardian.Lastname,
	    Age: guardian.Age,
	    Gender: guardian.Gender,
	    Email: guardian.Email,
	    Contactnumber: guardian.Contactnumber
	  });
	}

  deleteGuardian(guardian) {
	  this.guardianList.remove(guardian);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminGuardianListPage');
  }

}
