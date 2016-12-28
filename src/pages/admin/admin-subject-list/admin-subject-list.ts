import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminSubjectAddPage } from '../admin-subject-add/admin-subject-add';
import { AdminSubjectUpdatePage } from '../admin-subject-update/admin-subject-update';

/*
  Generated class for the AdminSubjectList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-subject-list',
  templateUrl: 'admin-subject-list.html'
})
export class AdminSubjectListPage {

  subjectList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.subjectList = af.database.list('/subject');
  }

  goToAdminSubjectAdd(){

    this.navCtrl.push(AdminSubjectAddPage);

  }

  editSubject(subject){
	 console.log(subject);
	 this.navCtrl.push(AdminSubjectUpdatePage, {
	   key: subject.$key,
	   Name: subject.Name,
	   Description: subject.Description,
	 });
  }

  deleteSubject(subject) {
	 this.subjectList.remove(subject);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSubjectListPage');
  }

}
