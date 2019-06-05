import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimetableComponent } from './components/timetable/timetable.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'student', component: TimetableComponent/*, canActivate: [PatientGuard]*/ },
  { path: 'parent', component: TimetableComponent/*, canActivate: [PatientGuard] */},
  { path: 'secretary', component: TimetableComponent/*, canActivate: [PatientGuard]*/ },
  { path: 'admin', component: TimetableComponent/*, canActivate: [PatientGuard] */}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    TimetableComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
