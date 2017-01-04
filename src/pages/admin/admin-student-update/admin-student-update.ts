import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminStudentUpdate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-student-update',
  templateUrl: 'admin-student-update.html'
})
export class AdminStudentUpdatePage {
  
  guardianList: FirebaseListObservable<any>;
  oldGuardianObject: FirebaseObjectObservable<any>;
  guardianObject: FirebaseObjectObservable<any>;
  guardian = {
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

  studentList: FirebaseListObservable<any>;
  student = {
    Username: '',
  	Password: '',
  	Firstname: '',
  	Middlename:'',
  	Lastname: '',
  	Age: '',
  	Gender: '',
  	Email: '',
  	Contactnumber: '',
  	Guardian: ''
  };

  guardianStudentList: FirebaseListObservable<any>;
  public taf: any;
  public oldGuardian: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
    this.taf = af;

    this.guardianList = this.af.database.list('/guardian');

    this.studentList = this.af.database.list('/student');
  	this.student.Username = this.navParams.get('key');
    this.student.Password = this.navParams.get('Password');
    this.student.Firstname = this.navParams.get('Firstname');
    this.student.Middlename = this.navParams.get('Middlename');
    this.student.Lastname = this.navParams.get('Lastname');
    this.student.Age = this.navParams.get('Age');
    this.student.Gender = this.navParams.get('Gender');
    this.student.Email = this.navParams.get('Email');
    this.student.Contactnumber = this.navParams.get('Contactnumber');
    this.student.Guardian = this.navParams.get('Guardian');

    this.oldGuardianObject = this.af.database.object('/student/' + '/' + this.student.Username + '/Guardian');  
    this.oldGuardianObject.subscribe(snapshot => this.oldGuardian = snapshot.Username); 

  }

  editStudent(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber,Guardian) {	

     this.guardianObject = this.af.database.object('/guardian/' + Guardian);     
     this.guardianObject.subscribe(snapshot => this.guardian.Firstname = snapshot.Firstname); 
     this.guardianObject.subscribe(snapshot => this.guardian.Middlename = snapshot.Middlename); 
     this.guardianObject.subscribe(snapshot => this.guardian.Lastname = snapshot.Lastname); 
     this.guardianObject.subscribe(snapshot => this.guardian.Age= snapshot.Age); 
     this.guardianObject.subscribe(snapshot => this.guardian.Gender = snapshot.Gender); 
     this.guardianObject.subscribe(snapshot => this.guardian.Email = snapshot.Email); 
     this.guardianObject.subscribe(snapshot => this.guardian.Contactnumber = snapshot.Contactnumber); 

     this.guardianStudentList = this.taf.database.list("/guardian-student/" + this.oldGuardian);   	
     this.guardianStudentList.remove(Username);


  	 this.studentList.update(Username, {
      Password: Password,
      Firstname: Firstname,
      Middlename: Middlename,
      Lastname: Lastname,
      Age: Age,
      Gender: Gender,
      Email: Email,
      Contactnumber: Contactnumber
    }).then( newStudent => {
        firebase.database().ref("/guardian-student/" + Guardian + "/" + Username).set({ 
           Username:Username,
            Firstname: Firstname,
            Middlename: Middlename,
            Lastname: Lastname,
            Age: Age,
            Gender: Gender,
            Email: Email,
            Contactnumber: Contactnumber
             }).then( newStudent => {
                 firebase.database().ref("/student/" + Username + "/Guardian/").set({ 
                    Username: Guardian,
                    Firstname : this.guardian.Firstname,
                    Middlename: this.guardian.Middlename,
                    Lastname: this.guardian.Lastname,
                    Age: this.guardian.Age,
                    Gender: this.guardian.Gender,
                    Email: this.guardian.Email,
                    Contactnumber: this.guardian.Contactnumber
                   }).then( newStudent => {
                      this.navCtrl.pop();
                    }, error => {
                      console.log(error);
                 });
              }, error => {
                console.log(error);
        });
    }, error => {
      console.log(error);
    });
	  
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStudentUpdatePage');
  }

}
