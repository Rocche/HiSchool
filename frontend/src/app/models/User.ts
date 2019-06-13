import { ROLES } from './roles';

export class User{

    private firstName: string;
    private lastName: string;
    private email: string;
    private role: ROLES;

    constructor(firstName: string, lastName: string, email: string, role: ROLES){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
}