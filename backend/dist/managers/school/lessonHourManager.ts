import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { LessonHour } from "../../models/models";
import { AccountManager, SubjectManager } from "../managers";

export class LessonHourManager extends TableManager {

    public async getLessonHour(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "LessonHours" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get teacher information
            let accountManager = new AccountManager();
            req.query.username = this.result.rows[0].TeachersUsername
            let teacher = await accountManager.getUser(req)
            // get subject information
            let subjectManager = new SubjectManager()
            req.query.id = this.result.rows[0].SubjectsId
            let subject = await subjectManager.getSubject(req)
            // create lessonHour
            let lessonHour = new LessonHour(
                this.result.rows[0].id,
                this.result.rows[0].ClassesId,
                teacher,
                subject,
                this.result.rows[0].dayOfWeek,
                this.result.rows[0].hour
            )
            this.result = lessonHour
        }
        return this.result
    }
}
