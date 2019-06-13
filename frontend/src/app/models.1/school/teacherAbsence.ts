import { LessonHour } from "./lessonHour";
import { Teacher } from "../people/teacher";

export class TeacherAbsence {

    ID: string;
    date: Date;
    lessonHour: LessonHour;
    substitute: Teacher;

    constructor (ID: string, date: Date, lessonHour: LessonHour, substitute: Teacher) {
        this.ID = ID;
        this.date = date;
        this.lessonHour = lessonHour;
        this.substitute = substitute;
    }

}
