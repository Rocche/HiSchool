import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/Notice';
import { NoticesService } from 'src/app/services/notices.service';
import { LoginService } from 'src/app/services/login.service';
import { ROLES } from 'src/app/models/roles';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  private notices: Notice[];
  private currentNotice: Notice;
  private role: string;

  constructor(private noticesService: NoticesService, private loginService: LoginService) { }

  ngOnInit() {
    this.notices = this.noticesService.getNotices('student');
    this.currentNotice = new Notice(null, null, null, null);
    this.role = this.loginService.role;
  }

  public setNoticeAuthorization(authorized: boolean){
    this.noticesService.setNoticeAuthorization(this.currentNotice, authorized);
  }
}
