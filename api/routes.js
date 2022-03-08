const express = require("express");
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./dbConnect');
const {Router} = require("express")
const router = Router()
const controller = require('./controller')
const app = express();
const uuidv4 = require("uuidv4")
const cors = require("cors");


app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(
    session({
        genid: (req) => {
            // console.log('21 session', session())
            return uuidv4.uuid() // use UUIDs for session IDs
        },
        name: "SID",
        secret: `that's a secret kitten`,
        resave: false,
        saveUninitialized: false,
        store: new pgSession({
            pool: db,
            tableName: 'sessions'
        }),
        cookie: {path: "/", maxAge: 7 * 24 * 3600 * 1000, httpOnly: false} //one week
    })
)

const corsOptions = {
    //To allow requests from client
    origin: [
        "http://localhost:3000",
        "http://127.0.1.1:3000",
        "http://127.0.1.1:8080",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
};

app.use("/", cors(corsOptions), router);

router.get("/", async (req, res) => {
    console.log("Server home page")
    res.render("index.html")
})

const parseCookie = async (cookie) => {
    console.log('54 parseCookie cookie:', cookie)
    if (!cookie) {
        console.log('55 no cookie')
        return { sessID: undefined, error: "No SID cookie found in the browser" }
    } else {
        const myStr = await cookie
            .split('=')
            .pop()
        console.log('62 myStr', myStr)
        return { sessID: myStr, error: undefined }
    }
}

router.get("/api", async (req, res) => {
    console.log('44 req.sessionID:', req.sessionID) // Откуда это берется?????
    // console.log('45 req.session:', req.session)
    console.log('46 req.headers.authorization:', req.headers.authorization) //Это правильный айди сессии из куки браузера
    let state = {
        isAuthenticated: false,
        message: "Hello from server!",
        userName: "Default",
        userEmail: "default",
    }
    const checkAuthorization = async (sid) => {
        // console.log('95 checkAuth value to check in DB:', sid)
        await controller.lookForSameSID(sid)
            .then(response => {
                if (response.rows.length == 0) {
                    state.isAuthenticated = false;
                    console.log("Printing state if no cookie in DB:", state)
                    throw new Error("Browser cookie ID doesn't match anything in the DB")
                } else {
                    console.log("Changing state...", response.rows[0].sess.userID)
                    state.isAuthenticated = true;
                    state.userName = response.rows[0].sess.userName
                    state.userEmail = response.rows[0].sess.userEmail
                    state.userID = response.rows[0].sess.userID
                    state.numberOfPlants = response.rows[0].sess.numberOfPlants
                    return true
                }
            })
            .catch((err) => {
                state.message = err.message.toString()
                console.log("Error while checking authorization: ", err)
                return false
            })
    }

    const callRoute = async () => {
        await parseCookie(req.headers.authorization)
            .then(({ sessID, error }) => {
                console.log('109 callRoute sessID, error', sessID, error)
                if (error) {
                    console.log('111 got error')
                    state.message = error.toString()
                } else {
                    checkAuthorization(sessID)
                        .then((result) => {
                            console.log("114 checkAuthorization result", result)
                        })
                        .then(() => {
                            res.json({
                                isAuthenticated: state.isAuthenticated,
                                message: state.message,
                                userName: state.userName,
                                userEmail: state.userEmail,
                                title: "From Server With Love",
                                userID: state.userID,
                                numberOfPlants: state.numberOfPlants
                            });
                        })
                        .catch(err => {
                            console.log("117 err in checkAuthorization", err)
                        })
                }
        })
    }
    await callRoute()
});

//Выход
router.post("/api/logout", async (req, res) => {
    console.log('143 logout triggered!!')
    await parseCookie(req.headers.authorization)
        .then(({ sessID, error }) => {
            if (error) {
                throw new Error('153 Error parsing cookie in logout')
            } else {
                controller.delSession(sessID)
            }
        })
        .then(() => {
           req.session.destroy()
        })
        .then(() => {
           res.json({ isAuthenticated: false});
        })
         .catch(err => {
            console.log('147 logout err', err)
        })
});


router.post("/api/auth", async (req, res) => {
    // console.log('153 req.headers', Object.keys(req))
    const { email, password } = req.body
        console.log("req.body: ", req.body)
        try {
            const ifUser = await controller.getUser(email)
            // console.log("ifUser.rows:", ifUser.rows)
            if (ifUser.rows.length === 0) {
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
                    // console.log("Routes numberOfPlants", numberOfPlants)
                    //Create session in table session, return result - > its id

                    req.session.userName = ifUser.rows[0].user_name
                    req.session.userEmail = ifUser.rows[0].email
                    req.session.isAuthenticated = true
                    req.session.userID = ifUser.rows[0].user_id
                    req.session.numberOfPlants = numberOfPlants

                    // console.log('169 req.session', req.session)

                    await req.session.save(err => {
                        if (err) {
                            throw err
                        }
                        console.log("session saved", "\n")
                        console.log("191 req.session.sessionID: ", req.sessionID, "\n")
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
                    })
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
        if (ifUser.rowCount !== 0) {
            throw new Error('User email already exists')
        } else if (ifUN.rowCount !== 0) {
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
    // console.log('243 /api/getbase', baseToShow)
    res.send(baseToShow)
})

router.post("/api/addplant", async (req, res) => {
    const plantAdded = await controller.addPlant(req.body)
    // console.log("Plant added: ", plantAdded)
    res.send(plantAdded)
})

router.post("/api/getNumberOfPlants", async(req, res) => {
    console.log("routes getNumberOfPlants req.body.id", req.body.id)
    const result = await controller.getNumberOfPlants(req.body.id)
    console.log("routes getNumberOfPlants result: ", result)
    res.json(result)
})

router.get("/api/getCats", async(req, res) => {
    const result = await controller.getCats()
    // console.log('262 inside router getCats', result)
    res.json(result)
})

module.exports = app
