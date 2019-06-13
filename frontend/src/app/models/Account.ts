import { ROLES } from './roles';

export class Account{

    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;
    private role: ROLES;

    constructor(firstName: string, lastName: string, username: string, password: string, role: ROLES){
        this.firstName = firstName;
        this.lastName = lastName;
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

    public getFirstName(){
        return this.firstName;
    }

    public getLastName(){
        return this.lastName;
    }

    public getRole(){
        return this.role;
    }
}