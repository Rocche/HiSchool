import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { LessonHour } from 'src/app/models.1/school/lessonHour';
import { Class } from 'src/app/models.1/models';

@Component({
  selector: 'app-teachertimetable',
  templateUrl: './teachertimetable.component.html',
  styleUrls: ['./teachertimetable.component.css']
})
export class TeachertimetableComponent implements OnInit {

  public timetable: string[][];

  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.classService.getTeacherTimeTable()
      .subscribe((res: LessonHour[]) => {
        this.timetable = this.buildStudentTimetable(res);
      })
  }

  private buildStudentTimetable(timetable: LessonHour[]): string[][]{
    let tt: string[][] = [];
    for(let i = 0; i < 5; i++){
      let l = timetable.filter(hour => hour.hour == i);
      let classes = []
      l.forEach((lessonHour: LessonHour) => {
        classes.push(lessonHour.class);
      })
      tt.push(classes);
    }
    console.log(tt)
    return tt;
  }

}
