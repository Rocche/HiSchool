import { User } from "../user";
import { Role } from "../role";

export class Teacher extends User{

    subjects: string[];

    constructor(username:string, password:string, email:string, role:Role, fName:string, lName:string, subjects:string[]) {
        super(username, password, email, role, fName, lName);
        this.subjects = subjects;
    }
    
}