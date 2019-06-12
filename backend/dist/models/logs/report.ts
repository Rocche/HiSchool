import { Log } from "../models";

export class Report {

    ID: string;
    date: Date;
    username: string;
    log: Log;
    body: string;

    constructor (ID: string, date: Date, username: string, log: Log, body:string) {
        this.ID = ID;
        this.date = date;
        this.username = username;
        this.log = log;
        this.body = body
    }
    
}