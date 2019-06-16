import { Parent, User, Role, Student, CustomError } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { AccountManager } from "../managers";

export class ParentManager extends TableManager {

    public async getParent(user: User): Promise<any> {
        // I only need to take sons (user is already taken)
        this.sql = 'SELECT * FROM "Parents" WHERE "UsersUsername" = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let sons = await this.getParentSons(user);
            if ((sons instanceof Error) || (sons instanceof CustomError)) {
                sons = []
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


    public async getParents(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Parents"'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let parentsArray = [];
            for (let row of this.result.rows) {
                // get parent
                req.query.username = row.UsersUsername;
                let accountManager = new AccountManager();
                let parent = await accountManager.getUser(req);
                // create parent
                let newParent = new Parent(
                    parent.username,
                    parent.email,
                    parent.role,
                    parent.firstName,
                    parent.lastName,
                    parent.sons
                )
                parentsArray.push(newParent);
            }
            this.result = parentsArray;
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

    private async getParentSons(user: User): Promise<any> {

        this.sql = 'SELECT * FROM "Students" WHERE "ParentsUsername" = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            let sonsArray = [];
            for (let row of this.result.rows) {
                // get son
                let username = row.UsersUsername
                let accountManager = new AccountManager();
                let son = await accountManager.getUserByUsername(username);
                sonsArray.push(son);
            }
            this.result = sonsArray;
        }

        return this.result
    }

}