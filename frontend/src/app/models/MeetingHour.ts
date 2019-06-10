export class MeetingHour{

    private dayOfWeek: number;
    private hour: number;
    private teacher: string;

    constructor(dayOfWeek: number, hour: number, teacher: string){
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.teacher = teacher;
    }
}