import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { LessonHour } from "../../models/models";
import { AccountManager } from "../utils/accountManager";
import { SubjectManager } from "./subjectManager";

export class TimeTableManager extends TableManager {

    public async getClassTimeTable(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "LessonHours" WHERE "ClassesId" = $1'
        this.params = [
            req.query.class
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let lessonHoursArray = []
            for (let row of this.result.rows) {
                // get teacher information
                let accountManager = new AccountManager()
                req.body.username = row.TeachersUsername
                let teacher = await accountManager.getUser(req)
                // get subject information
                let subjectManager = new SubjectManager()
                req.body.id = row.SubjectsId
                let subject = await subjectManager.getSubject(req)
                // create lessonHour
                let lessonHour = new LessonHour(
                    row.id,
                    row.ClassesId,
                    teacher,
                    subject,
                    row.dayOfWeek,
                    row.hour
                )
                lessonHoursArray.push(lessonHour)
            }
            this.result = lessonHoursArray
        }
        return this.result
    }


    public async getTeacherTimeTable(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "LessonHours" WHERE "TeachersUsername" = $1'
        this.params = [
            req.body.teacher
        ]

        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let lessonHoursArray = []
            for (let row of this.result.rows) {
                // get teacher information
                let accountManager = new AccountManager()
                req.body.username = row.TeachersUsername
                let teacher = await accountManager.getUser(req)
                // get subject information
                let subjectManager = new SubjectManager()
                req.body.id = row.SubjectsId
                let subject = await subjectManager.getSubject(req)
                let lessonHour = new LessonHour(
                    row.id,
                    row.ClassesId,
                    teacher,
                    subject,
                    row.dayOfWeek,
                    row.hour
                )
                lessonHoursArray.push(lessonHour)
            }
            this.result = lessonHoursArray
        }
        return this.result
    }

}