import { NOTICE_TYPES } from './noticeTypes';

export class Notice{

    private target: string;
    private title: string;
    private body: string;
    private type: NOTICE_TYPES;

    constructor(target: string, title: string, body: string, type: NOTICE_TYPES){
        this.target = target;
        this.title = title;
        this.body = body;
        this.type = type;
    }

    public getTitle(){
        return this.title;
    }
}