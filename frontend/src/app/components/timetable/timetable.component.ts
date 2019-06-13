import { Component, OnInit } from '@angular/core';
import { TimetableService } from 'src/app/services/timetable.service';
import { LessonHour } from 'src/app/models/LessonHour';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  public timetable: string[][];

  constructor(private timetableService: TimetableService) { }

  ngOnInit() {
    this.timetable = this.timetableService.getClassTimeTable('3A');
  }

}
