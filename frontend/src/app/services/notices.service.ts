import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role, Class, Student, Teacher } from '../models.1/models';
import { ClassService } from './class.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class NoticesService {


  constructor(private http: HttpClient, private classService: ClassService) {
  }

  public getNotices(){
    let user = JSON.parse(localStorage.getItem('user'));
    let target;
    if(user.role == Role.STUDENT || user.role == Role.TEACHER){
      target = user.username;
    }
    if(user.role == Role.PARENT){
      target = user.sons[0].username;
    }
    return this.http.get('/api/personalNotices?target=' + target);
  }

  public sendNoticeToClasses(type: string, title: string, body: string, targets: Student[]){
    let http_body: any = {};
    http_body.type = type;
    http_body.title = title;
    http_body.body = body;
    http_body.targets = targets;
    return this.http.post('/api/notice', http_body, httpOptions);
  }

  public sendNoticeToTeachers(type: string, title: string, body: string, targets: Teacher[]){
    let http_body: any = {};
    http_body.type = type;
    http_body.title = title;
    http_body.body = body;
    http_body.targets = targets;
    return this.http.post('/api/notice', http_body, httpOptions);
  }
  /*
  public setNoticeAuthorization(notice: Notice, authorized: boolean){
    let result = authorized ? 'Notice authorized' : 'Notice not authorized';
    alert(result + ": " + notice.getTitle());
  }
  */
  public getNoticeboard(){
    return this.http.get('/api/noticeBoard');
  }
}
