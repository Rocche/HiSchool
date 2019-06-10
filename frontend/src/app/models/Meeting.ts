export class Meeting{

    private date: string;
    private hour: number;
    private dayOfWeek: number;
    private teacher: string;
    private parents: string[];

    constructor(date: string, hour: number, dayOfWeek: number, teacher: string, parents: string[]){
        this.date = date;
        this.hour = hour;
        this.dayOfWeek = dayOfWeek;
        this.teacher = teacher;
        this.parents = parents;
    }

    public getDate(){
        return this.date;
    }

    public getHour(){
        return this.hour;
    }
}