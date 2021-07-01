const express = require("express");
// const cookieParser = require('cookie-parser')
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

// app.use(cookieParser())

app.use(
    session({
        genid: (req) => {
            // console.log('Inside the session middleware')
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
        cookie: {path: "/", maxAge: 7 * 24 * 3600 * 1000, httpOnly: false} //one week
    })
)

app.use(router);


parseCookie = async function (str, callback) {
    const myStr = await str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1]
                    .trim()
                    .replace(/[^.]*$/, '')
                    .replace(/.$/, '')
                    .replace(/^.{4}/, '')
                // .replace(/^.?(.*)/, '')
            );
            return acc;
        }, {});
    const result = await callback(myStr.SID)
    console.log("Result of callback:", result)
    return result
}

//test for server: HomePage Route For Server:

router.get("/", async (req, res) => {
    console.log("Server home page")
    res.render("index.html")
})

router.get("/api", async (req, res) => {
    console.log("Router /api req.protocol", req.protocol)
    // console.log("Cookie SID from req (browser): ", req.headers.cookie, "\n")
    let state = {
        isAuthenticated: false,
        message: "Hello from server!",
        userName: "Default",
        userEmail: "default",
    }
    // console.log("Printing state 1", state)

    checkAuthorization = async (SIDcookieValueInBrowser) => {
        try {
            //Если куки SID нет в браузере
            if (!SIDcookieValueInBrowser) {
                state.isAuthenticated = false;
                console.log("Printing state if no cookie:", state)

                throw new Error ("No SID cookie found in the browser")
            //Если есть:
            } else {
                const foundSession = await controller.lookForSameSID(SIDcookieValueInBrowser)
                // console.log("Number of cookies found:", foundSession.rows.length)
                // console.log("Found cookie:", foundSession)
                if (foundSession.rows.length ==0) {
                    state.isAuthenticated = false;
                    console.log("Printing state if no cookie in DB:", state)
                    throw new Error ("Browser cookie ID doesn't match anything in the DB")
                } else {
                    console.log("Changing state...", foundSession.rows[0].sess.userID)
                    state.isAuthenticated = true;
                    state.userName = foundSession.rows[0].sess.userName
                    state.userEmail = foundSession.rows[0].sess.userEmail
                    state.userID = foundSession.rows[0].sess.userID
                    state.numberOfPlants = foundSession.rows[0].sess.numberOfPlants
                    // console.log("State changed:", state)
                    return true
                }
            }
        } catch (err) {
            state.message = err.message.toString()
            console.log("Grand mistake:", state)

            console.log("Error while checking authorization: ", err)
            return err
        }
    }

    const callRoute = async function () {
        await parseCookie(req.headers.cookie, checkAuthorization)
        .then (() => {
            // console.log("Printing state before res", state)
            // console.log("Printing result in then", result)

            res.json({
                isAuthenticated: state.isAuthenticated,
                message: state.message,
                userName: state.userName,
                userEmail: state.userEmail,
                title: "From Server With Love",
                userID: state.userID,
                numberOfPlants: state.numberOfPlants
                // unqieID: uniqueID
            });
        })
        .catch(err => {
            console.log("Err from final catch in then - res", err)
    })
    }

    await callRoute()


});

//Выход
router.post("/api/logout", async (req, res) => {
    req.session.destroy()
    res.json({ isAuthenticated: false});
    // res.clearCookie("SID")
});

router.post("/api/auth", async (req, res) => {

    const {email, password} = req.body
        console.log("req.body: ", req.body)
        // console.log('Inside GET /login callback function', "\n")
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
                    const numberOfPlants = await controller.getNumberOfPlants(ifUser.rows[0].user_id)
                    console.log("Routes numberOfPlants", numberOfPlants)
                    //Create session in table session, return result - > its id

                    console.log("ifUser.rows[0] :", ifUser.rows[0])
                    req.session.userName = ifUser.rows[0].user_name
                    req.session.userEmail = ifUser.rows[0].email
                    req.session.isAuthenticated = true
                    req.session.userID = ifUser.rows[0].user_id
                    req.session.numberOfPlants = numberOfPlants

                    req.session.save(err => {
                        if (err) {
                            throw err
                        }
                        console.log("session saved", "\n")
                    })

                    // console.log("req.session.cookie: ", req.session.cookie, "\n")
                    // console.log("Debugging. Request:: ", req, "\n")
                    console.log("Auth route userName sent: ", req.session.userName, "\n")
                    res.json({
                        isAuthenticated: true,
                        message: "Authorization successful",
                        authUN: req.session.userName,
                        authEmail: req.session.userEmail,
                        sessID: req.sessionID,
                        cookie: req.session.cookie,
                        userID: req.session.userID,
                        numberOfPlants: numberOfPlants
                    })
                    // res.redirect("/")
                }
            }
        } catch (err) {
        console.log("Auth catch log:", err)
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

router.get("/api/getbase", async (req, res) => {
    const baseToShow = await controller.showDB()
    // console.log(baseToShow)
    res.send(baseToShow)
})

router.post("/api/addplant", async (req, res) => {
    // console.log("Req data to add:", req.data)
    console.log("Req body to add:", req.body)
    // console.log("Req body to add:", req.body.userID)
    const plantAdded = await controller.addPlant(req.body)
    console.log("Plant added: ", plantAdded)
    res.send(plantAdded)
})

router.get("/api/getNumberOfPlants", async(req, res) => {
    console.log("routes req.body.id", req.body.id)
    // console.log("routes req.body.id", req.body.data.id)
    // console.log("routes req.body.id", req.data.id)
    const result = await controller.getNumberOfPlants(req.body.id)
    res.send(result)
})

router.get("/api/vegs", async (req, res) => {
    const vegs = await controller.vegs()
    // console.log("Vegs from Routes")
    res.send(vegs)
})
router.get("/api/fruit", async (req, res) => {
    const fruit = await controller.fruit()
    // console.log("Fruit from Routes")
    res.send(fruit)
})
router.get("/api/herbs", async (req, res) => {
    const herbs = await controller.herbs()
    // console.log("Herbs from Routes")
    res.send(herbs)
})
router.get("/api/decs", async (req, res) => {
    const decs = await controller.decs()
    // console.log("Decs from Routes")
    res.send(decs)
})

module.exports = app