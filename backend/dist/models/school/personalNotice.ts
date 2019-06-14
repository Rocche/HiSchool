import { Notice, NoticeStatus } from '../models'

export class PersonalNotice {

    id: string;
    date: Date;
    target: string;
    notice: Notice;
    status: NoticeStatus

    constructor (id: string, date:Date, target:string, notice: Notice, status:NoticeStatus) {
        this.id = id;
        this.date = date;
        this.target = target;
        this.notice = notice;
        this.status = status;
    }
}