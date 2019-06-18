import { Component, OnInit } from '@angular/core';
import { LessonHour } from 'src/app/models.1/school/lessonHour';
import { ClassService } from 'src/app/services/class.service';
import { Subject, Role } from 'src/app/models.1/models';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  public timetable: Subject[][];

  constructor(private classService: ClassService, private accountService: AccountService) { }

  ngOnInit() {
    this.classService.getTimeTable()
      .subscribe((res: LessonHour[]) => {
        this.timetable = this.buildStudentTimetable(res);
      })
  }

  private buildStudentTimetable(timetable: LessonHour[]): Subject[][]{
    let tt: Subject[][] = [];
    for(let i = 1; i < 6; i++){
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
