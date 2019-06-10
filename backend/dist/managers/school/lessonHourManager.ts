import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { LessonHour } from "../../models/models";

export class TimeTableManager extends TableManager {

    public async getLessonHour(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM LessonHours WHERE ID = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let lessonHour = new LessonHour(
                this.result.rows[0].class,
                this.result.rows[0].teacher,
                this.result.rows[0].subject,
                this.result.rows[0].dayOfWeek,
                this.result.rows[0].hour

            )
            this.result = user
        }
        return this.result
    }
