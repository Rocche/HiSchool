import { Injectable } from '@angular/core';
import { Log } from '../models.1/others/log';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logs: Log[];

  constructor(private http: HttpClient) { 
    
  }

  public getLogs(){
    return this.http.get('/api/logs');
  }

  public sendReport(log: Log, reportBody: string){
    let body: any = {};
    body.log = log;
    body.date = new Date();
    body.body = reportBody;
    body.username = JSON.parse(localStorage.getItem('user')).username;
    return this.http.post('/api/report', body, httpOptions);
  }
}
