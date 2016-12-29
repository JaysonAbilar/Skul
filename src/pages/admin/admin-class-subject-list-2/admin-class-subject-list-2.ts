import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminClassSubjectAddPage } from '../admin-class-subject-add/admin-class-subject-add';
import { AdminClassSubjectUpdatePage } from '../admin-class-subject-update/admin-class-subject-update';
/*
  Generated class for the AdminClassSubjectList2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-subject-list-2',
  templateUrl: 'admin-class-subject-list-2.html'
})
export class AdminClassSubjectList2Page {
  
  classsList: FirebaseListObservable<any>;
  classs = {
    Id: '',
  	StartYear: '',
  	EndYear: '',
  	Year:'',
  	Section:''

  };

  classSubjectList: FirebaseListObservable<any>;
  classSubject = {
  	ClassSubjectCode:'',
    SubjectCode: '',
  	Teacher: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    this.classsList = this.af.database.list('/class');

    this.classs.Id = this.navParams.get('key');
    this.classs.StartYear = this.navParams.get('StartYear');
    this.classs.EndYear = this.navParams.get('EndYear');
    this.classs.Year = this.navParams.get('Year');
    this.classs.Section = this.navParams.get('Section');

    this.classSubjectList = this.af.database.list('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-subject/' + this.classs.Id);


  }
  
  goToAdminClassSubjectAdd()
  {
  	this.navCtrl.push(AdminClassSubjectAddPage, {
      key: this.classs.Id,
      StartYear: this.classs.StartYear,
      EndYear: this.classs.EndYear,
      Year: this.classs.Year,
      Section: this.classs.Section,

    });
  }

  editClassSubject(ClassSubjectCode, SubjectCode, Teacher)
  {
  	this.navCtrl.push(AdminClassSubjectUpdatePage, {
      key: this.classs.Id,
      StartYear: this.classs.StartYear,
      EndYear: this.classs.EndYear,
      Year: this.classs.Year,
      Section: this.classs.Section,
      ClassSubjectCode: ClassSubjectCode,
      SubjectCode: SubjectCode,
      Teacher: Teacher
    });
  }
  
  deleteClassSubject(classSubject)
  {
    this.classSubjectList.remove(classSubject); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassSubjectList2Page');
  }

}
