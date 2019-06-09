import * as bcrypt from "bcrypt"
import { User } from "../models/user";
import { CustomError } from "../models/customError"

import { Request } from "express"
import { TableManager } from "./tableManager";

export class AccountManager extends TableManager {

    public async getUser(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM users WHERE username = $1'
        this.params = [
            req.body.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let user = new User(
                this.result.rows[0].username,
                this.result.rows[0].password,
                this.result.rows[0].email,
                this.result.rows[0].role,
                this.result.rows[0].firstName,
                this.result.rows[0].lastName,
            )
            this.result = user
        }
        return this.result
    }

    public async postUser(req: Request): Promise<any> {

        // check if the role of the new user is correct
        this.result = this.checkUserRole(req)
        if ((this.result instanceof Error) || (this.result instanceof CustomError)) {
            return this.result
        }

        // check if the user is already on the db
        if (this.getUser(req.body.username) instanceof User) {
            this.error.name = "DB ERROR"
            this.error.details = "user already present in the database"
            return false
        }

        // add user to the users table
        this.sql = "INSERT INTO users ( username, password, email, firstName, lastName, role ) VALUES ($1,$2,$3,$4,$5,$6)"
        this.params = [
            req.body.username,
            bcrypt.hashSync(req.body.password, 8),
            req.body.email,
            req.body.firstName,
            req.body.lastName,
            req.body.role
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        // add the new user to the right table
        if (!(this.result instanceof Error) && !(this.result instanceof CustomError)) {
            switch (req.body.role) {
                case "STUDENT": {
                    //statements
                    break; 
                }
                case "TEACHER": {
                    //statements; 
                    break; 
                }
                case "PARENT": {
                    //statements; 
                    break; 
                }
                case "SECRETARY": {
                    //statements; 
                    break; 
                }
                case "ADMINISTRATOR": {
                    //statements; 
                    break; 
                } default: {
                    this.error.name = "ROLE ERROR"
                    this.error.details = "user role incorrect"
                    return this.error
                }
            }
        }

    }

    private checkUserRole (req:Request): any{
        switch (req.body.role) {
            case "STUDENT": {
                //statements
                break; 
            }
            case "TEACHER": {
                //statements; 
                break; 
            }
            case "PARENT": {
                //statements; 
                break; 
            }
            case "SECRETARY": {
                //statements; 
                break; 
            }
            case "ADMINISTRATOR": {
                //statements; 
                break; 
            } default: {
                this.error.name = "ROLE ERROR"
                this.error.details = "user role incorrect"
                return this.error
            }
        }
        return null
    }

}