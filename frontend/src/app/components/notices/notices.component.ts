import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/Notice';
import { NoticesService } from 'src/app/services/notices.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  private notices: Notice[];

  constructor(private noticesService: NoticesService, private loginService: LoginService) { }

  ngOnInit() {
    this.notices = this.noticesService.getNotices('student');
  }

}
