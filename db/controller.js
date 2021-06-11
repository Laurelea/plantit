const db = require('./dbConnect')
const bcrypt = require('bcrypt')

module.exports.getUser = async function (email) {
    // console.log('Email to check: ', email)
    const ifUser = await db.query('SELECT * FROM users WHERE email=$1', [email])
    // console.log(ifUser, ifUser.rows.length)
    return ifUser
}

// module.exports.getUserName = async function (username) {
//     console.log('Email to check: ', username)
//     const ifUNexists = await db.query('SELECT * FROM users WHERE user_name=$1', [username])
//     console.log(ifUNexists.rows.length)
//     return ifUNexists
// }consol

// module.exports.getUserByID = async function (id) {
//     console.log('ID to check: ', id)
//     const ifUser = await db.query('SELECT * FROM users WHERE id=$1', [id])
//     console.log("ifUser.rows.length: ", ifUser.rows.length)
//     return ifUser
// }

module.exports.getUserByUN = async function (username) {
    console.log('UN to check: ', username)
    const ifUN = await db.query('SELECT * FROM users WHERE user_name=$1', [username])
    // console.log("ifUser.rows.length: ", ifUser.rows.length)
    return ifUN
}

module.exports.addUser = async function (username, password, email) {
    try {
        const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        // console.log('hashedPassword:', hashedPassword)
        const newUser = await db.query('INSERT INTO users(user_name, password, email, true_password) VALUES ($1, $2, $3, $4) RETURNING *', [username, hashedPassword, email, password])
        // console.log("New User:", newUser)
        return newUser
    } catch (e) {
        return e
    }

}

module.exports.showUsersTable = async function() {
    // console.log ("before query")
    const showUsers = await db.query('SELECT * FROM users')
    return showUsers
}

module.exports.checkPass = async function (password, hashedPassword) {
    // const ifPassCorrect = bcrypt.compareSync(password, hashedPassword); // true
    // console.log("ifPassCorrect", ifPassCorrect)
    // const ifPassCorrect = await db.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, hashedPassword]);
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports.editUser = async function (id, user_name, email, password) {
    try {
        user = await this.getUserByID(id)
        if (user_name.length != 0 && (user_name != user.rows[0].user_name)) {
            await db.query(`UPDATE users SET user_name=$1 WHERE id = $2`, [user_name, id])
        }
        if (email.length != 0 && (email != user.rows[0].email)) {
            await db.query(`UPDATE users SET email=$1 WHERE id = $2`, [email, id])
        }
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
            if (hashedPassword != user.rows[0].password) {
                await db.query(`UPDATE users SET password = $1 WHERE id = $2`, [hashedPassword, id])
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.deleteUser = async function () {
    try {

    } catch (err) {
        console.log(err)
    }
}

module.exports.getToken = async function(token) {
    console.log('Token to check: ', token)
    const ifToken = await db.query('SELECT * FROM sessions WHERE token=$1', [token])
    // console.log("ifUser.rows.length: ", ifUser.rows.length)
    return ifToken
}

module.exports.lookForSameSID = async function(browserCookie) {
    console.log('Cookie from the browser to process: ', browserCookie, "\n")
    const cookiesFound = await db.query('SELECT * FROM sessions WHERE sid=$1', [browserCookie])
    // console.log("cookiesFound.rows.length: ", cookiesFound.rows.length)
    return cookiesFound
}