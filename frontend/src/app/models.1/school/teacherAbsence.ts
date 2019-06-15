import { LessonHour } from "./lessonHour";
import { Teacher } from "../people/teacher";

export class TeacherAbsence {

    id: string;
    date: Date;
    lessonHour: LessonHour;
    substitute: Teacher;

    constructor (id: string, date: Date, lessonHour: LessonHour, substitute: Teacher) {
        this.id = id;
        this.date = date;
        this.lessonHour = lessonHour;
        this.substitute = substitute;
    }

}
