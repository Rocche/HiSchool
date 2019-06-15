import { Injectable } from '@angular/core';
import { MeetingHour } from '../models/MeetingHour';
import { Meeting } from '../models/Meeting';
import * as moment from 'moment';
import { Teacher } from '../models.1/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private meetingHours: MeetingHour[];
  private meetings: Meeting[];

  constructor(private http: HttpClient) {
    this.meetingHours = [
      new MeetingHour(2, 2, 'Marcantoni'),
      new MeetingHour(6, 1, 'Gagliardi')
    ];
    this.meetings = [
      new Meeting('2019-06-10', 'parent', this.meetingHours[0]),
      new Meeting('2019-06-8', 'parent2', this.meetingHours[1]),
    ]
   }

  public getTeacherMeetingHours(teacherUsername: string){
    return this.http.get("/api/meetingHours?teacher=" + teacherUsername);
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
