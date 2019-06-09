import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logs: Log[];

  constructor() { 
    this.logs = [
      new Log('Giacomo Rocchetti', 'This application does not work'),
      new Log('Samuele Cucchi', 'I cannot send messages')
    ]
  }

  public getLogs(): Log[]{
    return this.logs;
  }
}
