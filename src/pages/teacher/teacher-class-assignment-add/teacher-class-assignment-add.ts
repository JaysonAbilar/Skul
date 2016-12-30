import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the TeacherClassAssignmentAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-assignment-add',
  templateUrl: 'teacher-class-assignment-add.html'
})
export class TeacherClassAssignmentAddPage {
  
  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;
  public SubjectCode:any;

  public currentDate: Date;

  homeworkList: FirebaseListObservable<any>;
  homework = {
  	HomeworkCode: '',
  	Title: '',
  	Description: '',
  	DeadlineDate: '',
  	DeadlineTime: '',
  	DateAdded: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');
  	 this.SubjectCode = this.navParams.get('Subjectcode');

  	 this.currentDate = new Date();

  	 this.homeworkList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode);

  }

  addHomework(Username, ClassId, Startyear, Endyear, SubjectCode, Title, Description, DeadlineDate, DeadlineTime)
  {
  	 var day = this.currentDate.getDate();
  	 var month = this.currentDate.getMonth() + 1;
  	 var year = this.currentDate.getFullYear();

  	 firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/subject-homeworks/' + Title).set({ 
  	  Title: Title,
      Description: Description,
      DeadlineDate: DeadlineDate,
      DeadlineTime: DeadlineTime,
      DateAdded: year+'-'+month+'-'+day

  	 }).then( newTeacher => {
	      this.navCtrl.pop();
	    }, error => {
	      console.log(error);
	    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAssignmentAddPage');
  }

}
