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
    console.log('Controller. Cookie from the browser to process: ', browserCookie, "\n")
    const cookiesFound = await db.query('SELECT * FROM sessions WHERE sid=$1', [browserCookie])
    // console.log("cookiesFound.rows.length: ", cookiesFound.rows.length)
    return cookiesFound
}

module.exports.showDB = async function() {
    const plantDB = await db.query('SELECT * FROM producer')
    // console.log(plantDB)
    return plantDB
}

module.exports.addPlant = async function (data) {
    try {
        let {category, sort, type, producer, yeartype, rootstock, watering, soil} = data
        //Search for product type:
        const ifProdExists = await db.query('SELECT * FROM product WHERE name = $1', [type])
        console.log("ifProdExists :", ifProdExists.rows)
        if (ifProdExists.rows.length == 0) {
            const addProduct = await db.query('INSERT INTO product(name, yeartype, rootstock, soil, watering, category) ' +
                'VALUES ($1) RETURNING *', [type, yeartype, rootstock, soil, watering, category])
            console.log("addProduct :", addProduct.rows)
        } else {
            console.log("Product exists")
        }
        const ifProducerExists = await db.query('SELECT * FROM producer WHERE name = $1', [producer])
        if (ifProducerExists.rows.length == 0) {
            const addProducer = await db.query('INSERT INTO producer(name) VALUES ($1) RETURNING *', [producer])
            console.log("addProducer :", addProducer.rows)

        } else {
            console.log("Producer exists")
        }
        const ifSortExists = await db.query('SELECT * FROM sort WHERE name = $1 AND product = $2 AND producer = $3', [sort, type, producer])
        console.log("ifSortExists :", ifSortExists)
        if (ifSortExists.rows.length != 0) {
            throw new Error("Такое растение уже есть")
            // console.log(Error)
        } else {
            const newPlant = await db.query('INSERT INTO sort(name) VALUES ($1) RETURNING *',
                [sort])
            console.log("New Sort:", newPlant)
        }
        // return newPlant
        return newPlant
    } catch (e) {
        console.log(e)
        return e
    }

}