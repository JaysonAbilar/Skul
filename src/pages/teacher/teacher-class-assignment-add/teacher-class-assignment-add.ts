import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { SMS } from 'ionic-native'
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
  studentList: FirebaseListObservable<any>;
  guardianObject: FirebaseObjectObservable<any>;

  public guardian = {
    Username: '',
    Password: '',
    Firstname: '',
    Middlename:'',
    Lastname: '',
    Age: '',
    Gender: '',
    Email: '',
    Contactnumber: ''
  };

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
  
  selectedValueChanged(Username, ClassId, Startyear, Endyear, SubjectCode, Type, Title, Description, DueDate, DueTime, 
                StartDate, StartTime, EndDate, EndTime)
  {
    this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId, { preserveSnapshot: true})
        .subscribe(snapshots=>{
            snapshots.forEach(snapshot => {
              this.guardianObject = this.af.database.object('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + 
                                '/class-student/' + this.ClassId  + '/' + snapshot.key + '/Guardian'); 
              this.guardianObject.subscribe(snapshot2 => this.guardian.Contactnumber = snapshot2.Contactnumber);   

            //  console.log(snapshot.key, snapshot.val());
            });
        })
  }

  addHomework(Username, ClassId, Startyear, Endyear, SubjectCode, Type, Title, Description, DueDate, DueTime, 
                StartDate, StartTime, EndDate, EndTime)
  {
  	 var day = this.currentDate.getDate();
  	 var month = this.currentDate.getMonth() + 1;
  	 var year = this.currentDate.getFullYear();
     var tempNumber = 'temp';
     var message = "Class Reminder: " + Type +
                   "\nSubject: " + SubjectCode +
                   "\nTitle: " + Title +
                   "\nDescription: " + Description +
                   "\nDueDate: " + DueDate +
                   "\nDueTime: " + DueTime;

     if(Type=='Homework')
     {
        this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId, { preserveSnapshot: true})
        .subscribe(snapshots=>{
            snapshots.forEach(snapshot => {
              this.guardianObject = this.af.database.object('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + 
                                '/class-student/' + this.ClassId  + '/' + snapshot.key + '/Guardian'); 
              this.guardianObject.subscribe(snapshot2 => this.guardian.Contactnumber = snapshot2.Contactnumber);   

              if(tempNumber != this.guardian.Contactnumber)
              {
                tempNumber = this.guardian.Contactnumber;
                 console.log(this.guardian.Contactnumber);
                 console.log(message);
                 var options={
                      replaceLineBreaks: true, 
                      android: {
                           intent: ''
                        }
                  }

                SMS.send(this.guardian.Contactnumber, message ,options)
                  .then(()=>{
                    alert("success");
                  },()=>{
                  alert("failed");
                  });
              }

            //  console.log(snapshot.key, snapshot.val());
            });
        })

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
       this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId, { preserveSnapshot: true})
        .subscribe(snapshots=>{
            snapshots.forEach(snapshot => {
              this.guardianObject = this.af.database.object('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + 
                                '/class-student/' + this.ClassId  + '/' + snapshot.key + '/Guardian'); 
              this.guardianObject.subscribe(snapshot2 => this.guardian.Contactnumber = snapshot2.Contactnumber);   

              if(tempNumber != this.guardian.Contactnumber)
              {
                tempNumber = this.guardian.Contactnumber;
                console.log(this.guardian.Contactnumber);
                console.log(message);

                 var options={
                      replaceLineBreaks: true, 
                      android: {
                           intent: ''
                        }
                  }

                SMS.send(this.guardian.Contactnumber, message ,options)
                  .then(()=>{
                    alert("success");
                  },()=>{
                  alert("failed");
                  });
              }

            //  console.log(snapshot.key, snapshot.val());
            });
        })

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
       
       message = "Class Reminder: " + Type +
                   "\nSubject: " + SubjectCode +
                   "\nTitle: " + Title +
                   "\nDescription: " + Description +
                   "\nStartDate: " + StartDate +
                   "\nStartTime: " + StartTime + 
                   "\nEndDate: " + EndDate +
                   "\nEndTime: " + EndTime;

       this.af.database.list('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + '/class-student/' + this.ClassId, { preserveSnapshot: true})
        .subscribe(snapshots=>{
            snapshots.forEach(snapshot => {
              this.guardianObject = this.af.database.object('/academic-year/'+ this.Startyear  + '-' + this.Endyear  + 
                                '/class-student/' + this.ClassId  + '/' + snapshot.key + '/Guardian'); 
              this.guardianObject.subscribe(snapshot2 => this.guardian.Contactnumber = snapshot2.Contactnumber);   

              if(tempNumber != this.guardian.Contactnumber)
              {
                tempNumber = this.guardian.Contactnumber;
                console.log(this.guardian.Contactnumber);
                console.log(message);

                 var options={
                      replaceLineBreaks: true, 
                      android: {
                           intent: ''
                        }
                  }

                SMS.send(this.guardian.Contactnumber, message ,options)
                  .then(()=>{
                    alert("success");
                  },()=>{
                  alert("failed");
                  });
              }
            //  console.log(snapshot.key, snapshot.val());
            });
        })

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
