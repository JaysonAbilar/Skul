import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AdminHomePage } from '../admin-home/admin-home';
import { AdminClassStudentAddPage } from '../admin-class-student-add/admin-class-student-add';

/*
/*
  Generated class for the AdminClassStudentList2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-class-student-list-2',
  templateUrl: 'admin-class-student-list-2.html'
})
export class AdminClassStudentList2Page {
  
  classsList: FirebaseListObservable<any>;
  public classs = {
    Id: '',
  	StartYear: '',
  	EndYear: '',
  	Year:'',
  	Section:''

  };

  classStudentList: FirebaseListObservable<any>;
  classStudent = {
  	ClassStudent:'',
    Student: ''
  };

  studentClassList: FirebaseListObservable<any>;
  public taf: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    this.taf = af;
  	this.classsList = this.af.database.list('/class');

    this.classs.Id = this.navParams.get('key');
    this.classs.StartYear = this.navParams.get('StartYear');
    this.classs.EndYear = this.navParams.get('EndYear');
    this.classs.Year = this.navParams.get('Year');
    this.classs.Section = this.navParams.get('Section');

    this.classStudentList = this.af.database.list('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/class-student/' + this.classs.Id);

  }

  goToAdminClassStudentAdd()
  {
  	this.navCtrl.push(AdminClassStudentAddPage, {
      key: this.classs.Id,
      StartYear: this.classs.StartYear,
      EndYear: this.classs.EndYear,
      Year: this.classs.Year,
      Section: this.classs.Section,
    });
  }


  deleteClassStudent(classStudent)
  {
    this.studentClassList = this.taf.database.list('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/student-class/' + classStudent.Student);
    console.log('/academic-year/' + this.classs.StartYear + '-' + this.classs.EndYear + '/student-class/' + classStudent.Student);
    console.log(this.classs.Id);
    this.studentClassList.remove(this.classs.Id); 
    this.classStudentList.remove(classStudent); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminClassStudentList2Page');
  }

}
