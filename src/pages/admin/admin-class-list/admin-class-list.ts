import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminClassAddPage } from '../admin-class-add/admin-class-add';
import { AdminClassUpdatePage } from '../admin-class-update/admin-class-update';
/*
  Generated class for the AdminClassList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-list',
  templateUrl: 'admin-class-list.html'
})
export class AdminClassListPage {

  classsList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.classsList = af.database.list('/class');
  }
  
  goToAdminClassAdd(){

    this.navCtrl.push(AdminClassAddPage);

  }
  
  editClass(classs){
   console.log(classs);
   this.navCtrl.push(AdminClassUpdatePage, {
     key: classs.$key,
     StartYear: classs.StartYear,
     EndYear: classs.EndYear,
     Year: classs.Year,
     Section: classs.Section
   });
  }

  deleteClass(classs) {
   this.classsList.remove(classs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassListPage');
  }

}
