export class TeacherAbsence{

    private teacher: string;
    private date: string;
    private hour: number;
    private class: string;

    constructor(teacher: string, date: string, hour: number, classroom: string){
        this.teacher = teacher;
        this.date = date;
        this.hour = hour;
        this.class = classroom;
    }

    public setDate(date: string){
        this.date = date;
    }

    public getDate(){
        return this.date;
    }

    public getTeacher(){
        return this.teacher;
    }

    public getHour(){
        return this.hour
    }

    public getClass(){
        return this.class;
    }
}