import { Class } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../tableManager";

export class ClassManager extends TableManager {

    public async getClass(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Classes WHERE year = $1, section = $2, branch = $3'
        this.params = [
            req.body.year,
            req.body.section,
            req.body.branch
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let cl = new Class(
                this.result.rows[0].year,
                this.result.rows[0].section,
                this.result.rows[0].branch
            )
            this.result = cl
        }
        return this.result
    }

    public async getClasses(): Promise<any> {

        this.sql = 'SELECT * FROM Classes'
        this.params = []

        if (this.result.rowCount > 0) {
            let classesArray = []
            for (let row of this.result.rows) {
                let cl = new Class(
                    row.year,
                    row.section,
                    row.branch
                )
                classesArray.push(cl)
            }
            this.result = classesArray
        }
        return this.result
    }
}