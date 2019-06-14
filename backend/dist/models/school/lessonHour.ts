import { DayOfWeek, Hour, Class, Teacher, Subject } from '../models'

export class LessonHour{

    id: string;
    class: string;
    teacher: Teacher;
    subject: Subject;
    dayOfWeek: DayOfWeek;
    hour: Hour;

    constructor (id: string, cl:string, teacher: Teacher, subject: Subject, dayOfWeek: DayOfWeek, hour: Hour) {
        this.id = id;
        this.class = cl;
        this.teacher = teacher;
        this.subject = subject;
        this.dayOfWeek = dayOfWeek;
        this.hour = hour
    }

}