import { User } from "../utils/user";
import { Role } from "../enums/role";

export class Administrator extends User{

    constructor(username:string, email:string, role:Role, fName:string, lName:string) {
        super(username, email, fName, lName, role);
    }
    
}