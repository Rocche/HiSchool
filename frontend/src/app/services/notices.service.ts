import { Injectable } from '@angular/core';
import { Notice } from '../models/Notice';
import { NOTICE_TYPES } from '../models/noticeTypes';
import { HttpClient } from '@angular/common/http';

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

  public getNotices(targetUser: string){
    return this.http.get('/api/personalNotices?target=' + targetUser);
  }

  public sendNotice(notice: Notice){
    alert(notice);
  }

  public setNoticeAuthorization(notice: Notice, authorized: boolean){
    let result = authorized ? 'Notice authorized' : 'Notice not authorized';
    alert(result + ": " + notice.getTitle());
  }

  public getNoticeboard(){
    return this.notices;
  }
}
