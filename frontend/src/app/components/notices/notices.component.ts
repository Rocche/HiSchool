import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models.1/school/notice';
import { NoticesService } from 'src/app/services/notices.service';
import { AccountService } from 'src/app/services/account.service';
import { ROLES } from 'src/app/models/roles';
import { PersonalNotice } from 'src/app/models.1/models';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  private notices: PersonalNotice[];
  private currentNotice: PersonalNotice;
  private role: string;

  constructor(private noticesService: NoticesService, private accountService: AccountService) { }

  ngOnInit() {
    this.noticesService.getNotices()
      .subscribe((res: PersonalNotice[]) => {
        this.notices = res;
      })
    this.currentNotice = new PersonalNotice(null, null, null, new Notice(null, null, null, null, null), null);
    this.role = this.accountService.role;
  }

  /*
  public setNoticeAuthorization(authorized: boolean){
    this.noticesService.setNoticeAuthorization(this.currentNotice, authorized);
  }
  */
}
