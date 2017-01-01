import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminTeacherAddPage } from '../admin-teacher-add/admin-teacher-add';
import { AdminTeacherUpdatePage } from '../admin-teacher-update/admin-teacher-update';
/*
  Generated class for the AdminTeacherList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-teacher-list',
  templateUrl: 'admin-teacher-list.html'
})
export class AdminTeacherListPage {
  
  teacherList: FirebaseListObservable<any>;
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.teacherList = af.database.list('/teacher');
  }

  goToAdminTeacherAdd(){

    this.navCtrl.push(AdminTeacherAddPage);

  }

  editTeacher(teacher){
	  console.log(teacher);
	  this.navCtrl.push(AdminTeacherUpdatePage, {
	    key: teacher.$key,
	    Password: teacher.Password,
	    Firstname: teacher.Firstname,
	    Middlename: teacher.Middlename,
	    Lastname: teacher.Lastname,
	    Age: teacher.Age,
	    Gender: teacher.Gender,
	    Email: teacher.Email,
	    Contactnumber: teacher.Contactnumber
	  });
	}

  deleteTeacher(teacher) {
	   this.teacherList.remove(teacher);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTeacherListPage');
  }

}
