import { Injectable } from '@angular/core';
import { TeacherAbsence } from '../models/TeacherAbsence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private absences: TeacherAbsence[];

  constructor() { 
    this.absences = [
      new TeacherAbsence('Samuele Cucchi', '31/02/2019', 3, '3A'),
      new TeacherAbsence('Alessandro Liscio', '31/02/2019', 2, '4BL')
    ]
  }

  public addAbsence(absence: TeacherAbsence){
    console.log(absence);
  }

  public getAbsences(): TeacherAbsence[]{
    return this.absences;
  }

  public confirmSubstitution(absence: TeacherAbsence){
    alert("substitution confirmed: " + absence.getDate() + ", " + absence.getHour() + ", " + absence.getClass());
  }

  public ignoreSubstitution(absence: TeacherAbsence){
    alert("substitution ignored: " + absence.getDate() + ", " + absence.getHour() + ", " + absence.getClass());
  }
}