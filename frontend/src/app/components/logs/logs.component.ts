import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models.1/others/log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  private logs: Log[];

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs()
      .subscribe((res: Log[]) => {
        this.logs = res;
      },
      error => {
        alert("There was an error in getting logs")
      })
  }

}
