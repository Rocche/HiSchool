import { Injectable } from '@angular/core';
import { Class, Teacher, Role } from '../models.1/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //get teacher
  public getTeachers(){
    let user = JSON.parse(localStorage.getItem('user'));
    let c;
    if(user.role == Role.STUDENT){
      c = user.class;
    }
    if(user.role == Role.PARENT){
      c = user.sons[0].class;
    }
    return this.http.get('/api/classTeachers?class=' + c);
  }
  //get student
  //get parent
}
