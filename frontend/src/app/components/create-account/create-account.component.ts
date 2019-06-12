import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account.service';
import { ROLES } from '../../models/roles';
import { Subject } from 'rxjs';
import { ParentService } from 'src/app/services/parent.service';
import { Parent } from 'src/app/models/Parent';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models/Class';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  private account: Account;
  private selectedRole: string;
  private parents: Parent[];
  private classes: Class[];
  private subjects: string[];
  private teacherSubjects: string[];
  private selectedSubject: string;

  constructor(private accountService: AccountService, private parentService: ParentService, private classService: ClassService,
    private subjectService: SubjectService) { 
    this.account = new Account(null, null, null, null, null);
    this.parents = [];
    this.teacherSubjects = [];
  }

  ngOnInit() {
  }

  public createAccount(){
    this.accountService.createAccount(this.account);
  }

  public selectRole(){
    if(this.account.getRole() == 'student'){
      this.parents = this.parentService.getParents();
      this.classes = this.classService.getClasses();
    }
    if(this.account.getRole() == 'teacher'){
      this.subjects = this.subjectService.getSubjects();
    }
  }

  public addSubject(){
    this.teacherSubjects.push(this.selectedSubject);
  }

  public removeFromSubjects(subject: string){
    const index = this.teacherSubjects.indexOf(subject, 0);
    if (index > -1) {
       this.teacherSubjects.splice(index, 1);
    }
  }
}
