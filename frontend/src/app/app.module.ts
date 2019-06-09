import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule , NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { NoticesComponent } from './components/notices/notices.component';
import { SendNoticeComponent } from './components/send-notice/send-notice.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { SubstitutionComponent } from './components/substitution/substitution.component';
import { NoticeboardComponent } from './components/noticeboard/noticeboard.component';
import { LogsComponent } from './components/logs/logs.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'student', component: TimetableComponent/*, canActivate: [PatientGuard]*/ },
  { path: 'parent', component: TimetableComponent/*, canActivate: [PatientGuard] */},
  { path: 'secretary', component: TimetableComponent/*, canActivate: [PatientGuard]*/ },
  { path: 'admin', component: TimetableComponent/*, canActivate: [PatientGuard] */},
  { path: 'teacher', component: TimetableComponent/*, canActivate: [PatientGuard] */},
  { path: 'notices', component: NoticesComponent },
  { path: 'send_notice', component: SendNoticeComponent },
  { path: 'create_account', component: CreateAccountComponent },
  { path: 'absence', component: AbsenceComponent },
  { path: 'substitutions', component: SubstitutionComponent },
  { path: 'noticeboard', component: NoticeboardComponent },
  { path: 'logs', component: LogsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    TimetableComponent,
    NoticesComponent,
    SendNoticeComponent,
    CreateAccountComponent,
    AbsenceComponent,
    SubstitutionComponent,
    NoticeboardComponent,
    LogsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule,
    NgbDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
