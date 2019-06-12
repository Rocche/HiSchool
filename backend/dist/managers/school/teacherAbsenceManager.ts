import { TeacherAbsence, NoticeType, Role } from '../../models/models'
import { v4 as uuid } from 'uuid';

import { Request } from "express"
import { TableManager, LessonHourManager, NoticeManager } from "../managers";
import { AccountManager } from '../utils/accountManager';
import { ClassManager } from './classManager';

export class TeacherAbsenceManager extends TableManager {

    public async getTeacherAbsence(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM TeacherAbsences WHERE ID = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get lessonHour information
            let lessonHourManager =  new LessonHourManager()
            req.body.ID = this.result.rows[0].lessonHour
            let lessonHour = await lessonHourManager.getLessonHour(req)
            // get substitute teacher information
            let accountManager = new AccountManager();
            req.body.username = this.result.rows[0].substitute
            req.body.role = Role.TEACHER
            let substitute = await accountManager.getUser(req)
            // create teacherAbsence
            let teacherAbsence = new TeacherAbsence(
                this.result.rows[0].ID,
                this.result.rows[0].date,
                lessonHour,
                substitute
            )
            this.result = teacherAbsence
        }
        return this.result
    }

    public async postTeacherAbsence(req: Request): Promise<any> {
        
        let teacherAbsenceID = uuid()
        this.sql = 'INSERT INTO TeacherAbsences ( ID, teacher, date, lessonHour, substitute ) VALUES ($1,$2,$3,$4, $5)'
        this.params = [
            teacherAbsenceID,
            req.body.teacher,
            req.body.date,
            req.body.lessonHour,
            'nobody'
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        
        // send absence notice
        req.body.ID = teacherAbsenceID
        this.result = await this.sendAbsenceNotice(req)
        
        return this.result
    }

    public async updateTeacherAbsence(req: Request): Promise<any> {

        this.sql = 'UPDATE TeacherAbsences SET substitute = $1 WHERE ID = $2'
        this.params = [
            req.body.substitute,
            req.body.ID
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
        // create notice information
        let noticeManager = new NoticeManager();
        req.body.date = Date.now();
        req.body.type = NoticeType.Standard
        req.body.title = 'SUBSTITUTION'
        req.body.body = "The lesson of date " + teacherAbsence.date + 
                        " and hour " + teacherAbsence.lessonHour.hour +
                        " will be cancelled due to a teacher absence."
        let classManager = new ClassManager()
        req.body.class = teacherAbsence.lessonHour.class
        let classStudents = await classManager.getClassStudents(req)
        req.body.targets = classStudents
        await noticeManager.postNotice(req)

    }

    private async sendSubstitutionNotice(req: Request): Promise<any> {

        // post a new notice regarding the substitution
        // get teacherAbsence information
        let teacherAbsence = await this.getTeacherAbsence(req)
        // create notice information
        let noticeManager = new NoticeManager();
        req.body.date = Date.now();
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
        req.body.targets = classStudents
        await noticeManager.postNotice(req)

    }
}