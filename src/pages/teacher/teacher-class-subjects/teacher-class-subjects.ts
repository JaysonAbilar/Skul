import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the TeacherClassSubjects page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-subjects',
  templateUrl: 'teacher-class-subjects.html'
})
export class TeacherClassSubjectsPage {
  
  subjecttList: FirebaseListObservable<any>;
  subject = {
    Subjectcode: '',
	Name: '',
	Description: '',
  };

  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');

  	 this.subjecttList= this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/teacher-class/' + this.Username + "/" + this.ClassId);
  	 console.log('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/teacher-class/' + this.Username + "/" + this.ClassId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassSubjectsPage');
  }

}
