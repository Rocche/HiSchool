import { NoticeType } from '../models'

export class Notice {

    ID: number;
    type: NoticeType;
    title: string;
    body: string;
    
    constructor (ID: number, type: NoticeType, title:string, body:string) {
        this.ID = ID;
        this.type = type;
        this.title = title;
        this.body = body;
    }
}