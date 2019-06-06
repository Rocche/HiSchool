import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account.service';
import { ROLES } from '../../models/roles';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  private account: Account;

  constructor(private accountService: AccountService) { 
    this.account = new Account(null, null, null, null, null);
  }

  ngOnInit() {
  }

  public createAccount(){
    this.accountService.createAccount(this.account);
  }

}
