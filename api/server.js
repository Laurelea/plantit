const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./dbConnect');
const routes = require ("./routes");
const path = require("path");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers', '*');
    next();
});

// app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

app.use('/', routes);

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


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const start = async () => {
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
        server.listen(process.env.PORT || 8080, () => {
            console.log(server.address(), `Server is running on port ${PORT}`)
            require('dns').lookup(require('os').hostname(), function (err, add, fam) {
                console.log('addr: ' + add);
            })
        })
    } catch (e) {
        console.log("Caught: ", e)
    }
    // api.end()
}
start()

