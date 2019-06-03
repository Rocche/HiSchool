import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public login(): void{
    if(this.loginService.authenticate('giacomo', 'giacomo')){
      alert('login successful');
    }
    else{
      alert('username or password not correct');
    }
  }

}
