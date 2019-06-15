import { Injectable } from '@angular/core';
import { MeetingHour } from '../models.1/school/meetingHour';
import { Meeting } from '../models/Meeting';
import * as moment from 'moment';
import { Teacher, Parent, User } from '../models.1/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private meetingHours: MeetingHour[];
  private meetings: Meeting[];

  constructor(private http: HttpClient) {
   }

  public getTeacherMeetingHours(teacherUsername: string){
    return this.http.get("/api/meetingHours?teacher=" + teacherUsername);
  }

  public reserveMeeting(parent: User, meetingHour: MeetingHour, date: Date){
    let body: any = {};
    body.parent = parent;
    body.meetingHour = meetingHour;
    body.date = date;
    body = JSON.stringify(body);
    return this.http.post("/api/meeting", body, httpOptions);
  }

  public getMeetings(){
    let username = JSON.parse(localStorage.getItem('user')).username;
    return this.http.get('/api/meetings?teacher=' + username);
  }

  public dismissMeeting(meeting: Meeting){
    alert('Meeting dismissed: ' + ', ' + meeting.getDate() + ', ' +  meeting.getHour());
  }

}
