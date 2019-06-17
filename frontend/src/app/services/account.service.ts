import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoutingService } from './routing.service';
import { BehaviorSubject } from 'rxjs';
import { Role, User, Student, Class, Parent } from '../models.1/models';
import { Subject } from '../models.1/school/subject';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const httpOptions_post = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public loggedIn$: BehaviorSubject<boolean>;
  public roleLoggedIn$: BehaviorSubject<string>;
  public role: string;

  constructor(private http: HttpClient, private routingService: RoutingService) {
    this.loggedIn$ = new BehaviorSubject<boolean>(false);
    this.roleLoggedIn$ = new BehaviorSubject<string>(null);
  }

  public getUser(): User{
    return JSON.parse(localStorage.getItem('user'));
  }

  public createTeacherAccount(user: User, subjects: Subject[]){
    let body: any = {};
    body.username = user.username;
    body.email = user.email;
    body.password = 'aa';
    body.firstName = user.firstName;
    body.lastName = user.lastName;
    body.role = user.role;
    body.subjects = subjects;
    return this.http.post('/api/user', body, httpOptions_post) 
  }

  public createAccount(user: User){
    let body: any = {};
    body.username = user.username;
    body.email = user.email;
    body.password = 'aa';
    body.firstName = user.firstName;
    body.lastName = user.lastName;
    body.role = user.role;
    return this.http.post('/api/user', body, httpOptions_post) 
  }

  public createStudentAccount(user: User, c: Class, parent: Parent){
    let body: any = {};
    body.username = user.username;
    body.email = user.email;
    body.password = 'aa';
    body.firstName = user.firstName;
    body.lastName = user.lastName;
    body.role = user.role;
    body.class = c;
    body.parent = parent;
    return this.http.post('/api/user', body, httpOptions_post);
  }

  public authenticate(username: string, password: string) {
    let body = `username=${username}&password=${password}`;
    this.http.post("/api/login", body, httpOptions)
      .subscribe((res: any) => {
        let role = res.ServerResponse.role;
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
    this.http.get("/api/logout")
      .subscribe((res: any) => {
        this.loggedIn$.next(false);
        this.routingService.navigateTo('');
        this.roleLoggedIn$.next(null);
        this.role = null;
      },
      error => {
        alert("Error logout: " + error)
      })
}
  //createAccount
}
