import { User, Role } from "../../models/models"
import { Student } from "../../models/models"

import { Request } from "express"
import { AccountManager } from "../utils/accountManager";
import { TableManager } from "../utils/tableManager";
import { request } from "https";

export class StudentManager extends TableManager {

    public async getStudent(user: User): Promise<any> {
        this.sql = 'SELECT * FROM "Students" WHERE "UsersUsername" = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            // get parent information
            let accountManager = new AccountManager()
            /*
            let req: Request;
            req.query.username = this.result.rows[0].ParentsUsername
            console.log('BBBB ' + req.query.username)
            req.query.role = Role.PARENT
            let parent = await accountManager.getUserByUsername(this.result.rows[0].ParentsUsername)
            */
            let student = new Student(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                this.result.rows[0].class,
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
            req.body.parent
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }
}