import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting.service';
import { Meeting } from 'src/app/models.1/school/meeting';

@Component({
  selector: 'app-meetingtable',
  templateUrl: './meetingtable.component.html',
  styleUrls: ['./meetingtable.component.css']
})
export class MeetingtableComponent implements OnInit {

  public meetings: Meeting[];

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {
    this.getMeetings();
  }

  
  public dismiss(meeting: Meeting){
    this.meetingService.dismissMeeting(meeting)
      .subscribe(res => {
        alert("Meeting dismissed succesfully");
        this.getMeetings();
      },
      error => {
        alert("Error while dismissing meeting");
      })
  }
  

  private getMeetings(){
    this.meetingService.getMeetings()
    .subscribe((res: Meeting[]) => {
      this.meetings = res;
    },
    error => {
      alert("Error getting meetings");
    })
  }
}
