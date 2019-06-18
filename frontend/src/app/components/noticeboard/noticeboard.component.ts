import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models.1/school/notice';
import { NoticesService } from 'src/app/services/notices.service';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {

  public noticeboard: Notice[];
  public currentNotice: Notice;

  constructor(private noticesService: NoticesService) { }

  ngOnInit() {
    this.noticesService.getNoticeboard()
      .subscribe((res: Notice[]) => {
        this.noticeboard = res;
      },
      error => {
        //alert("Error while getting noticeboard")
      })
    this.currentNotice = new Notice(null, null, null, null, null);
  }

}
