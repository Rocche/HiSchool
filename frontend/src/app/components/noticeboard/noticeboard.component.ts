import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/Notice';
import { NoticesService } from 'src/app/services/notices.service';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {

  private noticeboard: Notice[];
  private currentNotice: Notice;

  constructor(private noticesService: NoticesService) { }

  ngOnInit() {
    this.noticeboard = this.noticesService.getNoticeboard();
    this.currentNotice = new Notice(null, null, null, null);
  }

}
