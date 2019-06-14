import { User, Administrator } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";

export class AdministratorManager extends TableManager {

    public async getAdministrator(user: User): Promise<any> {

        this.sql = 'SELECT * FROM "Administrators" WHERE "UsersUsername = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let administrator = new Administrator(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName
        )
            this.result = administrator
        }
        return this.result
        
    }

    public async postAdministrator(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Administrators" ( "UsersUsername" ) VALUES ($1)'
        this.params = [
            req.body.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        return this.result

    }

}