import { User } from "../utils/user";
import { Role } from "../enums/roles";
import { Student } from "./student"

export class Parent extends User{

    sons: Student[];

    constructor(username:string, password:string, email:string, role:Role, fName:string, lName:string, sons:Student[]) {
        super(username, password, email, fName, lName, role);
        this.sons = sons;
    }
    
}