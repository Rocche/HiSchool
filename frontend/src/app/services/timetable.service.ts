import { Injectable } from '@angular/core';
import { LessonHour } from '../models/LessonHour';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private timetable: LessonHour[];

  constructor() { 
    this.timetable = [
      new LessonHour(0, 0, 'math'),
      new LessonHour(1, 0, 'history'),
      new LessonHour(2, 0, 'math'),
      new LessonHour(3, 0, 'math'),
      new LessonHour(4, 0, 'math'),
      new LessonHour(5, 0, 'english'),
      new LessonHour(0, 1, 'science'),
      new LessonHour(1, 1, 'religion'),
      new LessonHour(2, 1, 'math'),
      new LessonHour(3, 1, 'math'),
      new LessonHour(4, 1, 'science'),
      new LessonHour(5, 1, 'italian'),
      new LessonHour(0, 2, 'latin'),
      new LessonHour(1, 2, 'latin'),
      new LessonHour(2, 2, 'math'),
      new LessonHour(3, 2, 'math'),
      new LessonHour(4, 2, 'phylosophy'),
      new LessonHour(5, 2, 'math'),
      new LessonHour(0, 3, 'science'),
      new LessonHour(1, 3, 'math'),
      new LessonHour(2, 3, 'history'),
      new LessonHour(3, 3, 'math'),
      new LessonHour(4, 3, 'math'),
      new LessonHour(5, 3, 'history'),
      new LessonHour(0, 4, 'math'),
      new LessonHour(1, 4, 'math'),
      new LessonHour(2, 4, 'math'),
      new LessonHour(3, 4, 'italian'),
      new LessonHour(4, 4, 'italian'),
      new LessonHour(5, 4, 'italian')
    ]
  }

  public getClassTimeTable(classroom: string): string[][]{
    return(this.buildStudentTimetable(this.timetable));
  }

  private buildStudentTimetable(timetable: LessonHour[]){
    let tt: string[][] = [];
    for(let i = 0; i < 5; i++){
      let l = timetable.filter(hour => hour.hour == i);
      let subjects = []
      l.forEach((lessonHour: LessonHour) => {
        subjects.push(lessonHour.subject);
      })
      tt.push(subjects);
    }
    return tt;
  }
}
