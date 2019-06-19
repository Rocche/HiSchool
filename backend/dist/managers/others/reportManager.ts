import { Request } from "express"
import { NoticeManager, LogManager } from "../managers";
import { Report, NoticeType } from "../../models/models";
import { v4 as uuid } from 'uuid';
import { TableManager } from "../utils/tableManager";
import { AccountManager } from "../utils/accountManager";

export class ReportManager extends TableManager {

    public async getReport(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Reports" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get log information
            let logManager = new LogManager()
            req.body.id = this.result.rows[0].LogsId
            let log = await logManager.getLog(req)
            // create report
            let report = new Report(
                this.result.rows[0].id,
                this.result.rows[0].date,
                this.result.rows[0].AdministratorsUsername,
                log,
                this.result.rows[0].body

            )
            this.result = report
        }
        return this.result
    }

    public async getReports(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Reports"'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let logManager = new LogManager()
            let reportsArray = []

            for (let row of this.result.rows) {
                // get log information
                req.body.id = row.LogsId;
                let log = await logManager.getLog(req)
                // create report
                let report = new Report(
                    row.id,
                    row.date,
                    row.AdministratorsUsername,
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
        this.sql = 'INSERT INTO "Reports" ( id, body, date, "AdministratorsUsername", "LogsId" ) VALUES ($1,$2,$3,$4,$5)'
        this.params = [
            reportID,
            req.body.body,
            req.body.date,
            req.body.username,
            req.body.log.id
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
        req.body.date = new Date();
        req.body.type = NoticeType.Standard
        req.body.title = 'REPORT RECEIVED'
        req.body.body = "An administrator has responded to your log of date "
                        + req.body.log.date + ".";
        let accountManager = new AccountManager();
        let target = await accountManager.getUserByUsername(req.body.log.username);
        req.body.targets = [target]
        this.result = await noticeManager.postNotice(req)
        return this.result

    }
}