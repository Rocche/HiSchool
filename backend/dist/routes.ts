import { Request, Response } from 'express'
import { CustomError, LessonHour, Teacher, Subject, Role, PersonalNotice, Notice, NoticeType, NoticeStatus } from './models/models'
import * as managers from './managers/managers'
import * as path from 'path'

module.exports = function (app, passport) {

    // variable used for the responses
    var serverResponse: any

    // initialize all the tables managers
    var accountManager = new managers.AccountManager;
    var noticeManager = new managers.NoticeManager;
    var personalNoticeManager = new managers.PersonalNoticeManager;
    var logManager = new managers.LogManager;
    var reportManager = new managers.ReportManager;
    var lessonHourManager = new managers.LessonHourManager;
    var timeTableManager = new managers.TimeTableManager;
    var teacherAbsenceManager = new managers.TeacherAbsenceManager;
    var meetingHourManager = new managers.MeetingHourManager;
    var meetingManager = new managers.MeetingManager;
    var subjectManager = new managers.SubjectManager;

    //------------------------ UNAUTHORIZED RESPONSE MESSAGES --------------------------//
    function sendUnauthorizedResponse(res: Response) {
        res.status(401).send({ ErrorMessage: 'You are not authorized to call this function' })
    }

    //------------------------ LOGIN RESPONSE MESSAGES --------------------------------//
    function handleLoginResponse(res: Response, serverResponse: any) {
        if (serverResponse instanceof Error) {
            return res.status(500).send({ ErrorMessage: serverResponse })
        }
        if (serverResponse instanceof CustomError) {
            return res.status(404).send({ ErrorMessage: serverResponse })
        }
        res.status(200).send({ ServerResponse: serverResponse })
    }

    //------------------------ SERVER RESPONSE HANDLER ------------------------//
    function sendServerResponse(req: Request, res: Response, serverResponse: any) {
        switch (req.method) {
            //------------------------GET RESPONSE MESSAGES--------------------------//
            case 'GET': {
                // standard response message
                let stdGetErrMsg = 'Error: could not find any result for input data.'
                // if serverResponse has not been istantiated, return ErrorMessage
                if (!serverResponse) {
                    res.status(500).send({ ErrorMessage: stdGetErrMsg })
                    return
                }
                // if serverResponse is a custom error, return it to show the error
                if (serverResponse instanceof CustomError) {
                    res.status(500).send({ ErrorMessage: serverResponse })
                    return
                }
                // if serverResponse is an error, return it to show the error
                if (serverResponse instanceof Error) {
                    res.status(500).send(serverResponse)
                    return
                }
                // else return it to show the data
                res.status(200).send(serverResponse)
                return
            }
            //------------------------POST RESPONSE MESSAGES--------------------------//
            case 'POST': {
                // standard response messages
                let stdPostErrMsg = 'Error: could not update database with input data.'
                let stdPostSuccessMsg = 'Success: data correctly added to the database'
                // if serverResponse is an error, return it to show the error
                if (serverResponse instanceof Error) {
                    res.status(500).send({ ErrorMessage: serverResponse })
                    return
                }
                // if serverResponse is a custom error, return it to show the error
                if (serverResponse instanceof CustomError) {
                    res.status(500).send({ ErrorMessage: serverResponse })
                    return
                }
                // if serverResponse has been instantiated (and not an error), return SuccessMessage
                if (serverResponse) {
                    res.status(200).send({ SuccessMessage: stdPostSuccessMsg, ServerResponse: serverResponse })
                    return
                }
                // else, return standar error message
                res.status(500).send({ ErrorMessage: stdPostErrMsg })
                return
            }
            //------------------------UPDATE RESPONSE MESSAGES--------------------------//
            case 'UPDATE': {
                // standard response messages
                let stdUpdateErrMsg = 'Error: could not update database with input data.'
                let stdUpdateSuccessMsg = 'Success: data correctly updated into the database'
                // if serverResponse is an error, return it to show the error
                if (serverResponse instanceof Error) {
                    res.status(500).send({ ErrorMessage: serverResponse })
                    return
                }
                // if serverResponse is a custom error, return it to show the error
                if (serverResponse instanceof CustomError) {
                    res.status(500).send({ ErrorMessage: serverResponse })
                    return
                }
                // if serverResponse has been instantiated (and not an error), return SuccessMessage
                if (serverResponse) {
                    res.status(200).send({ SuccessMessage: stdUpdateSuccessMsg, ServerResponse: serverResponse })
                    return
                }
                // else, return standar error message
                res.status(500).send({ ErrorMessage: stdUpdateErrMsg })
                return
            }
            //------------------------DELETE RESPONSE MESSAGES--------------------------//
            case 'DELETE': {
                // standard response message
                let stdDeleteErrMsg = 'Error: could not delete input data.'
                let stdDeleteSuccessMsg = 'Success: data correctly deleted from the database'
                // if serverResponse is an error, return it to show the error
                if (serverResponse instanceof Error) {
                    res.status(500).send({ ErrorMessage: serverResponse })
                    return
                }
                // if serverResponse is a custom error, return it to show the error
                if (serverResponse instanceof CustomError) {
                    res.status(500).send({ ErrorMessage: serverResponse })
                    return
                }
                // if serverResponse has been instantiated (and not an error), return SuccessMessage
                if (serverResponse) {
                    res.status(200).send({ SuccessMessage: stdDeleteSuccessMsg })
                    return
                }
                // else, return standar error message
                res.status(500).send({ ErrorMessage: stdDeleteErrMsg })
            }
            default: {
                return res.status(500).send({ ErrorMessage: 'Could not manage server response' })
            }
        }
    }

    /*
    //-----------------------------------------------------APPLICATION-------------------------------------------//
    app.get(/^((?!\/api).)*$/, (req: Request, res: Response, next) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    })
    */

    //------------------------------------------------------/api/login-------------------------------------------//
    // GET login
    app.get('/api/login', function (req: Request, res: Response) {
        if (req.isAuthenticated()) {
            res.status(200).send({ SuccessMessage: 'Congrats, you are authenticated', User: req.user })
        }
        else {
            res.status(200).send({ ErrorMessage: 'Damn, you are not authenticated' })
        }
    })

    //POST login
    app.post('/api/login', loginRedirect, function (req: Request, res: Response, next: any) {
        passport.authenticate('local-login', { failureFlash: true }, (err, user) => {
            // if an error occurs while trying to authenticate the user, return the error
            if (err) { return handleLoginResponse(res, err) }
            // if user has been found and password matches, attemp to log in
            if (user) {
                req.login(user, function (err) {
                    // if an error occurs in the login function, return the error
                    if (err) {
                        console.log(err)
                        return handleLoginResponse(res, err)
                    }
                    // if authenticated, return the user's role
                    else handleLoginResponse(res, req.user.role)
                })
            }
        })(req, res, next)
    })

    //------------------------------------------------------/api/logout-------------------------------------------//
    //GET logout
    app.get('/api/logout', isLoggedIn, function (req, res) {
        if (!(req.isAuthenticated())) {
            res.status(500)
                .send({ ErrorMessage: 'You have to be logged in to log out' })
            return
        }
        req.logout()
        if (!(req.isAuthenticated())) {
            res.status(200)
                .clearCookie('connect.sid', { path: '/' })
                .send({ SuccessMessage: 'Successfully logged out' })
        } else {
            res.status(500)
                .send({ ErrorMessage: 'Error encountered while attemping to log out' })
        }
    })

    //------------------------------------------------------/api/user-------------------------------------------//
    // GET user
    app.get('/api/user', async (req: Request, res: Response) => {
        try {
            serverResponse = await accountManager.getUser(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // POST user
    app.post('/api/user', async (req: Request, res: Response) => {
        try {
            serverResponse = await accountManager.postUser(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/notice-------------------------------------------//
    // GET notice
    app.get('/api/notice', async (req: Request, res: Response) => {
        try {
            serverResponse = await noticeManager.getNotice(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // POST notice
    app.post('/api/notice', async (req: Request, res: Response) => {
        try {
            serverResponse = await noticeManager.postNotice(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET noticeboard
    app.get('/api/noticeBoard', async (req: Request, res: Response) => {
        try {
            serverResponse = await noticeManager.getNoticeBoard(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/personalNotice-------------------------------------------//
    // GET personalNotice
    app.get('/api/personalNotice', async (req: Request, res: Response) => {
        try {
            serverResponse = await personalNoticeManager.getPersonalNotice(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET personalNotices
    app.get('/api/personalNotices', async (req: Request, res: Response) => {
        try {
            //serverResponse = await personalNoticeManager.getPersonalNotices(req)
            serverResponse = [
                new PersonalNotice('0', new Date('29-01-1997'), 'student', new Notice('0', new Date('29-01-1997'), NoticeType.Standard, 'bomb', 'BOOOOM'), NoticeStatus.Unsigned),
                new PersonalNotice('0', new Date('30-01-1997'), 'student', new Notice('0', new Date('30-01-1997'), NoticeType.Authorization, 'sbanf', 'SBAAAAAANF'), NoticeStatus.Unsigned)
            ]
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/log-------------------------------------------//
    // GET log
    app.get('/api/log', async (req: Request, res: Response) => {
        try {
            serverResponse = await logManager.getLog(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET logs
    app.get('/api/logs', async (req: Request, res: Response) => {
        try {
            serverResponse = await logManager.getLogs(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    //------------------------------------------------------/api/report-------------------------------------------//
    // GET report
    app.get('/api/report', async (req: Request, res: Response) => {
        try {
            serverResponse = await reportManager.getReport(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // POST report
    app.post('/api/report', async (req: Request, res: Response) => {
        try {
            serverResponse = await reportManager.postReport(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET reports
    app.get('/api/reports', async (req: Request, res: Response) => {
        try {
            serverResponse = await reportManager.getReports(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/lessonHour-------------------------------------------//
    // GET lessonHour
    app.get('/api/lessonHour', async (req: Request, res: Response) => {
        try {
            serverResponse = await lessonHourManager.getLessonHour(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/TimeTable-------------------------------------------//
    // GET classTimeTable
    app.get('/api/classTimeTable', async (req: Request, res: Response) => {
        try {
            //serverResponse = await timeTableManager.getClassTimeTable(req)
            let lessons = [
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'), 0, 0),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),1, 0),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),2, 0),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),3, 0),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),4, 0),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),5, 0),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),0, 1),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),1, 1),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),2, 1),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),3, 1),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),4, 1),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),5, 1),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),0, 2),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),1, 2),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),2, 2),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),3, 2),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),4, 2),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),5, 2),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),0, 3),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),1, 3),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),2, 3),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),3, 3),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),4, 3),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),5, 3),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),0, 4),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),1, 4),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),2, 4),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),3, 4),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),4, 4),
                new LessonHour('0', '3A', new Teacher('pippo', 'p@p', Role.TEACHER, 'pippo', 'pippo', ['math']), new Subject('0', 'math'),5, 4)
              ]
              serverResponse = lessons
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET teacherTimeTable
    app.get('/api/teacherTimeTable', async (req: Request, res: Response) => {
        try {
            serverResponse = await timeTableManager.getTeacherTimeTable(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/teacherAbsence-------------------------------------------//
    // GET teacherAbsence
    app.get('/api/teacherAbsence', async (req: Request, res: Response) => {
        try {
            serverResponse = await teacherAbsenceManager.getTeacherAbsence(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // POST teacherAbsence
    app.post('/api/notice', async (req: Request, res: Response) => {
        try {
            serverResponse = await teacherAbsenceManager.postTeacherAbsence(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // UPDATE teacherAbsence
    app.put('/api/teacherAbsence', async (req: Request, res: Response) => {
        try {
            serverResponse = await teacherAbsenceManager.updateTeacherAbsence(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET teacherAbsences
    app.get('/api/teacherAbsences', async (req: Request, res: Response) => {
        try {
            serverResponse = await teacherAbsenceManager.getTeacherAbsences(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/meetingHour-------------------------------------------//
    // GET meetingHour
    app.get('/api/meetingHour', async (req: Request, res: Response) => {
        try {
            serverResponse = await meetingHourManager.getMeetingHour(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET meetingHours
    app.get('/api/meetingHours', async (req: Request, res: Response) => {
        try {
            serverResponse = await meetingHourManager.getMeetingHours(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/meeting-------------------------------------------//
    // GET meeting
    app.get('/api/meeting', async (req: Request, res: Response) => {
        try {
            serverResponse = await meetingManager.getMeeting(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // POST meeting
    app.post('/api/meeting', async (req: Request, res: Response) => {
        req.body.sender = req.user.username
        try {
            serverResponse = await meetingManager.postMeeting(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // DELETE meeting
    app.delete('/api/meeting', async (req: Request, res: Response) => {
        try {
            serverResponse = await meetingManager.deleteMeeting(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET meetings
    app.get('/api/meetings', async (req: Request, res: Response) => {
        try {
            serverResponse = await meetingManager.getMeetings(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    //------------------------------------------------------/api/subject-------------------------------------------//
    // GET subject
    app.get('/api/subject', async (req: Request, res: Response) => {
        try {
            serverResponse = await subjectManager.getSubject(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })
    // GET subjects
    app.get('/api/subjects', async (req: Request, res: Response) => {
        try {
            serverResponse = await subjectManager.getSubjects(req)
            sendServerResponse(req, res, serverResponse)
        }
        catch (err) {
            res.status(500)
                .send(err)
        }
    })

    // ==========================================================================================================================================================
    // ==============================================   OTHER FUNCTIONS   =======================================================================================
    // ==========================================================================================================================================================


    /*
    * routes middleware to check user is logged in
    */
    function loginRedirect(req, res, next) {
        // if authenticated, return error message
        if (req.isAuthenticated()) {
            return res.status(401)
                .send({ ServerResponse: 'You are already logged in' })
        }
        // check-in passed
        return next()
    }

    /*
    * routes middleware to ensure user is logged in
    */
    function isLoggedIn(req, res, next) {
        // if not authenticated, return error message
        if (!(req.isAuthenticated())) {
            return res.status(401)
                .send({ ErrorMessage: 'You need to be logged in to call this function' })
        }
        // check-in passed
        return next()
    }

    /*
    * check user's authorization to call function by checking role
    */
    async function isAuthorized(req, res, next) {

    }

}