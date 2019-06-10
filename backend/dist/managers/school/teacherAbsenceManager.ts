import { TeacherAbsence } from '../../models/models'
import { v4 as uuid } from 'uuid';

import { Request } from "express"
import { TableManager } from "../managers";

export class TeacherAbsenceManager extends TableManager {

    public async getTeacherAbsence(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Notices WHERE ID = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let teacherAbsence = new TeacherAbsence(
                this.result.rows[0].ID,
                this.result.rows[0].teacher,
                this.result.rows[0].date,
                this.result.rows[0].lessonHour,
                this.result.rows[0].substitute
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
            null
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }

    public async updateTeacherAbsence(req: Request): Promise<any> {

        this.sql = 'UPDATE TeacherAbsences SET substitute = $1 WHERE ID = $2'
        this.params = [
            req.body.substitute,
            req.body.ID
        ]
        this.result = await this.dbManager.updateQuery(this.sql, this.params)
        return this.result
    }

}