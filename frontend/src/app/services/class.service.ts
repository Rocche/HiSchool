import { Injectable } from '@angular/core';
import { Class } from '../models/Class';
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
    this.classes = [
      new Class(1, 'A', ''),
      new Class(1, 'B', ''),
      new Class(1, 'A', 'S'),
      new Class(2, 'B', 'S')
    ]
  }

  public getClasses(){
    return this.classes;
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
  //getTeachers(class)
  //getStudents(class)
}
