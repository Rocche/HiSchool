import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedIn$: BehaviorSubject<boolean>;
  public roleLoggedIn$: Subject<string>;

  constructor(private routingService: RoutingService) {
    this.loggedIn$ = new BehaviorSubject<boolean>(false);
    this.roleLoggedIn$ = new Subject<string>();
  }

  public authenticate(username: string, password: string): void{
    console.log(username, password);
    if(username != null){
      this.loggedIn$.next(true);
      this.roleLoggedIn$.next(username);
      this.routingService.navigateTo(username);
    }
  }
}
