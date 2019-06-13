import { Role } from '../models'

export class SerializedUser{
    
    username: string;
    role: Role;

    constructor (username:string, role:Role) {
        this.username = username;
        this.role = role
    }

}