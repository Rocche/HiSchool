import { Parent, User, Role } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { AccountManager } from "../utils/accountManager";

export class ParentManager extends TableManager {

    public async getParent(user: User): Promise<any> {

        this.sql = 'SELECT * FROM "Parents" WHERE "UsersUsername" = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            // get sons information
            let accountManager = new AccountManager()
            let sons = []
            let req: Request;
            this.result.rows[0].sons.forEach(async son => {
                sons.push(await accountManager.getUserByUsername(son))
            });
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

        this.sql = 'INSERT INTO "Parents" ( UsersUsername ) VALUES ($1)'
        this.params = [
            req.body.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)
        return this.result
    }

}