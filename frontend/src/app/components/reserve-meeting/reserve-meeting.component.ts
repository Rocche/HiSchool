import { Component, OnInit } from '@angular/core';
import { MeetingHour } from 'src/app/models.1/school/meetingHour';
import { MeetingService } from 'src/app/services/meeting.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Teacher, Class } from 'src/app/models.1/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reserve-meeting',
  templateUrl: './reserve-meeting.component.html',
  styleUrls: ['./reserve-meeting.component.css']
})
export class ReserveMeetingComponent implements OnInit {

  private meetingHours: MeetingHour[];
  private teachers: Teacher[];
  private selectedTeacher: Teacher;
  private markDisabled;

  constructor(private meetingService: MeetingService, private userService: UserService) { }

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
    this.meetingService.getTeacherMeetingHours(this.selectedTeacher.username)
      .subscribe((res: MeetingHour[]) => {
        this.meetingHours = res;
        let availableDays = [];
        this.meetingHours.forEach((meetingHour: MeetingHour) => {
          availableDays.push(meetingHour.dayOfWeek);
          this.markDisabled = (date: NgbDate) => {
            let d = moment(date.year + "-" + date.month + "-" + date.day);
            return !availableDays.includes(d.day());
          }
        })
      })
  }
  /*
  public reserveMeeting(meetinghour: MeetingHour){
    this.meetingService.reserveMeeting(meetinghour);
  }
  */
}
