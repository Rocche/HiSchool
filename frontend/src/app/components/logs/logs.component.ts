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
  private currentLog: Log;
  private reportBody: string;

  constructor(private logService: LogService) { 
    this.currentLog = new Log(null, null, null, null);
  }

  ngOnInit() {
    this.logService.getLogs()
      .subscribe((res: Log[]) => {
        this.logs = res;
        console.log(this.logs)
      },
      error => {
        alert("There was an error in getting logs")
      })
  }

  public selectLog(log: Log){
    this.currentLog = log;
  }

  public sendReport(){
    this.logService.sendReport(this.currentLog, this.reportBody)
      .subscribe(res => {
        alert("Report succesfully sent.")
      },
      error => {
        alert("There was an error while sending the report")
      })
  }

}
