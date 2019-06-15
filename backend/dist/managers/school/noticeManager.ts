import { v4 as uuid } from 'uuid';
import { Notice } from '../../models/models'

import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { PersonalNoticeManager } from './personalNoticeManager';

export class NoticeManager extends TableManager {

    public async getNotice(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Notices" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let notice = new Notice(
                this.result.rows[0].id,
                this.result.rows[0].date,
                this.result.rows[0].type,
                this.result.rows[0].title,
                this.result.rows[0].body

            )
            this.result = notice
        }
        return this.result
    }

    public async getNoticeBoard(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Notices"'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let noticesArray = []
            for (let row of this.result.rows) {
                let notice = new Notice(
                    row.id,
                    row.date,
                    row.type,
                    row.title,
                    row.body
                )
                noticesArray.push(notice)
            }
            this.result = noticesArray
        }
        return this.result
    }

    public async postNotice(req: Request): Promise<any> {

        let noticeID = uuid();
        this.sql = 'INSERT INTO "Notices" ( id, date, type, title, body) VALUES ($1,$2,$3,$4,$5)'
        this.params = [
            noticeID,
            req.body.date,
            req.body.type,
            req.body.title, 
            req.body.body
        ]
        console.log(req.body)
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        let personalNoticeManager = new PersonalNoticeManager();
        req.body.targets.forEach(async target => {
            req.body.notice = noticeID
            req.body.target = target.username
            await personalNoticeManager.postPersonalNotice(req)
        });
        return this.result
    }

}