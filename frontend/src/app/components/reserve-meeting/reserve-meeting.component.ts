import { Component, OnInit } from '@angular/core';
import { MeetingHour } from 'src/app/models/MeetingHour';
import { MeetingService } from 'src/app/services/meeting.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-reserve-meeting',
  templateUrl: './reserve-meeting.component.html',
  styleUrls: ['./reserve-meeting.component.css']
})
export class ReserveMeetingComponent implements OnInit {

  private meetingHours: MeetingHour[];
  private selectedTeacher: string;
  private markDisabled;

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {
    
  }

  public getTeacherMeetingHours(){
    this.meetingHours = this.meetingService.getTeacherMeetingHours(this.selectedTeacher);let availableDays = [];
    this.meetingHours.forEach((meetingHour: MeetingHour) => {
      availableDays.push(meetingHour.getDay());
    })
    console.log(availableDays)
    this.markDisabled = (date: NgbDate) => {
      let d = moment(date.year + "-" + date.month + "-" + date.day);
      return !availableDays.includes(d.day());
    }
  }

  public reserveMeeting(meetinghour: MeetingHour){
    this.meetingService.reserveMeeting(meetinghour);
  }

}
