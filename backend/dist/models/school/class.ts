export class Class {

    ID: string;
    year: number;
    section: string;
    branch: string;

    constructor (year:number, section:string, branch:string) {

        this.year = year;
        this.section = section;
        this.branch = branch
    }
}