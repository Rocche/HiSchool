export class Log {

    ID: string;
    date: Date;
    username: string;
    body: string;

    constructor (ID: string, date: Date, username:string, body:string) {
        this.ID = ID;
        this.date = date;
        this.username = username;
        this.body = body
    }
    
}