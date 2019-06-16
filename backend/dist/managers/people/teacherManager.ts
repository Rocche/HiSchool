import { Teacher, User } from "../../models/models"

import { Request } from "express"
import { TableManager } from "../utils/tableManager";
import { SubjectManager } from "../school/subjectManager";
import { AccountManager } from "../managers";

export class TeacherManager extends TableManager {

    public async getTeacher(user: User): Promise<any> {

        this.sql = 'SELECT * FROM "Teachers" WHERE "UsersUsername" = $1'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        if (this.result.rowCount > 0) {
            // get subjects information
            let subjects = await this.getTeacherSubjects(user)
            // create teacher
            let teacher = new Teacher(
                user.username,
                user.email,
                user.role,
                user.firstName,
                user.lastName,
                subjects
            )
            this.result = teacher
        }
        return this.result
    }

    public async getTeachers(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Teachers"'
        this.params = []
        this.result = await this.dbManager.getQuery(this.sql, this.params)
        
        if (this.result.rowCount > 0) {
            let teachers = [];
            for(let row of this.result.rows){
            // get subjects information
            let subjects = await this.getTeacherSubjects(row.UsersUsername)
            let accountManager = new AccountManager();
            req.query.username = row.UsersUsername;
            let teacher = await accountManager.getUser(req);
            // create teacher
            let newTeacher = new Teacher(
                teacher.username,
                teacher.email,
                teacher.role,
                teacher.firstName,
                teacher.lastName,
                subjects 
            )
            teachers.push(newTeacher);
            }
            this.result = teachers;
        }
        return this.result
    }

    public async postTeacher(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Teachers" ( "UsersUsername" ) VALUES ($1)'
        this.params = [
            req.body.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        req.body.subjects.forEach(async subject => {
            req.body.id = subject.id
            this.result = await this.postTS(req)
        });
        return this.result

    }

    public async postTS(req: Request): Promise<any> {

        this.sql = 'INSERT INTO "Teaches" ( "TeachersUsername", "SubjectsId" ) VALUES ($1, $2)'
        this.params = [
            req.body.username,
            req.body.id
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        return this.result

    }

    public async getTeacherSubjects(user: User): Promise<any> {

        this.sql = 'SELECT ("SubjectsId") FROM "Teaches" WHERE "TeachersUsername" = $1 GROUP BY "SubjectsId"'
        this.params = [
            user.username
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let branchManager = new SubjectManager();
            let subjectsArray = []

            for (let row of this.result.rows) {
                // get subject information
                let id = row.SubjectsId
                let subject = await branchManager.getSubjectById(id)
                // push result into array
                subjectsArray.push(subject)
            }
            this.result = subjectsArray
        }

        return this.result

    }

}