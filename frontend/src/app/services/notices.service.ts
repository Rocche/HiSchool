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

  public getNotices(target: string){
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
  
  public getNoticeboard(){
    return this.http.get('/api/noticeBoard');
  }
}
