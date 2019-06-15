import { Component, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/services/absence.service';
import { TeacherAbsence } from 'src/app/models.1/school/teacherAbsence';

@Component({
  selector: 'app-substitution',
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.css']
})
export class SubstitutionComponent implements OnInit {

  private absences: TeacherAbsence[];

  constructor(private absenceService: AbsenceService) { }

  ngOnInit() {
    this.absenceService.getAbsences()
      .subscribe((res: TeacherAbsence[]) => {
        this.absences = res;
      },
      error => {
        alert("There was an error getting substitutions")
      })
  }

  public setSubstitutionDisponibility(absence: TeacherAbsence){
    this.absenceService.setSubstitutionDisponibility(absence);
  }

}
