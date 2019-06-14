import { Injectable } from '@angular/core';
import { Account } from '../models/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutingService } from './routing.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Role, User, Student } from '../models.1/models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public loggedIn$: BehaviorSubject<boolean>;
  public roleLoggedIn$: Subject<string>;
  public role: string;

  constructor(private http: HttpClient, private routingService: RoutingService) {
    this.loggedIn$ = new BehaviorSubject<boolean>(false);
    this.roleLoggedIn$ = new Subject<string>();
  }

  public createAccount(account: Account) {
    console.log(account);
  }

  public authenticate(username: string, password: string) {
    let body = `username=${username}&password=${password}`;
    this.http.post("/api/login", body, httpOptions)
      .subscribe((res: any) => {
        let role = res.ServerResponse.role;
        //get User object
        this.http.get("/api/user?username="+username)
          .subscribe((res: any) => {
            localStorage.setItem('user', JSON.stringify(res));
            this.loggedIn$.next(true);
            this.roleLoggedIn$.next(res.role);
            this.role = res.role;
            this.routingService.navigateTo('/' + res.role.toLowerCase());
          },
          error => {
            alert("Something went terribly wrong")
          })
      },
      error => {
        alert("Username or password not correct")
      })
  }
  
  public logout(): void{
    this.loggedIn$.next(false);
    this.routingService.navigateTo('');
}
  //createAccount
}
