import { v4 as uuid } from 'uuid';
import { PersonalNotice } from '../../models/models'

import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { NoticeManager } from './noticeManager';

export class PersonalNoticeManager extends TableManager {

    public async getPersonalNotice(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "PersonalNotices" WHERE id = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get notice information
            let noticeManager = new NoticeManager()
            req.body.ID = this.result.rows[0].notice;
            let notice = await noticeManager.getNotice(req)
            // create personalNotice
            let personalNotice = new PersonalNotice(
                this.result.rows[0].ID,
                this.result.rows[0].date,
                this.result.rows[0].target,
                notice,
                this.result.rows[0].status
            )
            this.result = personalNotice
        }
        return this.result
    }


    public async getPersonalNotices(req: Request): Promise<any> {

<<<<<<< HEAD
        this.sql = 'SELECT * FROM "PersonalNotices" WHERE "UsersUsername" = $1'
=======
        this.sql = 'SELECT * FROM "PersonalNotices" WHERE target = $1'
>>>>>>> e16671279df51bfa051e956dd346b4ebdb61487b
        this.params = [
            req.body.target
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let noticeManager = new NoticeManager()
            let personalNoticesArray = []

            for (let row of this.result.rows) {
                // get notice information
                req.body.ID = row.notice;
                let notice = await noticeManager.getNotice(req)
                // create personalNotice
                let personalNotice = new PersonalNotice(
                    row.ID,
                    row.date,
                    row.target,
                    notice,
                    row.status
                )
                personalNoticesArray.push(personalNotice)
            }
            this.result = personalNoticesArray
        }
        return this.result
    }

    public async postPersonalNotice(req: Request): Promise<any> {

        let personalNoticeID = uuid();
<<<<<<< HEAD
        this.sql = 'INSERT INTO "PersonalNotices" ( id, "UsersUsername", "NoticesId", status ) VALUES ($1,$2,$3,$4)'
=======
        this.sql = 'INSERT INTO "PersonalNotices" ( id, UsersUsername, target, NoticesId, status ) VALUES ($1,$2,$3,$4,$5)'
>>>>>>> e16671279df51bfa051e956dd346b4ebdb61487b
        this.params = [
            personalNoticeID,
            req.body.username,
            req.body.notice,
            "Unsigned",
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }

}