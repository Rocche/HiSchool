import { Component, OnInit } from '@angular/core';
import { TeacherAbsence } from 'src/app/models/TeacherAbsence';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';
import { AbsenceService } from 'src/app/services/absence.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  private absence: TeacherAbsence;
  private date: any;

  constructor(private absenceService: AbsenceService) { }

  ngOnInit() {
    this.absence = new TeacherAbsence('teacher', null, null, '3A');
    this.date = null;
  }

  public addAbsence(){
    this.absence.setDate(this.date.year + "-" + this.date.month + "-" + this.date.day);
    this.absenceService.addAbsence(this.absence);
  }

}
