export class Meeting{

    private date: string;
    private hour: number;
    private dayOfWeek: number;
    private teacher: string;
    private parent: string;

    constructor(date: string, hour: number, dayOfWeek: number, teacher: string, parent: string){
        this.date = date;
        this.hour = hour;
        this.dayOfWeek = dayOfWeek;
        this.teacher = teacher;
        this.parent = parent;
    }

    public getDate(){
        return this.date;
    }

    public getHour(){
        return this.hour;
    }
}