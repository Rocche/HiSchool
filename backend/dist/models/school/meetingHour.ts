import { DayOfWeek } from "../enums/dayOfWeek";
import { Hour } from "../enums/hour";
import { Teacher } from "../people/teacher";

export class MeetingHour {
    
    ID: string;
    dayOfWeek: DayOfWeek;
    hour: Hour;
    teacher: Teacher;

    constructor (ID:string, dayOfWeek: DayOfWeek, hour: Hour, teacher: Teacher) {
        this.ID = ID;
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.teacher = teacher;
    }

}