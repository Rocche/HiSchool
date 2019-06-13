import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedIn$: Observable<boolean>;
  private role: string;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.accountService.loggedIn$;
    this.accountService.roleLoggedIn$
    .subscribe((role: string) => {
      this.role = role;
    })
  }

  public logout(): void{
    let confirmation = confirm("Are you sure you want to log out?");
    if(confirmation){
      this.accountService.logout();
    }
  }

}
