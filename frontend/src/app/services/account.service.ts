import { Injectable } from '@angular/core';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

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
}
