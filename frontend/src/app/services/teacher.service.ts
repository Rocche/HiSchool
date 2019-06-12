import { Injectable } from '@angular/core';
import { Teacher } from '../models/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teachers: Teacher[];

  constructor() { 
    this.teachers = [
      new Teacher('Alessandro', 'Liscio', 'a@l.com', ['math', 'latin']),
      new Teacher('Samuele', 'Cucchi', 's@c.com', ['italian', 'science'])
    ]
  }

  public getTeachers(){
    return this.teachers;
  }
}
