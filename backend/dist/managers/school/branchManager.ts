import { Branch } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";

export class BranchManager extends TableManager {

    public async getBranch(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Branches" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let branch = new Branch(
                this.result.rows[0].id,
                this.result.rows[0].name
            )
            this.result = branch
        }
        return this.result
    }

}