import { Injectable } from '@angular/core';
import { Class, Teacher, Role } from '../models.1/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  //get teacher
  public getTeachers(c: Class): Teacher[]{
    return [
      new Teacher('a', 'a', Role.TEACHER, 'pippo', 'baudo', ['math, physics'])
    ];
  }
  //get student
  //get parent
}
