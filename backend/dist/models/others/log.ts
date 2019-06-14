export class Log {

    id: string;
    date: Date;
    username: string;
    body: string;

    constructor (id: string, date: Date, username:string, body:string) {
        this.id = id;
        this.date = date;
        this.username = username;
        this.body = body
    }
    
}