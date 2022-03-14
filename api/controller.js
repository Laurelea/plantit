// const db = require('./dbConnect').db
const bcrypt = require('bcrypt')
const dbKnex = require('./dbKnex')
const db = require("./dbConnect");

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
}


module.exports.getUser = async (email) => {
    // console.log('Email to check: ', email)
    return await db.query('SELECT * FROM users WHERE email=$1', [email])
    // console.log(ifUser, ifUser.rows.length)
    // return ifUser
}

// module.exports.getUserName = async function (username) {
//     console.log('Email to check: ', username)
//     const ifUNexists = await api.query('SELECT * FROM users WHERE user_name=$1', [username])
//     console.log(ifUNexists.rows.length)
//     return ifUNexists
// }consol

// module.exports.getUserByID = async function (id) {
//     console.log('ID to check: ', id)
//     const ifUser = await api.query('SELECT * FROM users WHERE id=$1', [id])
//     console.log("ifUser.rows.length: ", ifUser.rows.length)
//     return ifUser
// }

module.exports.getUserByUN = async (username) => {
    console.log('UN to check: ', username)
    return await db.query('SELECT * FROM users WHERE user_name=$1', [username])
    // console.log("ifUser.rows.length: ", ifUser.rows.length)
    // return ifUN
}

module.exports.addUser = async (username, password, email) => {
    try {
        const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        // console.log('hashedPassword:', hashedPassword)
        return await db.query('INSERT INTO users(user_name, password, email, true_password) VALUES ($1, $2, $3, $4) RETURNING *', [username, hashedPassword, email, password])
        // console.log("New User:", newUser)
    } catch (e) {
        return e
    }

}

module.exports.showUsersTable = async () => {
    // console.log ("before query")
    return await db.query('SELECT * FROM users')
    // return showUsers
}

module.exports.checkPass = async (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports.editUser = async (id, user_name, email, password) => {
    try {
        user = await this.getUserByID(id)
        if (user_name.length !== 0 && (user_name !== user.rows[0].user_name)) {
            await db.query(`UPDATE users SET user_name=$1 WHERE id = $2`, [user_name, id])
        }
        if (email.length !== 0 && (email !== user.rows[0].email)) {
            await db.query(`UPDATE users SET email=$1 WHERE id = $2`, [email, id])
        }
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
            if (hashedPassword !== user.rows[0].password) {
                await db.query(`UPDATE users SET password = $1 WHERE id = $2`, [hashedPassword, id])
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.deleteUser = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
}

module.exports.getToken = async (token) => {
    console.log('Token to check: ', token)
    return await db.query('SELECT * FROM sessions WHERE token=$1', [token])
    // console.log("ifUser.rows.length: ", ifUser.rows.length)
    // return ifToken
}

module.exports.lookForSameSID = async (browserCookie) => {
    // console.log('Controller. Cookie from the browser to process: ', browserCookie, "\n")
    return await db.query('SELECT * FROM sessions WHERE sid=$1', [browserCookie])
    // console.log("cookiesFound.rows.length: ", cookiesFound.rows.length)
    // return cookiesFound
}
module.exports.showDB = async () => {
    return await dbKnex
        .select([
            'sort.id',
            'categories.cat_name',
            'categories.cat_id',
            'product.product_name',
            'product.soil',
            'product.watering',
            'sort.name as name',
            'producer.producer_name',
            'users.user_name',
            'product.rootstock',
            'yeartypes.name as yeartype',
            'product.depth_min',
            'product.depth_max',
            'sort.height_min',
            'sort.height_max',
            'sort.days_to_seedlings_max',
            'sort.days_to_seedlings_min',
            'sort.planting_stop_day',
            'sort.planting_stop_month',
            'sort.planting_start_day',
            'sort.planting_start_month',
            'product.sun',
        ])
        .from('sort')
        .leftJoin('producer', 'sort.producer_id', 'producer.id')
        .leftJoin('product', 'sort.product_id', 'product.id')
        .leftJoin('users', 'sort.user_id', 'users.user_id')
        .leftJoin('categories', 'product.category', 'categories.cat_id')
        .leftJoin('yeartypes', 'product.yeartype', 'yeartypes.id')
        .orderBy('sort.id')
        .catch(err => {console.log('125 err', err)});
};

module.exports.getCats = async () => {
   return await dbKnex
        .select()
        .from('categories')
       .catch(err => {console.log('144 err', err)});
}

module.exports.getProducts = async () => {
    return await dbKnex
        .select()
        .from('product')
        .catch(err => {console.log('151 err', err)});
}

module.exports.getProducers = async () => {
    return await dbKnex
        .select()
        .from('producer')
        .catch(err => {console.log('158 err', err)});
}

module.exports.getYearTypes = async () => {
    return await dbKnex
        .select()
        .from('yeartypes')
        .catch(err => {console.log('165 err', err)});
}


module.exports.addPlant = async (data) => {
    try {
        let {category, plantSort, product, producer, yeartype, rootstock, watering, soil, user_id} = await data
        // console.log ("category:", category)
        // console.log ("UserID controller:", userID)
        //Search for product type:
        const ifProdExists = await db.query('SELECT * FROM product WHERE product_name = $1', [capitalizeFirstLetter(product)])
        // console.log("ifProdExists :", ifProdExists.rows)
        let productID;
        if (ifProdExists.rows.length === 0) {
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
        if (ifProducerExists.rows.length === 0) {
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
        if (ifSortExists.rows.length !== 0) {
            throw new Error("Такое растение уже есть")
            // console.log(Error)
        } else {
            // console.log("userID: ", userID)
            return await db.query('INSERT INTO sort(name, product_id, producer_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [capitalizeFirstLetter(plantSort), productID, producerID, user_id])
            // console.log("New Sort:", newPlant)
            // return newPlant
        }
        // return newPlant
    } catch (e) {
        console.log(e)
        return e
    }

}

module.exports.getNumberOfPlants = async (id) => {
    try {
        const plantFound = await db.query('SELECT * FROM sort WHERE user_id=$1', [id])
        console.log("getNumberOfPlants controller id, plantFound.rows.length: ", id, plantFound.rows.length)
        return plantFound.rows.length
    } catch (error) {
        console.log("controller getNumberOfPlants error: ", error)
        return error
    }
}

module.exports.delSession = async (sessID) => {
    console.log('177 controller sessID', sessID)
    try {
        return await db.query('DELETE from sessions WHERE sid=$1', [sessID])
    } catch (err) {
        console.log('180 controller delSession:', err)
    }
}

module.exports.addProducer = async (data) => {
    const { producer } = data;
    console.log('controller addProducer producer', producer)
    let producerID;
    let success = false;
    let message;
    await dbKnex
        .select()
        .from('producer')
        .where({producer_name: capitalizeFirstLetter(producer)})
        .then(async(result) => {
            console.log('246 check producer result', result)
            if (result.length === 0) {
                await dbKnex
                    .insert({producer_name: capitalizeFirstLetter(producer)})
                    .into('producer')
                    .returning('*')
                    .then(result => {
                        console.log('252 result', result)
                        if (result[0].id > 0) {
                            success = true;
                            message = 'successfully added';
                            // return { success, message: }
                        }
                    })
                    .catch(err => {console.log('insert err', err)});
            } else {
                console.log("Producer exists :", result[0].id)
                producerID = result[0].id
                message = 'producer exists';
                // return { success, message:  }
            }
        })
        .catch(err => {console.log('check err', err)});
    return { success, message }
}
