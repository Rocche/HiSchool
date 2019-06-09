import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account.service';
import { ROLES } from '../../models/roles';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  private account: Account;
  private selectedRole$: Subject<ROLES>;

  constructor(private accountService: AccountService) { 
    this.account = new Account(null, null, null, null, null);
    this.selectedRole$ = new Subject<ROLES>();
  }

  ngOnInit() {
  }

  public createAccount(){
    this.accountService.createAccount(this.account);
  }

  public selectRole(){
    this.selectedRole$.next(this.account.getRole());
  }

}
