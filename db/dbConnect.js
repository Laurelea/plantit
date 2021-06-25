const Pool = require('pg').Pool
const db = new Pool({
    user: 'gsoxtcmgsqbxbi',
    host: 'ec2-99-80-200-225.eu-west-1.compute.amazonaws.com',
    database: 'dbfo3d84h3ca49',
    password: '42bd9db46f114e1424c2180635a13daf02b6e08cc8383dcf2ba8973748870b85',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = db
