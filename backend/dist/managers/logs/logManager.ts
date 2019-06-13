import { Request } from "express"
import { TableManager,  } from "../managers";
import { Log } from "../../models/models";

export class LogManager extends TableManager {

    public async getLog(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Logs WHERE id = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let log = new Log(
                this.result.rows[0].ID,
                this.result.rows[0].date,
                this.result.rows[0].username,
                this.result.rows[0].body
            )
            this.result = log
        }
        return this.result
    }

    public async getLogs(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Logs'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let logsArray = []
            for (let row of this.result.rows) {
                let log = new Log(
                    row.ID,
                    row.date,
                    row.username,
                    row.body
                )
                logsArray.push(log)
            }
            this.result = logsArray
        }
        return this.result
    }

}
