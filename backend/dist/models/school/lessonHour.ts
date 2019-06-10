import { DayOfWeek, Hour, Class, Teacher, Subject } from '../models'

export class LessonHour{

    class: Class;
    teacher: string;
    subject: Subject;
    dayOfWeek: DayOfWeek;
    hour: Hour;

    constructor (cl:Class, teacher: string, subject: Subject, dayOfWeek: DayOfWeek, hour: Hour) {
        this.class = cl;
        this.teacher = teacher;
        this.subject = subject;
        this.dayOfWeek = dayOfWeek;
        this.hour = hour
    }

}