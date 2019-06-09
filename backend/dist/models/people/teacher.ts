import { User } from "../utils/user";
import { Role } from "../enums/roles";

export class Teacher extends User{

    subjects: string[];

    constructor(username:string, password:string, email:string, role:Role, fName:string, lName:string, subjects:string[]) {
        super(username, password, email, fName, lName, role);
        this.subjects = subjects;
    }
    
}