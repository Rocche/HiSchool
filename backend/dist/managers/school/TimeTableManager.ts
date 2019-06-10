import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { LessonHour } from "../../models/models";

export class TimeTableManager extends TableManager {

    public async getClassTimeTable(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM LessonHour WHERE class = $1'
        this.params = [
            req.body.class
        ]

        if (this.result.rowCount > 0) {
            let lessonHoursArray = []
            for (let row of this.result.rows) {
                let tempClass = new LessonHour(
                    row.class,
                    row.teacher,
                    row.subject,
                    row.dayOfWeek,
                    row.hour
                )
                lessonHoursArray.push(tempClass)
            }
            this.result = lessonHoursArray
        }
        return this.result
    }


    public async getTeacherTimeTable(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM LessonHour WHERE teacher = $1'
        this.params = [
            req.body.teacher
        ]

        if (this.result.rowCount > 0) {
            let lessonHoursArray = []
            for (let row of this.result.rows) {
                let tempClass = new LessonHour(
                    row.class,
                    row.teacher,
                    row.subject,
                    row.dayOfWeek,
                    row.hour
                )
                lessonHoursArray.push(tempClass)
            }
            this.result = lessonHoursArray
        }
        return this.result
    }

}