import { ROLES } from './roles';

export class Account{

    private firstname: string;
    private lastname: string;
    private username: string;
    private password: string;
    private role: ROLES;

    constructor(firstname: string, lastname: string, username: string, password: string, role: ROLES){
        this.firstname = firstname;
        this.lastname = lastname;
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

    public getFirstname(){
        return this.firstname;
    }

    public getLastname(){
        return this.lastname;
    }

    public getRole(){
        return this.role;
    }
}