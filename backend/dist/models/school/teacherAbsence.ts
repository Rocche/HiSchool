import { LessonHour } from "./lessonHour";

export class TeacherAbsence {

    ID: string;
    teacher: string;
    date: Date;
    lessonHour: LessonHour;
    substitute: string;

    constructor (ID: string, teacher: string, date: Date, lessonHour: LessonHour, substitute: string) {
        this.ID = ID;
        this.teacher = teacher;
        this.date = date;
        this.lessonHour = lessonHour;
        this.substitute = substitute;
    }

}
