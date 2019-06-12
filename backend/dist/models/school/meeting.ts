import { MeetingHour } from "./meetingHour";
import { Parent } from "../people/parent";

export class Meeting {
    
    ID: string;
    date: Date;
    meetingHour: MeetingHour;
    parent: Parent;

    constructor (ID: string, date: Date, meetingHour: MeetingHour, parent: Parent) {
        this.ID = ID;
        this. date = date;
        this.meetingHour = meetingHour;
        this.parent = parent;
    }
}