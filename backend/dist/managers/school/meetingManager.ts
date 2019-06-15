import { Request } from "express"
import { MeetingHourManager, AccountManager, NoticeManager  } from "../managers";
import { Meeting, NoticeType } from "../../models/models";
import { v4 as uuid } from 'uuid';
import { TableManager } from "../utils/tableManager";

export class MeetingManager extends TableManager {

    public async getMeeting(req: Request): Promise<any> {

        this.sql = 'SELECT * FROM "Meetings" WHERE id = $1'
        this.params = [
            req.body.id
        ]
        this.result = await this.dbManager.getQuery(this.sql, this.params)

        if (this.result.rowCount > 0) {
            // get meetingHour information
            let meetingHourManager = new MeetingHourManager();
            req.body.id = this.result.rows[0].MeetingHoursId
            let meetingHour = await meetingHourManager.getMeetingHour(req)
            // get parent information
            let accountManager = new AccountManager();
            req.body.username = this.result.rows[0].ParentsId;
            let parent = await accountManager.getUser(req)
            // create meeting
            let meeting = new Meeting(
                this.result.rows[0].id,
                this.result.rows[0].date,
                meetingHour,
                parent,
            )
            this.result = meeting
        }
        return this.result
    }

    public async getMeetings(req: Request): Promise<any> {


        this.sql = 'SELECT * FROM "Meetings" INNER JOIN "MeetingHours" ON "Meetings"."MeetingHoursId" = "MeetingHours".id WHERE "MeetingHours"."TeachersUsername" = $1'
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
                req.query.id = row.MeetingHoursId
                let meetingHour = await meetingHourManager.getMeetingHour(req)
                // get parent information
                req.query.username = row.ParentsUsername;
                let parent = await accountManager.getUser(req)
                // create meeting
                let meeting= new Meeting(
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
        this.sql = 'INSERT INTO "Meetings" ( id, date, "MeetingHourId", "ParentsUsername" ) VALUES ($1,$2,$3,$4)'
        this.params = [
            meetingID,
            req.body.date,
            req.body.meetingHour.id,
            req.body.parent.username,
        ]
        this.result = await this.dbManager.postQuery(this.sql, this.params)

        // send meeting request notice
        this.result = await this.sendMeetingRequestNotice(req)

        return this.result
    }

    public async deleteMeeting(req: Request): Promise<any>{

        let meetingID = req.body.ID
        // send meeting cancelling notice
        this.result = await this.sendMeetingCancellationNotice(req)

        this.sql = 'DELETE FROM "Meetings" WHERE id = $1'
        this.params = [
            meetingID
        ]
        this.result = await this.dbManager.deleteQuery(this.sql,this.params)
        
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
<<<<<<< HEAD
                        " requested a meeting in date " + req.body.date.toDateString() +
=======
                        " requested a meeting in date " + strDate +
>>>>>>> 0048f3f482773c2d182fedf161044f85c8d8869f
                        " and hour " + req.body.meetingHour.hour +
                        ".";
        req.body.targets = [req.body.meetingHour.teacher]
        this.result = await noticeManager.postNotice(req)
        return this.result
    }

    private async sendMeetingCancellationNotice(req: Request): Promise<any> {

        // post a new notice regarding the meeting cancellation
        // get meeting information
        let meeting = await this.getMeeting(req)
        // create notice
        let strDate = new Date(meeting.date).toDateString()
        let noticeManager = new NoticeManager();
        req.body.type = NoticeType.Standard
        req.body.title = 'MEETING CANCELLATION'
        req.body.body = "Teacher " + meeting.meetingHour.teacher.firstName +
                        " " + meeting.meetingHour.teacher.lastName +
<<<<<<< HEAD
                        " cancelled the meeting in date " + meeting.date.toDateString() +
=======
                        " cancelled the meeting in date " + strDate +
>>>>>>> 0048f3f482773c2d182fedf161044f85c8d8869f
                        " and hour " + meeting.meetingHour.hour +
                        ".";
        req.body.date = Date.now();
        req.body.targets = [meeting.parent.username]
        this.result = await noticeManager.postNotice(req)
        return this.result
    }
}