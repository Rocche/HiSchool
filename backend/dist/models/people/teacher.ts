import { User } from "../utils/user";
import { Role } from "../enums/role";

export class Teacher extends User{

    subjects: string[];

    constructor(username:string, email:string, role:Role, fName:string, lName:string, subjects:string[]) {
        super(username, email, fName, lName, role);
        this.subjects = subjects;
    }
    
}