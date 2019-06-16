import { Injectable } from '@angular/core';
import { Class } from '../models.1/school/class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LessonHour, User, Role } from '../models.1/models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classes: Class[];

  constructor(private http: HttpClient) { 
  }

  public getClasses(){
    return this.http.get('api/classes');
  }

  //get class
  //get timetable(class) '/api/classTimeTable'
  public getTimeTable(){
    let user: any = JSON.parse(localStorage.getItem('user'));
    let c;
    if(user.role == Role.STUDENT){
      c = user.class;
    }
    if(user.role == Role.PARENT){
      c = user.sons[0].class;
    }
    return this.http.get('/api/classTimeTable?class='+c);
  }

  public getTeacherTimeTable(){
    let username = JSON.parse(localStorage.getItem('user')).username;
    return this.http.get('/api/teacherTimeTable?teacher=' + username);
  }

  public getTeachers(){
    return this.http.get('/api/teachers');
  }

  public getClassStudent(c: Class){
    return this.http.get('api/classStudents?class=' + c.id);
  }

  public getAllSubjects(){
    return this.http.get('/api/subjects');
  }
  //getTeachers(class)
  //getStudents(class)
}
