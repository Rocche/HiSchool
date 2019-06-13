import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting.service';
import { Meeting } from 'src/app/models/Meeting';

@Component({
  selector: 'app-meetingtable',
  templateUrl: './meetingtable.component.html',
  styleUrls: ['./meetingtable.component.css']
})
export class MeetingtableComponent implements OnInit {

  private meetings: Meeting[];

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {
    this.meetings = this.meetingService.getMeetings('teacher');
  }

  public dismiss(meeting: Meeting){
    this.meetingService.dismissMeeting(meeting);
  }
}
