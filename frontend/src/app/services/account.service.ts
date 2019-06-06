import { Injectable } from '@angular/core';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  public createAccount(account: Account){
    account.setUsername(this.generateUsername(account.getName(), account.getSurname()));
    account.setPassword(this.generatePassword(account.getName(), account.getSurname()));
    console.log(account);
  }

  private generateUsername(name: string, surname: string){
    return name + '_' + surname;
  }

  private generatePassword(name: string, surname: string){
    return name + '__' + surname;
  }
}
