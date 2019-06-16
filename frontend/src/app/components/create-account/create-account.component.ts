import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/models.1/utils/userAuth';
import { AccountService } from 'src/app/services/account.service';
//import { ParentService } from 'src/app/services/parent.service';
import { Parent } from 'src/app/models.1/people/parent';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models.1/school/class';
import { Role, Subject, User } from 'src/app/models.1/models';
import { UserService } from 'src/app/services/user.service';
//import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  private selectedRole: string;
  private parents: Parent[];
  private classes: Class[];
  private subjects: Subject[];
  private teacherSubjects: Subject[];
  private selectedSubject: Subject;
  private insertedFirstName: string;
  private insertedLastName: string;
  private insertedEmail: string;
  private insertedRole: string;
  private selectedParent: Parent;
  private selectedClass: Class;

  constructor(private accountService: AccountService, private classService: ClassService, private userService: UserService) { 
    this.parents = [];
    this.teacherSubjects = [];
  }

  ngOnInit() {
  }

  public createAccount(){
    let user = new User(this.insertedEmail, this.insertedEmail, this.insertedFirstName, this.insertedLastName, this.insertedRole as Role);
    if(this.insertedRole == 'TEACHER'){
      this.accountService.createTeacherAccount(user, this.teacherSubjects)
        .subscribe(res => {
          alert("Account created succesfully");
        },
        error => {
          alert("There was an error in creating the account")
        })
    }
    if(this.insertedRole == 'PARENT'){
      this.accountService.createParentAccount(user)
        .subscribe(res => {
          alert("Account created succesfully");
        },
        error => {
          alert("There was an error in creating the account");
        })
    }
    if(this.insertedRole == 'STUDENT'){
      this.accountService.createStudentAccount(user, this.selectedClass, this.selectedParent)
        .subscribe(res => {
          alert("Account created succesfully");
        },
        error => {
          alert("There was an error in creating the account");
        })
    }
    //this.accountService.createAccount(this.account);
  }

  public selectRole(){
    if(this.insertedRole == 'STUDENT'){
      this.userService.getParents()
        .subscribe((res: Parent[]) => {
          this.parents = res;
        },
        error => {
          alert("Error while getting parents");
        })
      this.classService.getClasses()
        .subscribe((res: Class[]) => {
          this.classes = res;
        },
        error => {
          alert("Error while getting classes");
        })
    }
    if(this.insertedRole == 'TEACHER'){
      this.classService.getAllSubjects()
        .subscribe((res: Subject[]) => {
          this.subjects = res;
        },
        error => {
          alert("Error while getting subjects");
        })
    }
  }

  public addSubject(){
    this.teacherSubjects.push(this.selectedSubject);
    let index = this.subjects.indexOf(this.selectedSubject, 0);
    if (index > -1) {
       this.subjects.splice(index, 1);
    }
  }

  public removeFromSubjects(subject: Subject){
    let index = this.teacherSubjects.indexOf(subject, 0);
    if (index > -1) {
       this.teacherSubjects.splice(index, 1);
    }
    this.subjects.push(subject);
  }

}
