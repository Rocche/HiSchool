import { Request } from "express"
import { TableManager, NoticeManager } from "../managers";
import { Report, NoticeType } from "../../models/models";
import { LogManager } from "./logManager";
import { v4 as uuid } from 'uuid';

export class ReportManager extends TableManager {

    public async getReport(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Reports WHERE id = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get log information
            let logManager = new LogManager()
            req.body.ID = this.result.rows[0].log
            let log = await logManager.getLog(req)
            // create report
            let report = new Report(
                this.result.rows[0].ID,
                this.result.rows[0].date,
                this.result.rows[0].username,
                log,
                this.result.rows[0].body

            )
            this.result = report
        }
        return this.result
    }

    public async getReports(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Reports'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let logManager = new LogManager()
            let reportsArray = []

            for (let row of this.result.rows) {
                // get log information
                req.body.ID = row.log;
                let log = await logManager.getLog(req)
                // create report
                let report = new Report(
                    row.ID,
                    row.date,
                    row.username,
                    log,
                    row.body
                )
                reportsArray.push(report)
            }
            this.result = reportsArray
        }
        return this.result
    }

    public async postReport(req: Request): Promise<any> {

        let reportID = uuid();
        this.sql = 'INSERT INTO Reports ( id, body, date, AdministratorsUsername, LogsId ) VALUES ($1,$2,$3,$4,$5)'
        this.params = [
            reportID,
            req.body.date,
            req.body.username,
            req.body.log,
            req.body.body
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        
        // send report notice
        this.result = await this.sendReportNotice(req)
        
        return this.result
    }

    private async sendReportNotice(req: Request): Promise<any> {

        // post a new notice regarding the meeting cancellation
        // create notice
        let noticeManager = new NoticeManager();
        req.body.date = Date.now();
        req.body.type = NoticeType.Standard
        req.body.title = 'REPORT RECEIVED'
        req.body.body = "An administrator has responded to your log of date "
                        + req.body.log.date + ".";
        req.body.targets = [req.body.log.username]
        this.result = await noticeManager.postNotice(req)
        return this.result

    }
}