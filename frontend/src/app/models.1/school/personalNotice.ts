import { Notice, NoticeStatus } from '../models'

export class PersonalNotice {

    ID: string;
    date: Date;
    target: string;
    notice: Notice;
    status: NoticeStatus

    constructor (ID: string, date:Date, target:string, notice: Notice, status:NoticeStatus) {
        this.ID = ID;
        this.date = date;
        this.target = target;
        this.notice = notice;
        this.status = status;
    }
}