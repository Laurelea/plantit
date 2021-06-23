const {Client} = require('pg')
const pg = new Client({
    user: 'laurelea',
    host: 'localhost',
    database: 'mddb',
    password: 'qwerty',
    port: 5432,
})

module.exports = pg