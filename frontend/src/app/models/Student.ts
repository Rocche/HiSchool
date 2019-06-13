import { Class } from './Class';
import { User } from './User';
import { ROLES } from './roles';

export class Student extends User{

    private class: Class;

    constructor(firstName: string, lastName: string, email: string, c: Class){
        super(firstName, lastName, email, ROLES.student);
        this.class = c;
    }
}