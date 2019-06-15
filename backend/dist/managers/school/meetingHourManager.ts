import { Request } from "express"
import { AccountManager } from "../managers";
import { MeetingHour } from "../../models/models";
import { TableManager } from "../utils/tableManager";

export class MeetingHourManager extends TableManager {

    public async getMeetingHour(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "MeetingHours" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get teacher information
            let accountManager = new AccountManager()
            req.query.username = this.result.rows[0].TeachersUsername
            let teacher = await accountManager.getUser(req)
            // create meetingHour
            let meetingHour = new MeetingHour(
                this.result.rows[0].id,
                this.result.rows[0].dayOfWeek,
                this.result.rows[0].hour,
                teacher
            )
            this.result = meetingHour
        }
        return this.result
    }

    public async getMeetingHours(req: Request): Promise<any> {


        this.sql = 'SELECT * FROM "MeetingHours" WHERE "TeachersUsername" = $1'
        this.params = [
            req.query.teacher
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let accountManager = new AccountManager()
            let meetingHoursArray = []

            for (let row of this.result.rows) {
                // get teacher information
                req.query.username = row.TeachersUsername
                let teacher = await accountManager.getUser(req)
                // create meetingHour
                let meetingHour = new MeetingHour(
                    row.id,
                    row.dayOfWeek,
                    row.hour,
                    teacher
                    )
                meetingHoursArray.push(meetingHour)
            }
            this.result = meetingHoursArray
        }
        return this.result
    }
}
