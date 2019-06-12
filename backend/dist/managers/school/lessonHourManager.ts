import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { LessonHour, Role } from "../../models/models";
import { AccountManager } from "../utils/accountManager";

export class LessonHourManager extends TableManager {

    public async getLessonHour(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM LessonHours WHERE ID = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get teacher information
            let accountManager = new AccountManager();
            req.body.username = this.result.rows[0].teacher
            req.body.role = Role.TEACHER
            let teacher = await accountManager.getUser(req)
            // create lessonHour
            let lessonHour = new LessonHour(
                this.result.rows[0].ID,
                this.result.rows[0].class,
                teacher,
                this.result.rows[0].subject,
                this.result.rows[0].dayOfWeek,
                this.result.rows[0].hour
            )
            this.result = lessonHour
        }
        return this.result
    }
}
