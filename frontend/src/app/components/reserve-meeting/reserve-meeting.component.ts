import { Component, OnInit } from '@angular/core';
import { MeetingHour } from 'src/app/models/MeetingHour';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-reserve-meeting',
  templateUrl: './reserve-meeting.component.html',
  styleUrls: ['./reserve-meeting.component.css']
})
export class ReserveMeetingComponent implements OnInit {

  private meetingHours: MeetingHour[];
  private selectedTeacher: string;

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {
  }

  public getTeacherMeetingHours(){
    this.meetingHours = this.meetingService.getTeacherMeetingHours(this.selectedTeacher);
  }

}
