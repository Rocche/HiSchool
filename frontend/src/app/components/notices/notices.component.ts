import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models.1/school/notice';
import { NoticesService } from 'src/app/services/notices.service';
import { AccountService } from 'src/app/services/account.service';
import { PersonalNotice, Student, Role, User } from 'src/app/models.1/models';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  public notices: PersonalNotice[];
  public currentNotice: PersonalNotice;
  public role: string;
  public selectedTarget: User;
  public sons: Student[];
  public user: User;

  constructor(private noticesService: NoticesService, private accountService: AccountService) { }

  ngOnInit() {
    
    this.currentNotice = new PersonalNotice(null, null, null, new Notice(null, null, null, null, null), null);
    this.role = this.accountService.role;
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.role == Role.PARENT){
      this.sons = JSON.parse(localStorage.getItem('user')).sons;
      this.selectedTarget = null;
    }
    else{
      this.selectedTarget = this.user;
      this.getNotices(this.selectedTarget.username)
    }
  }

  public selectTarget(){
    this.getNotices(this.selectedTarget.username)
  }

  private getNotices(target: string){
    this.noticesService.getNotices(target)
    .subscribe((res: PersonalNotice[]) => {
      this.notices = res;
    },
    error => {
      alert("Error while getting personal notices");
    })
  }

  /*
  public setNoticeAuthorization(authorized: boolean){
    this.noticesService.setNoticeAuthorization(this.currentNotice, authorized);
  }
  */
}
