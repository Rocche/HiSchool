import { Class } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { AccountManager } from "../utils/accountManager";
import { BranchManager } from "../managers";

export class ClassManager extends TableManager {

    public async getClass(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Classes" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            // get branch information
            let branchManager = new BranchManager();
            req.query.id = this.result.rows[0].BranchesId
            let branch = await branchManager.getBranch(req)
            // create class
            let cl = new Class(
                this.result.rows[0].id,
                this.result.rows[0].year,
                this.result.rows[0].section,
                branch
            )
            this.result = cl
        }
        return this.result
    }

    public async getClasses(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Classes"'
        this.params = []

        if (this.result.rowCount > 0) {

            let branchManager = new BranchManager();
            let classesArray = []

            for (let row of this.result.rows) {
            // get branch information
            req.query.id = this.result.rows[0].BranchesId
            let branch = await branchManager.getBranch(req)
            // create class
                let cl = new Class(
                    row.ID,
                    row.year,
                    row.section,
                    branch
                )
                classesArray.push(cl)
            }
            this.result = classesArray
        }
        return this.result
    }

    public async getClassStudents(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Students" WHERE "ClassesId" = $1'
        this.params = [
            req.query.class
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let studentsArray = []
            let accountManager = new AccountManager()
            for (let row of this.result.rows) {
                // get student information
                req.query.username = row.UsersUsername
                let student = await accountManager.getUser(req)
                // push student in array
                studentsArray.push(student)
            }
            this.result = studentsArray
        }
        return this.result
    }

    
    public async getClassTeachers(req: Request): Promise<any> {

        this.sql = 'SELECT "TeachersUsername" FROM "LessonHours" WHERE "ClassesId" = $1 GROUP BY "TeachersUsername"'
        this.params = [
            req.query.class
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let teachersArray = []
            let accountManager = new AccountManager()
            for (let row of this.result.rows) {
                // get teacher information
                req.query.username = row.TeachersUsername
                let teacher = await accountManager.getUser(req)
                // push teacher in array
                teachersArray.push(teacher)
            }
            this.result = teachersArray
        }
        return this.result
    }
}