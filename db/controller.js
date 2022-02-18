const db = require('./dbConnect')
const bcrypt = require('bcrypt')

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}


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
    // console.log('Controller. Cookie from the browser to process: ', browserCookie, "\n")
    const cookiesFound = await db.query('SELECT * FROM sessions WHERE sid=$1', [browserCookie])
    // console.log("cookiesFound.rows.length: ", cookiesFound.rows.length)
    return cookiesFound
}

module.exports.showDB = async function() {
    // try {
        const plantDB = await db.query('SELECT sort.id, product.category, product.product_name, sort.name, producer.producer_name, users.user_name FROM sort ' +
            'JOIN producer ON sort.producer_id=producer.id JOIN product ON sort.product_id=product.id JOIN users ON sort.user_id=users.user_id ORDER BY sort.id')
        // console.log("Controller plantDB: ", plantDB)
        return plantDB
    // }
    // catch (err) {
    //     console.log("showDB error:", err)
    // }

}

module.exports.addPlant = async function (data) {
    try {
        let {category, plantSort, product, producer, yeartype, rootstock, watering, soil, user_id} = await data
        // console.log ("category:", category)
        // console.log ("UserID controller:", userID)
        //Search for product type:
        const ifProdExists = await db.query('SELECT * FROM product WHERE product_name = $1', [capitalizeFirstLetter(product)])
        // console.log("ifProdExists :", ifProdExists.rows)
        let productID;
        if (ifProdExists.rows.length == 0) {
            const addProduct = await db.query('INSERT INTO product(product_name, yeartype, rootstock, soil, watering, category) ' +
                'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [capitalizeFirstLetter(product), yeartype, rootstock, soil, watering, category])
            productID =  addProduct.rows[0].id
            // console.log("addProduct :", addProduct.rows)
        } else {
            console.log("Product exists :", ifProdExists.rows[0].id)
            productID =  ifProdExists.rows[0].id
        }
        const ifProducerExists = await db.query('SELECT * FROM producer WHERE producer_name = $1', [capitalizeFirstLetter(producer)])
        // console.log("ifProducerExists :", ifProducerExists.rows)
        let producerID;
        if (ifProducerExists.rows.length == 0) {
            const addProducer = await db.query('INSERT INTO producer(producer_name) VALUES ($1) RETURNING *', [capitalizeFirstLetter(producer)])
            // console.log("addProducer :", addProducer.rows)
            producerID =  addProducer.rows[0].id
        } else {
            console.log("Producer exists :", producerID =  ifProducerExists.rows[0].id)
            producerID =  ifProducerExists.rows[0].id
        }
        const ifSortExists = await db.query('SELECT * FROM sort WHERE name = $1 AND product_id = $2 AND producer_id = $3',
            [capitalizeFirstLetter(plantSort), productID, producerID])
        // console.log("ifSortExists :", ifSortExists)
        if (ifSortExists.rows.length != 0) {
            throw new Error("Такое растение уже есть")
            // console.log(Error)
        } else {
            // console.log("userID: ", userID)
            const newPlant = await db.query('INSERT INTO sort(name, product_id, producer_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [capitalizeFirstLetter(plantSort), productID, producerID, user_id])
            // console.log("New Sort:", newPlant)
            return newPlant
        }
        // return newPlant
    } catch (e) {
        console.log(e)
        return e
    }

}

module.exports.getNumberOfPlants = async function (id) {
    try {
        const plantFound = await db.query('SELECT * FROM sort WHERE user_id=$1', [id])
        console.log("getNumberOfPlants controller id, plantFound.rows.length: ", id, plantFound.rows.length)
        return plantFound.rows.length
    } catch (error) {
        console.log("controller getNumberOfPlants error: ", error)
        return error
    }
}

// module.exports.vegs = async () => {
//     try {
//         const vegs = await db.query('SELECT sort.id, product.product_name, sort.name, producer.producer_name, users.user_name FROM sort ' +
//             'JOIN producer ON sort.producer_id=producer.id JOIN product ON sort.product_id=product.id JOIN users ON sort.user_id=users.user_id ' +
//             'WHERE product.category=$1', ["Vegs"]);
//         return vegs
//     }
//     catch (err) {
//         console.log("Vegs error:", err)
//     }
// }
module.exports.fruit = async () => {
    try {
        const fruit = await db.query('SELECT sort.id, product.product_name, sort.name, producer.producer_name, users.user_name FROM sort ' +
            'JOIN producer ON sort.producer_id=producer.id JOIN product ON sort.product_id=product.id JOIN users ON sort.user_id=users.user_id ' +
            'WHERE product.category=$1', ["Fruit"]);
        return fruit
    }
    catch (err) {
        console.log("Акгше error:", err)
    }
}
module.exports.herbs = async () => {
    try {
        const herbs = await db.query('SELECT sort.id, product.product_name, sort.name, producer.producer_name, users.user_name FROM sort ' +
            'JOIN producer ON sort.producer_id=producer.id JOIN product ON sort.product_id=product.id JOIN users ON sort.user_id=users.user_id ' +
            'WHERE product.category=$1', ["Herbs"]);
        return herbs
    }
    catch (err) {
        console.log("Herbs error:", err)
    }
}
module.exports.decs = async () => {
    try {
        const decs = await db.query('SELECT sort.id, product.product_name, sort.name, producer.producer_name, users.user_name FROM sort ' +
            'JOIN producer ON sort.producer_id=producer.id JOIN product ON sort.product_id=product.id JOIN users ON sort.user_id=users.user_id ' +
            'WHERE product.category=$1', ["Decs"]);
        return decs
    }
    catch (err) {
        console.log("Decs error:", err)
    }
}
