import { Component, OnInit } from '@angular/core';
import { User, Parent, Student, Notice, PersonalNotice } from 'src/app/models.1/models';
import { NoticesService } from 'src/app/services/notices.service';

@Component({
  selector: 'app-sons-notices',
  templateUrl: './sons-notices.component.html',
  styleUrls: ['./sons-notices.component.css']
})
export class SonsNoticesComponent implements OnInit {

  public user: Parent;
  public sons: Student[];
  public selectedTarget: Student;
  public notices: PersonalNotice[];
  public currentNotice: PersonalNotice;

  constructor(private noticesService: NoticesService) { }

  ngOnInit() {
    this.currentNotice = new PersonalNotice(null, null, null, new Notice(null, null, null, null, null), null);
    this.sons = JSON.parse(localStorage.getItem('user')).sons;
  }

  public selectTarget(){
    this.getNotices(this.selectedTarget.username);
  }

  private getNotices(target: string){
    this.noticesService.getNotices(target)
      .subscribe((res: PersonalNotice[]) => {
        this.notices = res;
      },
      error => {
        //alert("There was an error while getting notices");
      })
  }

}
