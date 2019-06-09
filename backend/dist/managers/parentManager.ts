import { Parent } from "../models/models"

import { Request } from "express"
import { TableManager } from "./tableManager";

export class ParentManager extends TableManager {

    public async getParent(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM Parents WHERE username = $1'
        this.params = [
            req.body.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let user = new Parent(
                this.result.rows[0].username,
                this.result.rows[0].password,
                this.result.rows[0].email,
                this.result.rows[0].role,
                this.result.rows[0].firstName,
                this.result.rows[0].lastName,
                this.result.rows[0].sons
            )
            this.result = user
        }
        return this.result
    }

}