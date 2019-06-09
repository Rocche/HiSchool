import { User } from "../user";
import { Role } from "../roles";

export class Student extends User{

    class: string;

    constructor(username:string, password:string, email:string, role:Role, fName:string, lName:string, cl:string) {
        super(username, password, email, role, fName, lName);
        this.class = cl;
    }
}