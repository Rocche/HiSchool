import { Injectable } from '@angular/core';
import { TeacherAbsence } from '../models/TeacherAbsence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor() { }

  public addAbsence(absence: TeacherAbsence){
    console.log(absence);
  }
}
