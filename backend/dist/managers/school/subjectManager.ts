import { Subject } from '../../models/models'

import { Request } from "express"
import { TableManager, ParentManager } from "../managers";

export class SubjectManager extends TableManager {

    public async getSubject(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Subjects WHERE ID = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let subject = new Subject(
                this.result.rows[0].ID,
                this.result.rows[0].name
            )
            this.result = subject
        }
        return this.result
        
    }

    public async getSubjects(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Subjects'
        this.params = []

        if (this.result.rowCount > 0) {
            let subjectsArray = []
            for (let row of this.result.rows) {
                let tempClass = new Subject(
                    row.ID,
                    row.name
                )
                subjectsArray.push(tempClass)
            }
            this.result = subjectsArray
        }
        return this.result
    }
}