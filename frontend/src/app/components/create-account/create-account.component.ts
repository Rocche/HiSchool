import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/models.1/utils/userAuth';
import { AccountService } from 'src/app/services/account.service';
import { Subject } from 'rxjs';
//import { ParentService } from 'src/app/services/parent.service';
import { Parent } from 'src/app/models.1/people/parent';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models.1/school/class';
import { Role } from 'src/app/models.1/models';
//import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  private account: UserAuth;
  private selectedRole: string;
  private parents: Parent[];
  private classes: Class[];
  private subjects: string[];
  private teacherSubjects: string[];
  private selectedSubject: string;

  constructor(private accountService: AccountService, private classService: ClassService) { 
    this.account = new UserAuth(null, null, null, null, null, null);
    this.parents = [];
    this.teacherSubjects = [];
  }

  ngOnInit() {
  }

  public createAccount(){
    this.accountService.createAccount(this.account);
  }

  public selectRole(){
    if(this.account.role == Role.STUDENT){
      //this.parents = this.parentService.getParents();
      this.classes = this.classService.getClasses();
    }
    if(this.account.role == Role.TEACHER){
      //this.subjects = this.subjectService.getSubjects();
    }
  }

  public addSubject(){
    this.teacherSubjects.push(this.selectedSubject);
  }

  public removeFromSubjects(subject: string){
    let index = this.teacherSubjects.indexOf(subject, 0);
    if (index > -1) {
       this.teacherSubjects.splice(index, 1);
    }
  }
}
