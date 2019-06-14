import { Teacher, User } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";

export class TeacherManager extends TableManager {

    public async getTeacher(user: User): Promise<any> {

<<<<<<< HEAD
        this.sql = 'SELECT * FROM "Teachers" WHERE "UsersUsername = $1'
=======
        this.sql = 'SELECT * FROM "Teachers" WHERE "UsersUsername" = $1'
>>>>>>> 1cb64c214eaabad1de8f7e194707ebcfa36ed54d
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let teacher = new Teacher(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName
        )
            this.result = teacher
        }
        return this.result
        
    }

    public async postTeacher(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Teachers" ( "UsersUsername" ) VALUES ($1)'
        this.params = [
            req.body.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        req.body.subjects.forEach(async subject => {
            this.result = await this.postTS(req)
        });
        this.result = await this.postTS
        return this.result

    }

    public async postTS(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Teaches" ( "TeachersUsername", "SubjectsId" ) VALUES ($1, $2)'
        this.params = [
            req.body.username,
            req.body.subject.ID
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        return this.result

    }

}