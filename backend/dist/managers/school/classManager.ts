import { Class, Student, Role } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { AccountManager } from "../utils/accountManager";

export class ClassManager extends TableManager {

    public async getClass(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Classes" WHERE id = $1'
        this.params = [
            req.body.ID
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let cl = new Class(
                this.result.rows[0].ID,
                this.result.rows[0].year,
                this.result.rows[0].section,
                this.result.rows[0].branch
            )
            this.result = cl
        }
        return this.result
    }

    public async getClasses(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Classes"'
        this.params = []

        if (this.result.rowCount > 0) {
            let classesArray = []
            for (let row of this.result.rows) {
                let cl = new Class(
                    row.ID,
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

    public async getClassStudents(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Students" INNER JOIN "Users" ON Students.UsersUsername = Users.username WHERE ClassId = $1'
        this.params = [
            req.body.class
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let studentsArray = []
            let accountManager = new AccountManager()
            for (let row of this.result.rows) {
                // get parent information
                req.body.username = row.parent
                req.body.role = Role.PARENT
                let parent = await accountManager.getUser(req)
                // create student
                let student = new Student(
                    row.username,
                    row.email,
                    row.role,
                    row.fName,
                    row.lName,
                    row.class,
                    parent
                )
                studentsArray.push(student)
            }
            this.result = studentsArray
        }
        return this.result
    }
}