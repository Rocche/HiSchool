import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logs: Log[];

  constructor(private http: HttpClient) { 
    this.logs = [
      new Log('Giacomo Rocchetti', 'This application does not work'),
      new Log('Samuele Cucchi', 'I cannot send messages')
    ]
  }

  public getLogs(){
    return this.http.get('/api/logs');
  }
}
