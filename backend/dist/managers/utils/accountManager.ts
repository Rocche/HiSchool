// import utils
import * as bcrypt from "bcrypt"
import { Request } from "express"

// import models and managers
import { User, UserAuth, CustomError, Parent, Subject } from "../../models/models";
import { ParentManager, StudentManager, TeacherManager } from "../managers";
import { TableManager } from "./tableManager";
import { isNull } from "util";
import { SubjectManager } from "../school/subjectManager";

export class AccountManager extends TableManager {

    public async getUser(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Users" WHERE username = $1'
        this.params = [
            req.query.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let user = new User(
                this.result.rows[0].username,
                this.result.rows[0].email,
                this.result.rows[0].firstName,
                this.result.rows[0].lastName,
                this.result.rows[0].role
            )
            this.result = user
        }
        // get addictional user information from the right table
        if (!(this.result instanceof Error) && !(this.result instanceof CustomError)) {
            switch (this.result.role) {
                case "STUDENT": {
                    let studentManager = new StudentManager();
                    this.result = await studentManager.getStudent(this.result)
                    break;
                }
                case "TEACHER": {
                    let teacherManager = new TeacherManager();
                    this.result = await teacherManager.getTeacher(this.result)
                    break;
                }
                case "PARENT": {
                    let parentManager = new ParentManager()
                    this.result = await parentManager.getParent(this.result)
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
            return this.result
        }
    }

    public async getUserByUsername(username: string): Promise<any> {

        this.sql = 'SELECT * FROM "Users" WHERE username = $1'
        this.params = [
            username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let user = new User(
                this.result.rows[0].username,
                this.result.rows[0].email,
                this.result.rows[0].firstName,
                this.result.rows[0].lastName,
                this.result.rows[0].role
            )
            this.result = user
        }
        // get addictional user information from the right table
        if (!(this.result instanceof Error) && !(this.result instanceof CustomError)) {
            switch (this.result.role) {
                case "STUDENT": {
                    let studentManager = new StudentManager();
                    this.result = await studentManager.getStudent(this.result)
                    break;
                }
                case "TEACHER": {
                    let teacherManager = new TeacherManager();
                    this.result = await teacherManager.getTeacher(this.result)
                    break;
                }
                case "PARENT": {
                    let parentManager = new ParentManager()
                    this.result = await parentManager.getParent(this.result)
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
            return this.result
        }
    }

    public async postUser(req: Request): Promise<any> {

        // check if the role of the new user is correct
        this.result = await this.checkUserRole(req)
        if ((this.result instanceof Error) || (this.result instanceof CustomError)) {
            return this.result
        }

        // check if the user is already on the db
        this.result = await this.getUser(req)
        if (this.result instanceof User) {
            this.error.name = "DB ERROR"
            this.error.details = "user already present in the database"
            return this.error
        }

        // add user to the users table
        this.sql = 'INSERT INTO "Users" ( username, password, email, "firstName", "lastName", role ) VALUES ($1,$2,$3,$4,$5,$6)'
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
                    let studentManager = new StudentManager()
                    this.result = await studentManager.postStudent(req)
                    break;
                }
                case "TEACHER": {
                    let teacherManager = new TeacherManager()
                    this.result = await teacherManager.postTeacher(req)
                    break;
                }
                case "PARENT": {
                    let parentManager = new ParentManager()
                    this.result = await parentManager.postParent(req)
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
        return this.result

    }

    private async checkParent(parent: User): Promise<any> {

        let parentManager = new ParentManager;
        this.result = await parentManager.getParent(parent)
        if (!(this.result instanceof Parent)) {
            this.error = new CustomError(
                "PARENT ERROR",
                "Parent not found"
            )
            return this.error
        }
        return this.result
    }

    private async checkSubject(req: Request): Promise<any> {

        let subjectManager = new SubjectManager;
        this.result = await subjectManager.getSubject(req)
        if (!(this.result instanceof Subject)) {
            this.error = new CustomError(
                "SUBJECT ERROR",
                "Subject not found"
            )
            return this.error
        }
        return this.result
    }


    private checkUserRole(req: Request): any {
        switch (req.body.role) {
            case "STUDENT": {
                if (req.body.parent == null) {
                    this.error.name = "PARAMS ERROR"
                    this.error.details = "parent parameter null or misspelled"
                    return this.error
                } else {
                    let parent = new User(
                        req.body.parent.username,
                        req.body.parent.email,
                        req.body.parent.firstName,
                        req.body.parent.lastName,
                        req.body.parent.role
                    )
                    this.result = this.checkParent(parent)
                    return this.result
                }
            }
            case "TEACHER": {
                if (req.body.subjects == null) {
                    this.error.name = "PARAMS ERROR"
                    this.error.details = "subjects parameter null or misspelled"
                    return this.error
                } else {
                    req.body.subjects.forEach(async subject => {
                        req.query.id = subject.id
                        this.result = await this.checkSubject(req)
                        if (!(this.result instanceof Subject)) {
                            return this.result
                        }
                    });
                    return this.result
                }
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

    public async getUserAuth(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Users" WHERE username = $1'
        this.params = [
            req.body.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            let user = new UserAuth(
                this.result.rows[0].username,
                this.result.rows[0].password,
                this.result.rows[0].email,
                this.result.rows[0].firstName,
                this.result.rows[0].lastName,
                this.result.rows[0].role
            )
            this.result = user
        }
        return this.result
    }

}