import { Notice, PersonalNotice } from '../models/models'

import { Request } from "express"
import { TableManager } from "./tableManager";

export class NoticeManager extends TableManager {

    public async getNotice(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Notices WHERE ID = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let user = new Notice(
                this.result.rows[0].ID,
                this.result.rows[0].title,
                this.result.rows[0].type,
                this.result.rows[0].body

            )
            this.result = user
        }
        return this.result

    }

    

    public async getPersonalNotice(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM PersonalNotices WHERE ID = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            req.body.ID = this.result.rows[0].notice;
            let user = new Notice(
                this.result.rows[0].ID,
                this.result.rows[0].target,
                await this.getNotice(req),
                this.result.rows[0].status
            )
            this.result = user
        }
        return this.result
    }

    public async getNoticeBoard(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Notices'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let noticesArray = []
            for (let row of this.result.rows) {
                let tempClass = new Notice(
                    row.ID,
                    row.type,
                    row.title,
                    row.body
                )
                noticesArray.push(tempClass)
            }
            this.result = noticesArray
        }
        return this.result

    }

    public async getPersonalNotices(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM PersonalNotices WHERE target = $1'
        this.params = [
            req.body.target
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let personalNoticesArray = []
            for (let row of this.result.rows) {
                req.body.ID = row.notice;
                let tempClass = new PersonalNotice(
                    row.ID,
                    row.target,
                    await this.getNotice(req),
                    row.status
                )
                personalNoticesArray.push(tempClass)
            }
            this.result = personalNoticesArray
        }
        return this.result
    }

}