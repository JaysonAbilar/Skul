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
  projectList: FirebaseListObservable<any>;
  meetingList: FirebaseListObservable<any>;
  reminder= {
  	reminderCode: '',
    Type:'',
  	Title: '',
  	Description: '',
    StartDate:'',
    StartTime:'',
    EndDate:'',
    EndTime:'',
  	DueDate: '',
  	DueTime: '',
  	DateAdded: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');
  	 this.SubjectCode = this.navParams.get('Subjectcode');

  	 this.currentDate = new Date();

  }

  addHomework(Username, ClassId, Startyear, Endyear, SubjectCode, Type, Title, Description, DueDate, DueTime, 
                StartDate, StartTime, EndDate, EndTime)
  {
  	 var day = this.currentDate.getDate();
  	 var month = this.currentDate.getMonth() + 1;
  	 var year = this.currentDate.getFullYear();

     if(Type=='Homework')
     {
    	 firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/subject-homeworks/hw_' + Title + '_' +  year+'-'+month+'-'+day).set({ 
    	  Title: Title,
        Description: Description,
        DueDate: DueDate,
        DueTime: DueTime,
        DateAdded: year+'-'+month+'-'+day
    	 }).then( newClassAssignment => {
  	      this.navCtrl.pop();
  	    }, error => {
  	      console.log(error);
  	    });
    }
    else if(Type=='Project')
    {
       firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/subject-projects/proj_' + Title + '_' +  year+'-'+month+'-'+day).set({ 
        Title: Title,
        Description: Description,
        DueDate: DueDate,
        DueTime: DueTime,
        DateAdded: year+'-'+month+'-'+day
       }).then( newClassAssignment => {
          this.navCtrl.pop();
        }, error => {
          console.log(error);
        });
    }
    else if(Type=='Meeting')
    {
       firebase.database().ref('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + "/" + this.SubjectCode + '/subject-meetings/meet_' + Title + '_' +  year+'-'+month+'-'+day).set({ 
        Title: Title,
        Description: Description,
        StartDate: StartDate,
        StartTime: StartTime,
        EndDate: EndDate,
        EndTime: EndTime,
        DateAdded: year+'-'+month+'-'+day
       }).then( newClassAssignment => {
          this.navCtrl.pop();
        }, error => {
          console.log(error);
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAssignmentAddPage');
  }

}
