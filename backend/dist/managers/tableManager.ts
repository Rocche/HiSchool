
import DbManager from "../dbmanager"
import { CustomError } from "../models/customError"

export abstract class TableManager {

    // every table controller interacts with the dbmanager
    protected dbManager: DbManager = new DbManager()
    // every table controller will use an sql string for the queries
    protected sql: string = ""
    // every table controller will need some parameters for the queries
    protected params: any[] = []
    // every table controller will return a result, wich could also be an error
    protected result: any = null
    // used to handle some errors caused from the program
    protected error: CustomError = new CustomError()

} 