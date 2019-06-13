import { Injectable } from '@angular/core';
import { MeetingHour } from '../models/MeetingHour';
import { Meeting } from '../models/Meeting';
import * as moment from 'moment';
import { Teacher } from '../models.1/models';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private meetingHours: MeetingHour[];
  private meetings: Meeting[];

  constructor() {
    this.meetingHours = [
      new MeetingHour(2, 2, 'Marcantoni'),
      new MeetingHour(6, 1, 'Gagliardi')
    ];
    this.meetings = [
      new Meeting('2019-06-10', 'parent', this.meetingHours[0]),
      new Meeting('2019-06-8', 'parent2', this.meetingHours[1]),
    ]
   }

  public getTeacherMeetingHours(teacher: Teacher): MeetingHour[]{
    return this.meetingHours;
  }

  public reserveMeeting(meeting: MeetingHour){
    alert("Meeting reserved: " + meeting.getDay() + meeting.getHour());
  }

  public getMeetings(teacher: string){
    return this.meetings;
  }

  public dismissMeeting(meeting: Meeting){
    alert('Meeting dismissed: ' + ', ' + meeting.getDate() + ', ' +  meeting.getHour());
  }

}
