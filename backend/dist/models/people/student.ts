import { User } from "../utils/user";
import { Role } from "../enums/role";

export class Student extends User{

    class: string;
    parent: string;

    constructor(username:string, email:string, role:Role, fName:string, lName:string, cl:string, parent: string) {
        super(username, email,fName, lName, role);
        this.class = cl;
        this.parent = parent;
    }
}