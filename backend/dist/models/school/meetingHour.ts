import { DayOfWeek } from "../enums/dayOfWeek";
import { Hour } from "../enums/hour";
import { Teacher } from "../people/teacher";

export class MeetingHour {
    
    id: string;
    dayOfWeek: DayOfWeek;
    hour: Hour;
    teacher: Teacher;

    constructor (id: string, dayOfWeek: DayOfWeek, hour: Hour, teacher: Teacher) {
        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.teacher = teacher;
    }

}