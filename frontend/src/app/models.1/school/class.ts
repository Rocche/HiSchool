export class Class {

    id: string;
    year: number;
    section: string;
    branch: string;

    constructor (id: string, year:number, section:string, branch:string) {
        this.id = id;
        this.year = year;
        this.section = section;
        this.branch = branch
    }
}