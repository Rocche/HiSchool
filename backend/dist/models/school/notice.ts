import { NoticeType } from '../models'

export class Notice {

    ID: string;
    date: Date;
    type: NoticeType;
    title: string;
    body: string;
    
    constructor (ID: string, date:Date, type: NoticeType, title:string, body:string) {
        this.ID = ID;
        this.date = date;
        this.type = type;
        this.title = title;
        this.body = body;
    }
}