import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private insertedUsername;
  private insertedPassword;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  public login(): void{
    this.accountService.authenticate(this.insertedUsername, this.insertedPassword);
  }

}
