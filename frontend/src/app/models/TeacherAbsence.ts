export class TeacherAbsence{

    private teacher: string;
    private date: string;
    private hour: number;

    constructor(teacher: string, date: string, hour: number){
        this.teacher = teacher;
        this.date = date;
        this.hour = hour;
    }

    public setDate(date: string){
        this.date = date;
    }
}