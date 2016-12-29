import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AdminHomePage } from '../pages/admin/admin-home/admin-home';
import { TeacherHomePage } from '../pages/teacher/teacher-home/teacher-home';
import { GuardianHomePage } from '../pages/guardian/guardian-home/guardian-home';
import { StudentHomePage } from '../pages/student/student-home/student-home';
import { AdminTeacherListPage } from '../pages/admin/admin-teacher-list/admin-teacher-list';
import { AdminTeacherAddPage } from '../pages/admin/admin-teacher-add/admin-teacher-add';
import { AdminTeacherUpdatePage } from '../pages/admin/admin-teacher-update/admin-teacher-update';
import { AdminGuardianListPage } from '../pages/admin/admin-guardian-list/admin-guardian-list';
import { AdminGuardianAddPage } from '../pages/admin/admin-guardian-add/admin-guardian-add';
import { AdminGuardianUpdatePage } from '../pages/admin/admin-guardian-update/admin-guardian-update';
import { AdminSubjectListPage } from '../pages/admin/admin-subject-list/admin-subject-list';
import { AdminSubjectAddPage } from '../pages/admin/admin-subject-add/admin-subject-add';
import { AdminSubjectUpdatePage } from '../pages/admin/admin-subject-update/admin-subject-update';
import { AdminStudentListPage } from '../pages/admin/admin-student-list/admin-student-list';
import { AdminStudentAddPage } from '../pages/admin/admin-student-add/admin-student-add';
import { AdminStudentUpdatePage } from '../pages/admin/admin-student-update/admin-student-update';
import { AdminClassListPage } from '../pages/admin/admin-class-list/admin-class-list';
import { AdminClassAddPage } from '../pages/admin/admin-class-add/admin-class-add';
import { AdminClassUpdatePage } from '../pages/admin/admin-class-update/admin-class-update';
import { AdminClassSubjectListPage } from '../pages/admin/admin-class-subject-list/admin-class-subject-list';
import { AdminClassSubjectList2Page } from '../pages/admin/admin-class-subject-list-2/admin-class-subject-list-2';
import { AdminClassSubjectAddPage } from '../pages/admin/admin-class-subject-add/admin-class-subject-add';
import { AdminClassSubjectUpdatePage } from '../pages/admin/admin-class-subject-update/admin-class-subject-update';
import { AdminClassStudentListPage } from '../pages/admin/admin-class-student-list/admin-class-student-list';
import { AdminClassStudentList2Page } from '../pages/admin/admin-class-student-list-2/admin-class-student-list-2';
import { AdminClassStudentAddPage } from '../pages/admin/admin-class-student-add/admin-class-student-add';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    HomePage,
    TabsPage,
    AdminHomePage,
    TeacherHomePage,
    GuardianHomePage,
    StudentHomePage,
    AdminTeacherListPage,
    AdminTeacherAddPage,
    AdminTeacherUpdatePage,
    AdminGuardianListPage,
    AdminGuardianAddPage,
    AdminGuardianUpdatePage,
    AdminSubjectListPage,
    AdminSubjectAddPage,
    AdminSubjectUpdatePage,
    AdminStudentListPage,
    AdminStudentAddPage,
    AdminStudentUpdatePage,
    AdminClassListPage,
    AdminClassAddPage,
    AdminClassUpdatePage,
    AdminClassSubjectListPage,
    AdminClassSubjectList2Page,
    AdminClassSubjectAddPage,
    AdminClassSubjectUpdatePage,
    AdminClassStudentListPage,
    AdminClassStudentList2Page,
    AdminClassStudentAddPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    HomePage,
    TabsPage,
    AdminHomePage,
    TeacherHomePage,
    GuardianHomePage,
    StudentHomePage,
    AdminTeacherListPage,
    AdminTeacherAddPage,
    AdminTeacherUpdatePage,
    AdminGuardianListPage,
    AdminGuardianAddPage,
    AdminGuardianUpdatePage,
    AdminSubjectListPage,
    AdminSubjectAddPage,
    AdminSubjectUpdatePage,
    AdminStudentListPage,
    AdminStudentAddPage,
    AdminStudentUpdatePage,
    AdminClassListPage,
    AdminClassAddPage,
    AdminClassUpdatePage,
    AdminClassSubjectListPage,
    AdminClassSubjectList2Page,
    AdminClassSubjectAddPage,
    AdminClassSubjectUpdatePage,
    AdminClassStudentListPage,
    AdminClassStudentList2Page,
    AdminClassStudentAddPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    FIREBASE_PROVIDERS,

    defaultFirebase({

      apiKey: "AIzaSyCOeNSLb5iRmoLBobx4YxdX1jPpXbCW4VU",

      authDomain: "skulfirebase.firebaseapp.com",

      databaseURL: "https://skulfirebase.firebaseio.com",

      storageBucket: "skulfirebase.appspot.com",

    })
  ]
})
export class AppModule {}
