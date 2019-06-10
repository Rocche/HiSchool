import { Component, OnInit } from '@angular/core';
import { MeetingHour } from 'src/app/models/MeetingHour';
import { MeetingService } from 'src/app/services/meeting.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
    this.markDisabled = (date: NgbDate) => date.day >= 6;
  }

  public getTeacherMeetingHours(){
    this.meetingHours = this.meetingService.getTeacherMeetingHours(this.selectedTeacher);
  }

  public reserveMeeting(meetinghour: MeetingHour){
    this.meetingService.reserveMeeting(meetinghour);
  }

}
