import { Injectable } from '@angular/core';
import { Account } from '../models/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public createAccount(account: Account){
    account.setUsername(this.generateUsername(account.getFirstName(), account.getLastName()));
    account.setPassword(this.generatePassword(account.getFirstName(), account.getLastName()));
    console.log(account);
  }

  private generateUsername(name: string, surname: string){
    return name + '_' + surname;
  }

  private generatePassword(name: string, surname: string){
    return name + '__' + surname;
  }

  public authenticate(username: string, password: string){
    let body = `username=${username}&password=${password}`;
    return this.http.post("/api/login", body, httpOptions);
  }
  //logout
  //createAccount
}
