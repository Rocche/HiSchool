import { Request, Response } from 'express'
import { CustomError } from './models/models'
import * as managers from './managers/managers'
import * as path from 'path'

module.exports = function (app, passport) {

    // variable used for the responses
    var serverResponse: any

    // initialize all the tables managers
    var accountManager = new managers.AccountManager

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

    //-----------------------------------------------------APPLICATION-------------------------------------------//
    app.get(/^((?!\/api).)*$/, (req: Request, res: Response, next) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
        res.send('barbaraann')
    })

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