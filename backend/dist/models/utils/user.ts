import { Role } from "../enums/role"

export class User{

    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;

    constructor(username:string, email:string,fName: string, lName:string, role:Role) {
        this.username = username;
        this.email = email;
        this.firstName = fName;
        this.lastName = lName;
        this.role = role;
     }

}