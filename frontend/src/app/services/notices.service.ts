import { Injectable } from '@angular/core';
import { Notice } from '../models/Notice';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  private notices: Notice[];

  constructor() {
    this.notices = [
      new Notice('student', 'School meeting', 'We inform students that bla bla bla...'),
      new Notice('student', 'School bomb', 'We inform students that bla bla bla...'),
      new Notice('student', 'School SBANF', 'We inform students that bla bla bla...')
    ]
  }

  public getNotices(targetUser: string){
    return(this.notices);
  }
}
