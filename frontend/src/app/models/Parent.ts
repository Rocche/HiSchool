import { Student } from './Student';
import { User } from './User';
import { ROLES } from './roles';

export class Parent extends User{

    private sons: Student[];

    constructor(firstName: string, lastName: string, email: string, sons: Student[]){
        super(firstName, lastName, email, ROLES.parent);
        this.sons = sons;
    }
}