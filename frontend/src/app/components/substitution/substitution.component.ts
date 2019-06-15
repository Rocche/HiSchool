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
    this.getAbsences();
  }

  public setSubstitutionDisponibility(absence: TeacherAbsence){
    this.absenceService.setSubstitutionDisponibility(absence.id)
      .subscribe(res => {
        alert("Substitution set correctly");
        this.getAbsences();
      },
      error => {
        alert("There was an error setting the substitution");
      })
  }

  private getAbsences(){
    this.absenceService.getAbsences()
    .subscribe((res: TeacherAbsence[]) => {
      this.absences = res;
    },
    error => {
      alert("There was an error getting substitutions")
    })
  }

}
