import { MeetingHour } from "./meetingHour";
import { Parent } from "../people/parent";

export class Meeting {
    
    id: string;
    date: Date;
    meetingHour: MeetingHour;
    parent: Parent;

    constructor (id: string, date: Date, meetingHour: MeetingHour, parent: Parent) {
        this.id = id;
        this. date = date;
        this.meetingHour = meetingHour;
        this.parent = parent;
    }
}