import { User } from "../utils/user";
import { Role } from "../enums/role";
import { Student } from "./student"

export class Parent extends User{

    sons: Student[];

    constructor(username:string, email:string, role:Role, fName:string, lName:string, sons:Student[]) {
        super(username, email, fName, lName, role);
        this.sons = sons;
    }
    
}