import { Component, OnInit } from '@angular/core';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';
import { AbsenceService } from 'src/app/services/absence.service';
import { LessonHour, User } from 'src/app/models.1/models';
import { ClassService } from 'src/app/services/class.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  public lessonHours: LessonHour[];
  public date: string;
  public markDisabled;
  public availableHours: LessonHour[];
  public selectedLessonHour: LessonHour;

  constructor(private absenceService: AbsenceService, private classService: ClassService) { }

  ngOnInit() {
    this.availableHours = [];
    this.classService.getTeacherTimeTable()
      .subscribe((res: LessonHour[]) => {
        this.lessonHours = res;
        let lessonDays = [];
        this.lessonHours.forEach((LessonHour: LessonHour) => {
          lessonDays.push(LessonHour.dayOfWeek)
        });
        this.markDisabled = (date: NgbDate) => {
          let d = moment(date.year + "-" + date.month + "-" + date.day);
          return !lessonDays.includes(d.day());
        }
      },
      error => {
        alert("Error while getting teacher timetable");
      })
    this.date = null;
  }

  public addAbsence(){
    if(this.selectedLessonHour == null){
      alert("You must select a lesson hour");
    }
    if(this.date == null){
      alert("You must select a date");
    }
    let teacher: User = JSON.parse(localStorage.getItem('user'));
    this.absenceService.addAbsence(teacher, this.selectedLessonHour, new Date(this.date))
      .subscribe(res => {
        alert("Absence succesfully added.");
      },
      error => {
        alert("There was an error adding the absence");
      })

  }

  public selectDate(date: any){
    this.availableHours = [];
    this.date = date.year + '-' + date.month + '-' + date.day;
    let selectedDayLessonHours = this.lessonHours.filter((lesson: LessonHour) => {return lesson.dayOfWeek == 1});
    console.log(selectedDayLessonHours)
    selectedDayLessonHours.forEach((lessonHour: LessonHour) => {
      this.availableHours.push(lessonHour);
    });
  }

}
