import { Component, OnInit } from '@angular/core';
import { TimetableService } from 'src/app/services/timetable.service';
import { LessonHour } from 'src/app/models.1/school/lessonHour';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  public timetable: string[][];

  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getTimeTable('3A')
      .subscribe((res: LessonHour[]) => {
        this.timetable = this.buildStudentTimetable(res);
      })
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
