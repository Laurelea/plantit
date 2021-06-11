const express = require("express");
const cookieParser = require('cookie-parser')
// const router = express.Router();

//Подключаем модуль сессий, обязательно после кук
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const db = require('../db/dbConnect');

const {Router} = require("express")
const router = Router()

const controller = require('../db/controller')
// const bodyParser = require('body-parser');


const app = express();

const uuidv4 = require("uuidv4")

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))

app.use(cookieParser())

app.use(
    session({
        genid: (req) => {
            console.log('Inside the session middleware')
            return uuidv4.uuid() // use UUIDs for session IDs
        },
        name: "SID",
        secret: `that's a secret kitten`,
        resave: true,
        saveUninitialized: false,
        store: new pgSession({
            pool: db,
            tableName: 'sessions'
        }),
        cookie: {path: "/", maxAge: 1000 * 60 * 60 * 24}
    })
)

app.use(router);

//test for server: HomePage Route For Server:
router.get("/api", (req, res) => {
    console.log('Inside the homepage callback function')
    console.log("req.sessionID", req.sessionID)
    // console.log("Req to test", req)
    const uniqueID = uuidv4.uuid();
    res.json({
        message: "Hello from server!",
        username: "Lin",
        title: "From Server With Love",
        unqieID: uniqueID
    });

});

//logout делаем в Реакте его сессиями, сервер тут не нужен?
//Выход
router.get("/api/logout", (req, res) => {
    //Тут нужно стирать сессию из БД
    res.json({ isAuthenticated: false});
});

router.post("/api/auth", async (req, res) => {
            // console.log("Cookie from req: ", cookieParser.JSONCookies(req.cookies))
        console.log("Cookie sessID from req (browser): ", req.cookies.sessID)
        console.log("Cookie SID from req (browser): ", req.cookies.SID, "\n")


        const {email, password} = req.body
        console.log("req.body: ", req.body)
        console.log('Inside GET /login callback function', "\n")
        // console.log("Login req.sessionID", req.sessionID, "\n")
        // console.log("req.session: ", req.session, "\n")
        try {
            const ifUser = await controller.getUser(email)
            // console.log("ifUser.rows:", ifUser.rows)
            if (ifUser.rows.length == 0) {
                throw new Error("No such user")
                // res.json({isAuthenticated: false, message: err.message.toString()})
            } else {
                //Return T/F
                const passCheck = await controller.checkPass(password, ifUser.rows[0].password)
                console.log("passCheck: ", passCheck, "\n")
                if (!passCheck) {
                    throw new Error("Password incorrect")
                } else {

                    //Create session in table session, return result - > its id
                    //Add function getSessID for getting session ID

                    // console.log(ifUser.rows[0])
                    req.session.userName = ifUser.rows[0].user_name
                    req.session.userEmail = ifUser.rows[0].email
                    req.session.isAuthenticated = true

                    // req.universalCookies

                    // req.session.cookie.sessID = req.sessionID

                    req.session.save(err => {
                        if (err) {
                            throw err
                        }
                        console.log("session saved", "\n")
                    })

                    console.log("req.session.cookie: ", req.session.cookie, "\n")


                    res.json({
                        isAuthenticated: true,
                        message: "Authorization successful",
                        authUN: req.session.userName,
                        authEmail: req.session.userEmail,
                        sessID: req.sessionID,
                        cookie: req.session.cookie
                    })
                }
            }
        } catch (err) {
            res.json({isAuthenticated: false, message: err.message.toString()})
        }
    }
)

//Регистрация
router.post("/api/register", async (req, res) => {
    try {
        // console.log("post.req.body: ", req.body)
        const {username, password, email} = await req.body
        console.log("username, email:", username, email), "\n"
        const ifUser = await controller.getUser(email)
        const ifUN = await controller.getUserByUN(username)
        if (ifUser.rowCount != 0) {
            throw new Error('User email already exists')
        } else if (ifUN.rowCount != 0) {
            throw new Error('User Name already in use')
        } else {
            try {
                const newUser = await controller.addUser(username, password, email)
                // console.log("New user: ", newUser.rowCount)
                res.json({regSuccess: true, newUser: newUser, message: "User added to DB"})
                // res.redirect("/components")
            } catch (e) {
                console.log(e)
            }
        }
    } catch (e){
        res.json ({regSuccess: false, message: e.message.toString()})
        console.log (e)
    }
})
module.exports = app