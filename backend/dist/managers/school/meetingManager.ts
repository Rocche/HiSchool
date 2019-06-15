import { Request } from "express"
import { MeetingHourManager, AccountManager, NoticeManager } from "../managers";
import { Meeting, NoticeType, CustomError } from "../../models/models";
import { v4 as uuid } from 'uuid';
import { TableManager } from "../utils/tableManager";

export class MeetingManager extends TableManager {

    public async getMeeting(req: Request): Promise<any> {
        this.sql = 'SELECT * FROM "Meetings" WHERE id = $1'
        this.params = [
            req.query.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get meetingHour information
            let meetingHourManager = new MeetingHourManager();
            req.query.id = this.result.rows[0].MeetingHoursId
            let meetingHour = await meetingHourManager.getMeetingHour(req)
            // get parent information
            let accountManager = new AccountManager();
            req.query.username = this.result.rows[0].ParentsUsername;
            let parent = await accountManager.getUser(req)
            // create meeting
            let meeting = new Meeting(
                this.result.rows[0].id,
                this.result.rows[0].date,
                meetingHour,
                parent,
            )
            this.result = meeting
            console.log(meeting)
        }
        return this.result
    }

    public async getMeetings(req: Request): Promise<any> {


        this.sql = 'SELECT ("Meetings".id AS id, "Meetings".date, "Meetings"."ParentsUsername", "Meetings"."MeetingHoursId", \
                            "MeetingHours".id AS meetinghoursid, "MeetingHours".hour, "MeetingHours"."dayOfWeek", "MeetingHours"."TeachersUsername") \
                            FROM "Meetings" INNER JOIN "MeetingHours" \
                            ON "Meetings"."MeetingHoursId" = "MeetingHours".id \
                            WHERE "MeetingHours"."TeachersUsername" = $1'
        this.params = [
            req.query.teacher
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {

            let meetingHourManager = new MeetingHourManager();
            let accountManager = new AccountManager()
            let meetingsArray = []

            for (let row of this.result.rows) {
                // get meetingHour information
                req.query.id = row.meetinghoursid
                let meetingHour = await meetingHourManager.getMeetingHour(req)
                // get parent information
                req.query.username = row.ParentsUsername;
                let parent = await accountManager.getUser(req)
                // create meeting
                let meeting = new Meeting(
                    row.id,
                    row.date,
                    meetingHour,
                    parent
                )
                meetingsArray.push(meeting)
            }
            this.result = meetingsArray
        }
        return this.result
    }

    public async postMeeting(req: Request): Promise<any> {

        let meetingID = uuid();
        this.sql = 'INSERT INTO "Meetings" ( id, date, "MeetingHoursId", "ParentsUsername" ) VALUES ($1,$2,$3,$4)'
        this.params = [
            meetingID,
            req.body.date,
            req.body.meetingHour.id,
            req.body.parent.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        if (!(this.result instanceof Error) && !(this.result instanceof CustomError)) {
            // send meeting request notice
            this.result = await this.sendMeetingRequestNotice(req)
        }

        return this.result
    }

    public async deleteMeeting(req: Request): Promise<any> {

        let meetingID = req.query.id
        // send meeting cancelling notice
        this.result = await this.sendMeetingCancellationNotice(req)

        this.sql = 'DELETE FROM "Meetings" WHERE id = $1'
        this.params = [
            meetingID
        ]
        this.result = await this.dbManager.deleteQuery(this.sql, this.params)

        return this.result

    }

    private async sendMeetingRequestNotice(req: Request): Promise<any> {
        // post a new notice regarding the new meeting request
        // create notice
        let strDate = new Date(req.body.date).toDateString()
        let noticeManager = new NoticeManager();
        req.body.type = NoticeType.Standard
        req.body.title = 'NEW MEETING'
        req.body.body = "Parent " + req.body.parent.firstName +
            " " + req.body.parent.lastName +
            " requested a meeting in date " + strDate +
            " and hour " + req.body.meetingHour.hour +
            ".";
        req.body.targets = [req.body.meetingHour.teacher]
        this.result = await noticeManager.postNotice(req)
        return this.result
    }

    private async sendMeetingCancellationNotice(req: Request): Promise<any> {
        console.log("send meeting cancellation")
        // post a new notice regarding the meeting cancellation
        // get meeting information
        let meeting = await this.getMeeting(req)
        if (meeting instanceof Error || meeting instanceof CustomError) {
            return meeting
        }
        // create notice
        let strDate = new Date(meeting.date).toDateString()
        let noticeManager = new NoticeManager();
        req.body.type = NoticeType.Standard
        req.body.title = 'MEETING CANCELLATION'
        req.body.body = "Teacher " + meeting.meetingHour.teacher.firstName +
            " " + meeting.meetingHour.teacher.lastName +
            " cancelled the meeting in date " + strDate +
            " and hour " + meeting.meetingHour.hour +
            ".";
        req.body.date = Date.now();
        req.body.targets = [meeting.parent.username]
        this.result = await noticeManager.postNotice(req)
        return this.result
    }
}