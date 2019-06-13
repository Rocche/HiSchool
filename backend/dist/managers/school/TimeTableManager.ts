import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { LessonHour, Role } from "../../models/models";
import { AccountManager } from "../utils/accountManager";
import { SubjectManager } from "./subjectManager";

export class TimeTableManager extends TableManager {

    public async getClassTimeTable(req: Request): Promise<any> {

<<<<<<< HEAD
        this.sql = 'SELECT * FROM "LessonHours" WHERE "ClassesId" = $1'
=======
        this.sql = 'SELECT * FROM "LessonHours" WHERE ClassesId = $1'
>>>>>>> e16671279df51bfa051e956dd346b4ebdb61487b
        this.params = [
            req.query.class
        ]

        if (this.result.rowCount > 0) {
            let lessonHoursArray = []
            for (let row of this.result.rows) {
                // get teacher information
                let accountManager = new AccountManager()
                req.body.username = row.teacher
                req.body.role = Role.TEACHER
                let teacher = await accountManager.getUser(req)
                // get subject information
                let subjectManager = new SubjectManager()
                req.body.ID = row.subject
                let subject = await subjectManager.getSubject(req)
                // create lessonHour
                let lessonHour = new LessonHour(
                    row.ID,
                    row.class,
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

<<<<<<< HEAD
        this.sql = 'SELECT * FROM "LessonHours" WHERE "TeachersUsername" = $1'
=======
        this.sql = 'SELECT * FROM "LessonHours" WHERE TeachersUsername = $1'
>>>>>>> e16671279df51bfa051e956dd346b4ebdb61487b
        this.params = [
            req.body.teacher
        ]

        if (this.result.rowCount > 0) {
            let lessonHoursArray = []
            for (let row of this.result.rows) {
                // get teacher information
                let accountManager = new AccountManager()
                req.body.username = row.teacher
                req.body.role = Role.TEACHER
                let teacher = await accountManager.getUser(req)
                // get subject information
                let subjectManager = new SubjectManager()
                req.body.ID = row.subject
                let subject = await subjectManager.getSubject(req)
                let lessonHour = new LessonHour(
                    row.ID,
                    row.class,
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