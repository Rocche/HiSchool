import { User } from "../utils/user";
import { Role } from "../enums/roles";

export class Student extends User{

    class: string;

    constructor(username:string, password:string, email:string, role:Role, fName:string, lName:string, cl:string) {
        super(username, password, email,fName, lName, role);
        this.class = cl;
    }
}