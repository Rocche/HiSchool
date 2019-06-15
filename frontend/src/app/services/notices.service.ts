import { Injectable } from '@angular/core';
import { Notice } from '../models/Notice';
import { NOTICE_TYPES } from '../models/noticeTypes';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models.1/models';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  private notices: Notice[];

  constructor(private http: HttpClient) {
    this.notices = [
      new Notice('student', 'School meeting', 'We inform students that bla bla bla...', NOTICE_TYPES.authorization),
      new Notice('student', 'School bomb', 'We inform students that bla bla bla...', NOTICE_TYPES.authorization),
      new Notice('student', 'School SBANF', 'We inform students that bla bla bla...', NOTICE_TYPES.normal)
    ]
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

  public sendNotice(notice: Notice){
    alert(notice);
  }

  public setNoticeAuthorization(notice: Notice, authorized: boolean){
    let result = authorized ? 'Notice authorized' : 'Notice not authorized';
    alert(result + ": " + notice.getTitle());
  }

  public getNoticeboard(){
    return this.http.get('/api/noticeBoard');
  }
}
