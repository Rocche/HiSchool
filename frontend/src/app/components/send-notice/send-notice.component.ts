import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models.1/school/notice';
import { NoticesService } from 'src/app/services/notices.service';
import { NoticeType } from 'src/app/models.1/enums/noticeType';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models.1/school/class';
//import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models.1/people/teacher';
import { Student } from 'src/app/models.1/models';

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
  private selectedTeacher: Teacher;
  private selectedTeachers: Teacher[];
  private selectedClass: Class;
  private selectedClasses: Class[];
  private noticeType: string;
  private title: string;
  private body: string;

  constructor(private noticesService: NoticesService, private classService: ClassService) { 
    this.notice = new Notice(null, null, null, null, null);
  }

  ngOnInit() {
    this.selectedClasses = [];
    this.selectedTeachers = [];
  }

  public sendNotice(){
    console.log(this.targetType)
    if(this.targetType == 'class'){
      let targets: Student[] = [];
      this.selectedClasses.forEach((c: Class) => {
        this.classService.getClassStudent(c)
          .subscribe((res: Student[]) => {
            res.forEach((student: Student) => {
              targets.push(student);
            });
            this.noticesService.sendNoticeToClasses(this.noticeType, this.title, this.body, targets)
              .subscribe(res => {
                alert("Notice sent succesfully.")
              },
              error => {
                alert("There was an error while sending the notice")
              })
          },
          error => {
            alert("Error while getting students")
          })
      });
    }
    else{
      this.noticesService.sendNoticeToTeachers(this.noticeType, this.title, this.body,this.selectedTeachers)
        .subscribe(res => {
            alert("Notice sent succesfully.")
          },
          error => {
            alert("There was an error while sending the notice")
          })
    }
  }

  public selectTarget(){
    switch(this.targetType){
      case "class":
        this.selectedTeachers = [];
        this.classService.getClasses()
          .subscribe((res: Class[]) => {
            this.classes = res;
          },
          error => {
            alert("Error while getting classes")
          })
        break;
      case "teacher":
        this.selectedClasses = [];
        this.classService.getTeachers()
          .subscribe((res: Teacher[]) => {
            this.teachers = res;
          },
          error => {
            alert("Error while getting teachers");
          })
        break;
      default:
        alert("You should select a target type first.");
        break;
    }
  }

  public addClass(){
    this.selectedClasses.push(this.selectedClass);
    let index = this.classes.indexOf(this.selectedClass, 0);
    if (index > -1) {
       this.classes.splice(index, 1);
    }
  }

  public addTeacher(){
    this.selectedTeachers.push(this.selectedTeacher);
    let index = this.teachers.indexOf(this.selectedTeacher, 0);
    if (index > -1) {
       this.teachers.splice(index, 1);
    }
  }

  public removeFromClasses(c: Class){
    let index = this.selectedClasses.indexOf(c, 0);
    if (index > -1) {
       this.selectedClasses.splice(index, 1);
    }
    this.classes.push(c);
  }

  public removeFromTeachers(teacher: Teacher){
    let index = this.selectedTeachers.indexOf(teacher, 0);
    if (index > -1) {
       this.selectedTeachers.splice(index, 1);
    }
    this.teachers.push(teacher);
  }
}
