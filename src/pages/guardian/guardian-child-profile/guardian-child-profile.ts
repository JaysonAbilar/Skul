import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';
import { GuardianSubjectInfoPage } from '../guardian-subject-info/guardian-subject-info';
/*
  Generated class for the GuardianChildProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guardian-child-profile',
  templateUrl: 'guardian-child-profile.html'
})
export class GuardianChildProfilePage {

	public ChildKey: '';
	public ClassId: '';
	public SchoolYearAndSection: '';
	studentOjbect: FirebaseObjectObservable<any>;
	subjectList: FirebaseListObservable<any>;
	childObject: FirebaseObjectObservable<any>;
	  child = {
		Firstname: '',
		Middlename:'',
		Lastname: '',
		Age: '',
		Gender: '',
		Email: '',
		Contactnumber: ''
	  };

  	constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  		this.ChildKey = this.navParams.get('ChildKey');

     //  	var root = firebase.database().ref('academic-year/2016-2017/student-class/'+this.ChildKey);
     //  	root.on('value', function(snap){
	    //     this.subjectList = af.database.list('academic-year/2016-2017/class-subject/'+snap.val().ClassId+'/');
	    // });

	    af.database.list('/academic-year/2016-2017/student-class/' + this.ChildKey, { preserveSnapshot: true})
        .subscribe(snapshots=>{
            snapshots.forEach(snapshot => {
              this.subjectList = af.database.list('/academic-year/2016-2017/class-subject/'+ snapshot.val() + '/'); 
              this.SchoolYearAndSection = snapshot.val();
              console.log(this.SchoolYearAndSection);
            });
        })
      	this.childObject = this.af.database.object('/student/' + this.ChildKey);
	    this.childObject.subscribe(snapshot => this.child.Firstname = snapshot.Firstname);
	    this.childObject.subscribe(snapshot => this.child.Middlename = snapshot.Middlename);
	    this.childObject.subscribe(snapshot => this.child.Lastname = snapshot.Lastname);
	    this.childObject.subscribe(snapshot => this.child.Age = snapshot.Age);
	    this.childObject.subscribe(snapshot => this.child.Gender = snapshot.Gender);
	    this.childObject.subscribe(snapshot => this.child.Email = snapshot.Email);
    	this.childObject.subscribe(snapshot => this.child.Contactnumber = snapshot.Contactnumber);


  	}

  	goToSubjectInfoPage(SubjectCode,SchoolYearAndSection){
  		this.navCtrl.push(GuardianSubjectInfoPage, {
	      SubjectCode: SubjectCode,
	      SchoolYearAndSection: SchoolYearAndSection,
	    });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad GuardianChildProfilePage');
  	}
}
