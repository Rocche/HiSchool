import { Notice, NoticeStatus } from '../models'

export class PersonalNotice {

    ID: number;
    target: string;
    notice: Notice;
    status: NoticeStatus

    constructor (ID: number, target:string, notice: Notice, status:NoticeStatus) {
        this.ID = ID;
        this.target = target;
        this.notice = notice;
        this.status = status;
    }
}