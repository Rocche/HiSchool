import { User, Role } from "../../models/models"
import { Student } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../managers";
import { AccountManager } from "../utils/accountManager";

export class StudentManager extends TableManager {

    public async getStudent(user: User): Promise<any> {

        this.sql = 'SELECT * FROM Students WHERE username = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            // get parent information
            let accountManager = new AccountManager()
            let req: Request;
            req.body.username = this.result.rows[0].parent
            req.body.role = Role.PARENT
            let parent = await accountManager.getUser(req)
            let student = new Student(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                this.result.rows[0].class,
                parent
            )
            this.result = student
        }
        return this.result
        
    }
    public async postStudent(req: Request): Promise<any> {

        this.sql = 'INSERT INTO Students ( username, class, parent ) VALUES ($1,$2, $3)'
        this.params = [
            req.body.username,
            req.body.class,
            req.body.parent
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }
}