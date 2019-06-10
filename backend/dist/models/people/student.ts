import { User } from "../utils/user";
import { Role } from "../enums/role";
import { Parent } from "./parent";

export class Student extends User{

    class: string;
    parent: Parent;

    constructor(username:string, email:string, role:Role, fName:string, lName:string, cl:string, parent:Parent) {
        super(username, email,fName, lName, role);
        this.class = cl;
        this.parent = parent;
    }
}