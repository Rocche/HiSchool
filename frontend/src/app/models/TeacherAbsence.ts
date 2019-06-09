export class TeacherAbsence{

    private teacher: string;
    private date: string;
    private hour: number;
    private classroom: string;

    constructor(teacher: string, date: string, hour: number, classroom: string){
        this.teacher = teacher;
        this.date = date;
        this.hour = hour;
        this.classroom = classroom;
    }

    public setDate(date: string){
        this.date = date;
    }
}