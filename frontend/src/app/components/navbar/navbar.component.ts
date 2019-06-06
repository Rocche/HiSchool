import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedIn$: Observable<boolean>;
  private role: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.loggedIn$;
    this.loginService.roleLoggedIn$
    .subscribe((role: string) => {
      this.role = role;
    })
  }

  public logout(){
    let confirmation = confirm("Are you sure you want to log out?");
    if(confirmation){
      this.loginService.logout();
    }
  }

}
