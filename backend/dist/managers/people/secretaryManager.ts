import { User, Secretary } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";

export class SecretaryManager extends TableManager {

    public async getSecretary(user: User): Promise<any> {

        this.sql = 'SELECT * FROM "Secretaries" WHERE "UsersUsername = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let secretary = new Secretary(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName
        )
            this.result = secretary
        }
        return this.result
        
    }

    public async postSecretary(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Secretaries" ( "UsersUsername" ) VALUES ($1)'
        this.params = [
            req.body.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        return this.result

    }

}