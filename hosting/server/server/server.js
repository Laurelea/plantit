const express = require("express");
const PORT = process.env.PORT || 3003;
const app = express();
const db = require('../db/dbConnect');
const routes = require ("./routes");
const path = require("path");
//Logs:
// const pino = require('pino')
// const expressPino = require('express-pino-logger')
// const logger = pino({level: process.env.LOG_LEVEL || 'info'})
// const expressLoger = expressPino({logger})
//End Logs

app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'http')
            res.redirect(`http://${req.header('host')}${req.url}`)
        else
            next()
    }
)

app.use(express.static(path.join(__dirname, '../client')));

// app.use(express.static('../../client/public'));
// app.use(express.static('src'));

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

//Logs
// app.use(expressLoger)
//End logs

app.use('/', routes);
// app.use((req, res, next) => {
//     // console.log('%0', req)
// })

const server = require('http').createServer(app);


const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }

});

let numberOfUsers = 0;

io.on('connection', (socket) => {

    console.log('a user connected');
    numberOfUsers  += 1;
    socket.username = "Guest";

    socket.on('set_username', data => {
        console.log("Got from server:", data.username)
        socket.username = data.username
        io.sockets.emit('user_connected', {username: socket.username, number: numberOfUsers})
    })

    socket.on('disconnect', () => {
        numberOfUsers  -= 1;
        console.log (`Всего юзеров: `+ numberOfUsers)
        console.log('user disconnected');

        io.emit('user_disconnected', {username : socket.username, number: numberOfUsers})
        console.log(socket.username +' disconnected')
    });
    // Это слушатель событий. Общий вид: socket.on(eventName, listener)
    // Получает с сокета клиента инфу о событии и массив данных
    // socket.on('change_username', (data) => {
    //     console.log(socket.username + ' change username on ' + data.username)
    //     socket.username = data.username
    //     // io.sockets.emit ("", {});
    //
    //     //io.emit - трансляция абсолютно всем участникам, в том числе тому, кто вызывает событие.
    //     io.emit('new', {username : socket.username, number: numberOfUsers})
    //     console.log(socket.username +' new user')
    // });
    socket.on('new_message', (data) => {
        //Это выводится в браузере:
        io.sockets.emit('add_message', {message : data.message, username : socket.username, className:data.className});
        console.log(socket.username +' send message ' + data.message)
    });
    socket.on('typing', (data) => {
        //broadcast означает, что сообщение покажут всем участникам, кроме того, кто печатает: (вызывает событие). Это тоже выводится в браузере:
        socket.broadcast.emit('typing', {username : socket.username})
        console.log(socket.username +' typing')
    });
});




async function start() {
    try {
        //Подключение БД:
        await db.connect((err) => {
            console.log("DB!")
            if (err) {
                // Передача ошибки в обработчик express
                return console.error('error fetching client from pool', err)
            }
        })
        //Это сам запуск сервера:
        // server.listen(PORT, () => {
        server.listen(PORT, "localhost", () => {
            console.log(server.address(), `Server is running on port ${PORT}`)
            require('dns').lookup(require('os').hostname(), function (err, add, fam) {
                console.log('addr: ' + add);
            })
        })
    } catch (e) {
        console.log("Caught: ", e)
    }
    // db.end()
}
start()

