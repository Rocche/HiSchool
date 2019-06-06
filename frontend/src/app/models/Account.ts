import { ROLES } from './roles';

export class Account{

    private name: string;
    private surname: string;
    private username: string;
    private password: string;
    private role: ROLES;

    constructor(name: string, surname: string, username: string, password: string, role: ROLES){
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public setUsername(username: string){
        this.username = username;
    }
    
    public setPassword(password: string){
        this.password = password;
    }

    public getName(){
        return this.name;
    }

    public getSurname(){
        return this.surname;
    }
}