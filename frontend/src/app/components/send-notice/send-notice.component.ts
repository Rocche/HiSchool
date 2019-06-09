import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/Notice';
import { NoticesService } from 'src/app/services/notices.service';
import { NOTICE_TYPES } from 'src/app/models/noticeTypes';

@Component({
  selector: 'app-send-notice',
  templateUrl: './send-notice.component.html',
  styleUrls: ['./send-notice.component.css']
})
export class SendNoticeComponent implements OnInit {

  private notice: Notice;

  constructor(private noticesService: NoticesService) { 
    this.notice = new Notice(null, null, null, NOTICE_TYPES.authorization);
  }

  ngOnInit() {
  }

  public sendNotice(){
    this.noticesService.sendNotice(this.notice);
  }
}
