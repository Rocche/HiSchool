import { Component, OnInit } from '@angular/core';
import { MeetingHour } from 'src/app/models.1/school/meetingHour';
import { MeetingService } from 'src/app/services/meeting.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Teacher, Class, Parent, Meeting } from 'src/app/models.1/models';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models.1/utils/user';

@Component({
  selector: 'app-reserve-meeting',
  templateUrl: './reserve-meeting.component.html',
  styleUrls: ['./reserve-meeting.component.css']
})
export class ReserveMeetingComponent implements OnInit {

  public meetingHours: MeetingHour[];
  public teachers: Teacher[];
  public selectedTeacher: Teacher;
  public markDisabled;
  public date: string;
  public selectedMeetingHour: MeetingHour;

  constructor(private meetingService: MeetingService, private userService: UserService, private accountService: AccountService) { }

  ngOnInit() {
    this.userService.getTeachers()
      .subscribe((res: Teacher[]) => {
        this.teachers = res;
      },
      error => {
        alert("Error getting teachers");
      })
  }

  public getTeacherMeetingHours(){
    if(this.selectedTeacher == null){
      alert("You must select a teacher in order to reserve a meeting");
    }
    this.meetingService.getTeacherMeetingHours(this.selectedTeacher.username)
      .subscribe((res: MeetingHour[]) => {
        this.meetingHours = res;
        let availableDays = [];
        this.meetingHours.forEach((meetingHour: MeetingHour) => {
          availableDays.push(meetingHour.dayOfWeek);
          
        })
      })
  }

  public selectMeetingHour(meetingHour: MeetingHour){
    this.selectedMeetingHour = meetingHour;
    this.markDisabled = (date: NgbDate) => {
      let d = moment(date.year + "-" + date.month + "-" + date.day);
      return  d.day() != this.selectedMeetingHour.dayOfWeek;
    }
  }

  public reserveMeeting(){
    if(this.date == null){
      alert("First you must select a date");
      return;
    }
    let parent: User = this.accountService.getUser();
    this.meetingService.reserveMeeting(parent, this.selectedMeetingHour, new Date(this.date))
      .subscribe(res => {
        alert("Meeting reserved successfully");
      },
      error => {
        alert("There was an error in reserving meeting: " + error.message);
      })
  }

  private fromDayOfWeekToString(dayOfWeek: number): string{
    switch(dayOfWeek){
      case 1:
        return "Monday";
      case 2:
        return "Monday";
      case 3:
        return "Monday";
      case 4:
        return "Monday";
      case 5:
        return "Monday";
      case 6:
        return "Monday";
      default:
        return "Undefined";
    }
  }

  public selectDate(date: any){
    this.date = date.year + '-' + date.month + '-' + date.day;
  }
}
