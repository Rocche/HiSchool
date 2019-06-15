import { TeacherAbsence, NoticeType, Role, CustomError } from '../../models/models'
import { v4 as uuid } from 'uuid';

import { Request } from "express"
import { AccountManager, LessonHourManager, NoticeManager, ClassManager } from "../managers";
import { TableManager } from '../utils/tableManager';

export class TeacherAbsenceManager extends TableManager {

    public async getTeacherAbsence(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "TeacherAbsences" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get lessonHour information
            let lessonHourManager = new LessonHourManager()
            req.query.id = this.result.rows[0].LessonHoursId
            let lessonHour = await lessonHourManager.getLessonHour(req)
            // get substitute teacher information
            let accountManager = new AccountManager();
            req.query.username = this.result.rows[0].substitute
            let substitute = await accountManager.getUser(req)
            // create teacherAbsence
            let teacherAbsence = new TeacherAbsence(
                this.result.rows[0].id,
                this.result.rows[0].date,
                lessonHour,
                substitute
            )
            this.result = teacherAbsence
        }
        return this.result
    }

    public async getTeacherAbsences(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "TeacherAbsences"'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let teacherAbsencesArray = []
            let lessonHourManager = new LessonHourManager()
            let accountManager = new AccountManager();

            for (let row of this.result.rows) {
                // get lessonHour information
                req.query.id = row.LessonHoursId
                let lessonHour = await lessonHourManager.getLessonHour(req)
                // get substitute teacher information
                req.query.username = row.substitute
                let substitute = await accountManager.getUser(req)
                // create teacherAbsence
                let teacherAbsence = new TeacherAbsence(
                    this.result.rows[0].id,
                    this.result.rows[0].date,
                    lessonHour,
                    substitute
                )
                teacherAbsencesArray.push(teacherAbsence)
            }
            this.result = teacherAbsencesArray
        }
        return this.result
    }

    public async getAvailableTeacherAbsences(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "TeacherAbsences" WHERE "substitute" = $1 AND "TeachersUsername" <> $2 '
        this.params = [
            'nobody',
            req.query.teacher
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let teacherAbsencesArray = []
            let lessonHourManager = new LessonHourManager()
            let accountManager = new AccountManager();

            for (let row of this.result.rows) {
                // get lessonHour information
                req.query.id = row.LessonHoursId
                let lessonHour = await lessonHourManager.getLessonHour(req)
                // get substitute teacher information
                req.query.username = row.substitute
                let substitute = await accountManager.getUser(req)
                // create teacherAbsence
                let teacherAbsence = new TeacherAbsence(
                    row.id,
                    row.date,
                    lessonHour,
                    substitute
                )
                teacherAbsencesArray.push(teacherAbsence)
            }
            this.result = teacherAbsencesArray
        }
        return this.result
    }

    public async postTeacherAbsence(req: Request): Promise<any> {

        let teacherAbsenceID = uuid()
        this.sql = 'INSERT INTO "TeacherAbsences" ( id, "TeachersUsername", date, "LessonHoursId", substitute ) VALUES ($1,$2,$3,$4,$5)'
        this.params = [
            teacherAbsenceID,
            req.body.teacher.username,
            req.body.date,
            req.body.lessonHour.id,
            'nobody'
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)


        if (!(this.result instanceof Error) || (this.result instanceof CustomError)) {
            // send absence notice
            req.query.id = teacherAbsenceID
            this.result = await this.sendAbsenceNotice(req)
        }

        return this.result
    }

    public async updateTeacherAbsence(req: Request): Promise<any> {

        this.sql = 'UPDATE "TeacherAbsences" SET substitute = $1 WHERE id = $2'
        this.params = [
            req.body.substitute,
            req.body.id
        ]
        this.result = await this.dbManager.updateQuery(this.sql, this.params)

        // send substitution notices
        this.result = await this.sendSubstitutionNotice(req)

        return this.result
    }

    private async sendAbsenceNotice(req: Request): Promise<any> {

        // post a new notice regarding the substitution
        // get teacherAbsence information
        let teacherAbsence = await this.getTeacherAbsence(req)
        let strDate = new Date(teacherAbsence.date).toDateString()
        // create notice information
        let noticeManager = new NoticeManager();
        req.body.type = NoticeType.Standard
        req.body.title = 'SUBSTITUTION'
        req.body.body = "The lesson of date " + strDate +
            " and hour " + teacherAbsence.lessonHour.hour +
            " will be cancelled due to a teacher absence."
        let classManager = new ClassManager();
        req.query.class = teacherAbsence.lessonHour.class
        let classStudents = await classManager.getClassStudents(req)
        if (classStudents instanceof Error || classStudents instanceof CustomError){
            return classStudents
        }
        req.body.targets = classStudents
        this.result = await noticeManager.postNotice(req)
        return this.result

    }

    private async sendSubstitutionNotice(req: Request): Promise<any> {

        // post a new notice regarding the substitution
        // get teacherAbsence information
        let teacherAbsence = await this.getTeacherAbsence(req)
        // create notice informationW
        let noticeManager = new NoticeManager();
        req.body.type = NoticeType.Standard
        req.body.title = 'SUBSTITUTION'
        req.body.body = "The lesson of date " + teacherAbsence.date +
            " and hour " + teacherAbsence.lessonHour.hour +
            " will be substituted by " + teacherAbsence.substitute.firstName +
            " " + teacherAbsence.substitute.lastName +
            "."
        let classManager = new ClassManager()
        req.body.class = teacherAbsence.lessonHour.class
        let classStudents = await classManager.getClassStudents(req)
        if (classStudents instanceof Error || classStudents instanceof CustomError){
            return classStudents
        }
        req.body.targets = classStudents
        this.result = await noticeManager.postNotice(req)
        return this.result

    }
}