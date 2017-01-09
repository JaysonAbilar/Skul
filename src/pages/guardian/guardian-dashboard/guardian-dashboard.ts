import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { GuardianHomePage } from '../guardian-home/guardian-home';
import { GuardianChildProfilePage } from '../guardian-child-profile/guardian-child-profile';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { LoginPage } from '../../login/login';
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

	studentList: FirebaseListObservable<any>;
	public Username: '';
  searchQuery: string = '';


  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.Username =  this.navParams.data.Username;
    this.studentList = af.database.list('/guardian-student/'+this.Username);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardianDashboardPage');
  }

  logOut(){
    this.app.getRootNav().push(LoginPage);
  }

  childProfile(ChildKey){
    this.navCtrl.push(GuardianChildProfilePage, {
      ChildKey: ChildKey,
      GuardianUserName: this.Username 
    });
  }
}
