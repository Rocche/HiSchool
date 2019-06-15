import { Injectable } from '@angular/core';
import { Log } from '../models.1/others/log';
import { HttpClient } from '@angular/common/http';

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
}
