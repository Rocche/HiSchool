import { Log } from "../models";

export class Report {

    id: string;
    date: Date;
    username: string;
    log: Log;
    body: string;

    constructor (id: string, date: Date, username: string, log: Log, body:string) {
        this.id = id;
        this.date = date;
        this.username = username;
        this.log = log;
        this.body = body
    }
    
}