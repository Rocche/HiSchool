import { User } from "../user";
import { Role } from "../roles";
import { Student } from "./student"

export class Parent extends User{

    sons: Student[];

    constructor(username:string, password:string, email:string, role:Role, fName:string, lName:string, sons:Student[]) {
        super(username, password, email, role, fName, lName);
        this.sons = sons;
    }
    
}