import { DayOfWeek, Hour, Class, Teacher, Subject } from '../models'

export class LessonHour{

    ID: string;
    class: string;
    teacher: Teacher;
    subject: Subject;
    dayOfWeek: DayOfWeek;
    hour: Hour;

    constructor (ID: string, cl:string, teacher: Teacher, subject: Subject, dayOfWeek: DayOfWeek, hour: Hour) {
        this.ID = ID;
        this.class = cl;
        this.teacher = teacher;
        this.subject = subject;
        this.dayOfWeek = dayOfWeek;
        this.hour = hour
    }

}