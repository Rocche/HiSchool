import { User } from './User';
import { ROLES } from './roles';

export class Teacher extends User{

    private subjects: string[];

    constructor(firstName: string, lastName: string, email: string, subjects: string[]){
        super(firstName, lastName, email, ROLES.teacher);
        this.subjects = subjects;
    }
}