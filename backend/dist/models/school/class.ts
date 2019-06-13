export class Class {

    ID: string;
    year: number;
    section: string;
    branch: string;

    constructor (ID: string, year:number, section:string, branch:string) {
        this.ID = ID;
        this.year = year;
        this.section = section;
        this.branch = branch
    }
}