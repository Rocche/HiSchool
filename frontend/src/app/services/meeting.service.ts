import { Injectable } from '@angular/core';
import { MeetingHour } from '../models/MeetingHour';
import { Meeting } from '../models/Meeting';
import * as moment from 'moment';

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
      new Meeting('2019-06-10', 3, 4, 'teacher', 'parent'),
      new Meeting('2019-06-8', 1, 1, 'teacher2', 'parent2'),
    ]
   }

  public getTeacherMeetingHours(teacher: string): MeetingHour[]{
    return this.meetingHours;
  }

  public reserveMeeting(meeting: MeetingHour){
    alert("Meeting reserved: " + meeting.getDay() + meeting.getHour());
  }

  public getMeetings(teacher: string){
    return this.meetings;
  }

}
