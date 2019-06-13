import { Injectable } from '@angular/core';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classes: Class[];

  constructor() { 
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
  //get timetable(class)
  //getTeachers(class)
  //getStudents(class)
}
