import { Role } from "./roles"

export class User{

    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;

    

    constructor(username:string, pw: string, email:string,fName: string, lName:string, role:Role) {
        this.username = username;
        this.password = pw;
        this.email = email;
        this.firstName = fName;
        this.lastName = lName;
        this.role = role;
     }

}