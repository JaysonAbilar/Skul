import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the StudentClass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-class',
  templateUrl: 'student-class.html'
})
export class StudentClassPage {
  
  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any; 

  subjecttList: FirebaseListObservable<any>;
  subject = {
    Subjectcode: '',
	Name: '',
	Description: '',
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.Username = this.navParams.get('Username');
  	this.ClassId = this.navParams.get('ClassId');
  	this.Startyear = this.navParams.get('Startyear');
  	this.Endyear = this.navParams.get('Endyear');

  	this.subjecttList= this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId);
  	console.log('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentClassPage');
  }

}
