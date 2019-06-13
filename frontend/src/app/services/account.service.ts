import { Injectable } from '@angular/core';
import { Account } from '../models/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutingService } from './routing.service';
import { BehaviorSubject, Subject } from 'rxjs';

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
    /*
    let body = `username=${username}&password=${password}`;
    return this.http.post("/api/login", body, httpOptions);
    */
    if (username != null) {
      this.loggedIn$.next(true);
      this.roleLoggedIn$.next(username);
      this.role = username;
      this.routingService.navigateTo('/' + username);
    }
  }
  
  public logout(): void{
    this.loggedIn$.next(false);
    this.routingService.navigateTo('');
}
  //createAccount
}
