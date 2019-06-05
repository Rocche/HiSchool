export class LessonHour{
    public dayOfWeek: number;
    public hour: number;
    public subject: string;

    constructor(dayOfWeek: number, hour: number, subject: string){
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.subject = subject;
    }
}