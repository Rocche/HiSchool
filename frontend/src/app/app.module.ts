import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule , NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule  } from '@angular/common/http';


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
import { ReserveMeetingComponent } from './components/reserve-meeting/reserve-meeting.component';
import { MeetingtableComponent } from './components/meetingtable/meetingtable.component';

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
  { path: 'logs', component: LogsComponent },
  { path: 'reserve_meeting', component: ReserveMeetingComponent },
  { path: 'meeting_table', component: MeetingtableComponent }
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
    LogsComponent,
    ReserveMeetingComponent,
    MeetingtableComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule,
    NgbDatepickerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
