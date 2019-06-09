import { Component, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/services/absence.service';
import { TeacherAbsence } from 'src/app/models/TeacherAbsence';

@Component({
  selector: 'app-substitution',
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.css']
})
export class SubstitutionComponent implements OnInit {

  private absences: TeacherAbsence[];

  constructor(private absenceService: AbsenceService) { }

  ngOnInit() {
    this.absences = this.absenceService.getAbsences();
  }

}
