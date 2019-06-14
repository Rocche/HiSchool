import { NoticeType } from '../models'

export class Notice {

    id: string;
    date: Date;
    type: NoticeType;
    title: string;
    body: string;
    
    constructor (id: string, date:Date, type: NoticeType, title:string, body:string) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.title = title;
        this.body = body;
    }
}