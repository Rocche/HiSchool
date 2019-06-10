import { Injectable } from '@angular/core';
import { MeetingHour } from '../models/MeetingHour';
import { Meeting } from '../models/Meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private meetingHours: MeetingHour[];

  constructor() {
    this.meetingHours = [
      new MeetingHour(2, 2, 'Marcantoni'),
      new MeetingHour(6, 1, 'Gagliardi')
    ]
   }

  public getTeacherMeetingHours(teacher: string): MeetingHour[]{
    return this.meetingHours;
  }

  public reserveMeeting(meeting: Meeting){
    alert("Meeting reserved: " + meeting.getDate() + meeting.getHour());
  }
}
