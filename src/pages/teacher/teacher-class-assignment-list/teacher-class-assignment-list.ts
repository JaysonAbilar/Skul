import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TeacherClassAssignmentAddPage } from '../teacher-class-assignment-add/teacher-class-assignment-add';
import { TeacherClassAssignmentUpdatePage } from '../teacher-class-assignment-update/teacher-class-assignment-update';

/*
  Generated class for the TeacherClassAssignmentList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teacher-class-assignment-list',
  templateUrl: 'teacher-class-assignment-list.html'
})
export class TeacherClassAssignmentListPage {
  
  public Username:any;
  public ClassId:any;
  public Startyear:any;
  public Endyear:any;
  public SubjectCode:any;

  public currentDate: Date;
  subjectList: FirebaseListObservable<any>;
  subject = {
  	SubjectCode:'',
    Name: '',
  	Description: '',

  };

  homeworkList: FirebaseListObservable<any>;
  projectList: FirebaseListObservable<any>;
  meetingList: FirebaseListObservable<any>;

  homework = {
    homeworkCode: '',
    Type:'',
    Title: '',
    Description: '',
    DueDate: '',
    DueTime: '',
    DateAdded: ''
  }

  project = {
    projectCode: '',
    Type:'',
    Title: '',
    Description: '',
    DueDate: '',
    DueTime: '',
    DateAdded: ''
  }

  meeting = {
    meetingCode: '',
    Type:'',
    Title: '',
    Description: '',
    StartDate:'',
    StartTime:'',
    EndDate:'',
    EndTime:'',
    DateAdded: ''
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	 this.Username = this.navParams.get('Username');
  	 this.ClassId = this.navParams.get('ClassId');
  	 this.Startyear = this.navParams.get('Startyear');
  	 this.Endyear = this.navParams.get('Endyear');

  	 this.subjectList = this.af.database.list('/academic-year/' + this.Startyear + "-" + this.Endyear +  '/teacher-class/' + this.Username + "/" + this.ClassId);

  	 console.log('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/teacher-class/' + this.Username + "/" + this.ClassId);
  }

  goToAddHomework(Username,ClassId,Startyear,Endyear,Subjectcode){
  	console.log(Subjectcode);
    this.navCtrl.push(TeacherClassAssignmentAddPage,
  	{
  	   Username:Username,
         ClassId:ClassId,
         Startyear:Startyear,
         Endyear:Endyear,
         Subjectcode:Subjectcode
  	});

  }

  selectedValueChanged(SubjectCode)
  {
  	 this.SubjectCode = SubjectCode
  	 this.homeworkList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/subject-homeworks/');
     this.projectList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/subject-projects/');
     this.meetingList = this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-subject/' + this.ClassId + '/' + this.SubjectCode + '/subject-meetings/');
  }

  deleteHomework(homework) {

   this.homeworkList.remove(homework);
  }

  deleteProject(project) {
   this.projectList.remove(project);
  }

  deleteMeeting(meeting) {
  this.meetingList.remove(meeting);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherClassAssignmentListPage');
  }

}
