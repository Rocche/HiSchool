import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private insertedUsername;
  private insertedPassword;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public login(): void{
    this.loginService.authenticate(this.insertedUsername, this.insertedPassword);
  }

}
