import { Injectable } from '@angular/core';
import { TeacherAbsence } from '../models.1/school/teacherAbsence';
import { User } from '../models.1/utils/user';
import { LessonHour } from '../models.1/school/lessonHour';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private absences: TeacherAbsence[];

  constructor(private http: HttpClient) { 
  }

  public addAbsence(teacher: User, lessonHour: LessonHour, date: Date){
    let body: any = {};
    body.teacher = teacher;
    body.lessonHour = lessonHour;
    body.date = date;
    return this.http.post('/api/teacherAbsence', body, httpOptions);
  }

  public getAbsences(){
    let username = JSON.parse(localStorage.getItem('user')).username;
    return this.http.get('/api/availableTeacherAbsences?teacher=' + username);
  }

  public setSubstitutionDisponibility(absence: TeacherAbsence, canSubstitute: boolean){
    let result = canSubstitute ? 'confirmed' : 'not confirmed';
    //alert("substitution " + result + ": " + absence.getDate() + ", " + absence.getHour() + ", " + absence.getClass());
  }

}
