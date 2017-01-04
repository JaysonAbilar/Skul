import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import * as firebase from 'firebase';

/*
  Generated class for the AdminStudentAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-student-add',
  templateUrl: 'admin-student-add.html'
})
export class AdminStudentAddPage {
  guardianList: FirebaseListObservable<any>;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  	this.guardianList = this.af.database.list('/guardian');
    this.studentList = this.af.database.list('/student');

  }

   addStudent(Username, Password, Firstname, Middlename,Lastname, Age, Gender, Email, Contactnumber,Guardian) {

      this.guardianObject = this.af.database.object('/guardian/' + Guardian);	   	
      this.guardianObject.subscribe(snapshot => this.guardian.Firstname = snapshot.Firstname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Middlename = snapshot.Middlename); 
      this.guardianObject.subscribe(snapshot => this.guardian.Lastname = snapshot.Lastname); 
      this.guardianObject.subscribe(snapshot => this.guardian.Age= snapshot.Age); 
      this.guardianObject.subscribe(snapshot => this.guardian.Gender = snapshot.Gender); 
      this.guardianObject.subscribe(snapshot => this.guardian.Email = snapshot.Email); 
      this.guardianObject.subscribe(snapshot => this.guardian.Contactnumber = snapshot.Contactnumber); 


  	  firebase.database().ref("/student/" + Username).set({ 
  	  Password: Password,
      Firstname: Firstname,
      Middlename: Middlename,
      Lastname: Lastname,
      Age: Age,
      Gender: Gender,
      Email: Email,
      Contactnumber: Contactnumber,
      Username: Username
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
    console.log('ionViewDidLoad AdminStudentAddPage');
  }

}
