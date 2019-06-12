import { Parent, User } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../managers";

export class ParentManager extends TableManager {

    public async getParent(user: User): Promise<any> {

        this.sql = 'SELECT * FROM Parents WHERE username = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let parent = new Parent(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                this.result.rows[0].sons
            )
            this.result = parent
        }
        return this.result
    }

    public async postParent(req: Request): Promise<any> {

        this.sql = 'INSERT INTO Parents ( username, sons ) VALUES ($1,$2)'
        this.params = [
            req.body.username,
            req.body.sons
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }

}