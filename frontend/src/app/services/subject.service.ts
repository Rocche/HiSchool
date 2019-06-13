import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjects: string[];

  constructor() {
    this.subjects = [
      'math',
      'science',
      'italian',
      'latin',
      'physics'
    ]
   }

   public getSubjects(){
     return this.subjects;
   }
}
