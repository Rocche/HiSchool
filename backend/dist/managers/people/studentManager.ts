import { Parent, User } from "../../models/models"
import { Student } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../managers";

export class StudentManager extends TableManager {

    public async getStudent(user: User): Promise<any> {

        this.sql = 'SELECT * FROM Students WHERE username = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let student = new Student(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                this.result.rows[0].class,
                this.result.rows[0].parent
            )
            this.result = student
        }
        return this.result
        
    }
    public async postStudent(req: Request): Promise<any> {

        this.sql = 'INSERT INTO Teachers ( username, parent, subjects ) VALUES ($1,$2, $3)'
        this.params = [
            req.body.username,
            req.body.class,
            req.body.parent
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }
}