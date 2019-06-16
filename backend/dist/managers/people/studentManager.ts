import { User } from "../../models/models"
import { Student } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";

export class StudentManager extends TableManager {

    public async getStudent(user: User): Promise<any> {
        this.sql = 'SELECT * FROM "Students" WHERE "UsersUsername" = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            // get parent information
            let student = new Student(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                this.result.rows[0].ClassesId,
                this.result.rows[0].ParentsUsername
            )
            this.result = student
        }
        return this.result
        
    }
    public async postStudent(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Students" ( "UsersUsername", "ClassId", "ParentsUsername" ) VALUES ($1,$2, $3)'
        this.params = [
            req.body.username,
            req.body.class,
            req.body.parent.username
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }
}