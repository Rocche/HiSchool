import { MeetingHour } from './MeetingHour';

export class Meeting{

    private date: string;
    private parent: string;
    private meetingHour: MeetingHour;

    constructor(date: string, parent: string, meetingHour: MeetingHour){
        this.date = date;
        this.parent = parent;
        this.meetingHour = meetingHour;
    }

    public getDate(){
        return this.date;
    }

    public getHour(){
        return this.meetingHour.getHour();
    }
}