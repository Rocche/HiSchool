import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/Notice';
import { NoticesService } from 'src/app/services/notices.service';
import { NOTICE_TYPES } from 'src/app/models/noticeTypes';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models/Class';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/Teacher';

@Component({
  selector: 'app-send-notice',
  templateUrl: './send-notice.component.html',
  styleUrls: ['./send-notice.component.css']
})
export class SendNoticeComponent implements OnInit {

  private notice: Notice;
  private targetType: string;
  private classes: Class[];
  private teachers: Teacher[];

  constructor(private noticesService: NoticesService, private classService: ClassService, private teacherService: TeacherService) { 
    this.notice = new Notice(null, null, null, NOTICE_TYPES.authorization);
  }

  ngOnInit() {
  }

  public sendNotice(){
    this.noticesService.sendNotice(this.notice);
  }

  public selectTarget(){
    switch(this.targetType){
      case "class":
        this.classes = this.classService.getClasses();
        break;
      case "teacher":
        this.teachers = this.teacherService.getTeachers();
        break;
      default:
        alert("You should select a target type first.");
        break;
    }
  }
}
