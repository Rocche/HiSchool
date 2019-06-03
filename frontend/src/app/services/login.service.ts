import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public authenticate(username: string, password: string): boolean{
    return true;
  }
}
