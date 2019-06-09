import { Role } from '../models'

export class UserAuth {

    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;

    constructor (username: string, password: string, email:string, firstName:string, lastName:string, role: Role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role
    }
}