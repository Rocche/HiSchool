import { Parent, User, Role, Student } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";

export class ParentManager extends TableManager {

    public async getParent(user: User): Promise<any> {
        //I only need to take sons (user is already token)
        this.sql = 'SELECT * FROM "Users" INNER JOIN "Students" ON "Users".username = "Students"."UsersUsername" WHERE "Students"."ParentsUsername" = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let sons = []
            for(let row of this.result.rows){
                let son = new Student(
                    row.username,
                    row.email,
                    row.role,
                    row.name,
                    row.surname,
                    row.ClassesId,
                    row.ParentsUsername
                );
                sons.push(son);
            }
            let parent = new Parent(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                sons
            )
            this.result = parent
        }
        return this.result
    }

    public async postParent(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Parents" ( "UsersUsername" ) VALUES ($1)'
        this.params = [
            req.body.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }

}