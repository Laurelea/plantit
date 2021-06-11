const express = require("express");
const PORT = process.env.PORT || 3003;
const app = express();
// const router = express.Router();
const db = require('../db/dbConnect');
const routes = require ("./routes");

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

// app.use(router);
app.use('/', routes);

// app.use(
//     session({
//         secret: `some secret value`,
//         resave: false,
//         saveUninitialized: false,
//         store: new pgSession({
//             pool: db,
//             tableName: 'sessions'
//         }),
//         cookie: {maxAge: 1000 * 60 * 60 * 24}
//     })
// )
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
