const express = require("express");
const PORT = process.env.PORT || 3003;
const app = express();
const router = express.Router();
const db = require('../db/dbConnect')
const auth = require ("./auth")

//Подключаем модуль сессий:
const session = require(`express-session`)
const pgSession = require('connect-pg-simple')(session)



app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

app.use(router);
app.use('/', auth);
app.use(session ({
    secret: `some secret value`,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool: db,
        tableName: 'sessions'
    }),
    cookie: {maxAge: 1000 * 60 * 60 *24}
}))



router.get("/api", (req, res) => {
    res.json({ message: "Hello from server!", username: "Lin", title: "From Server With Love"});
});

// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });

async function start() {
    try {
        //Подключение БД:
        await db.connect((err) => {
            if (err) {
                // Передача ошибки в обработчик express
                return console.error('error fetching client from pool', err)
            }
        })
        //Это сам запуск сервера:
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log("Caught: ", e)
    }
    // db.end()
}
start()
