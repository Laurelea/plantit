const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const path = require("path")
const old_server = require('http').createServer(app);

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

old_server.listen(PORT, () => {
    console.log(old_server.address(), `Server is running on port ${PORT}`)
})