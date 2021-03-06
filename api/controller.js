const bcrypt = require('bcrypt')
const dbKnex = require('./dbKnex')
const db = require("./dbConnect");

const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.substring(1);
}


module.exports.getUser = async email => {
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

module.exports.getUserByUN = async username => {
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

module.exports.getToken = async token => {
    console.log('Token to check: ', token)
    return await db.query('SELECT * FROM sessions WHERE token=$1', [token])
    // console.log("ifUser.rows.length: ", ifUser.rows.length)
    // return ifToken
}

module.exports.lookForSameSID = async browserCookie => {
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
            'product.id as product_id',
            'product.soil',
            'product.watering',
            'sort.name as name',
            'producer.producer_name',
            'producer.id as producer_id',
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


module.exports.getNumberOfPlants = async id => {
    try {
        const plantFound = await db.query('SELECT * FROM sort WHERE user_id=$1', [id])
        console.log("getNumberOfPlants controller id, plantFound.rows.length: ", id, plantFound.rows.length)
        return plantFound.rows.length
    } catch (error) {
        console.log("controller getNumberOfPlants error: ", error)
        return error
    }
}

module.exports.delSession = async sessID => {
    console.log('177 controller sessID', sessID)
    try {
        return await db.query('DELETE from sessions WHERE sid=$1', [sessID])
    } catch (err) {
        console.log('180 controller delSession:', err)
    }
}

module.exports.addProducer = async data => {
    const { producer } = data;
    console.log('controller addProducer producer', producer)
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
                message = 'producer exists';
                // return { success, message:  }
            }
        })
        .catch(err => {console.log('check err', err)});
    return { success, message }
}

module.exports.addCat = async data => {
    const { category, cat_pic, cat_desc } = data;
    console.log('controller addCat cat', category)
    let success = false;
    let message;
    await dbKnex
        .select()
        .from('categories')
        .where({cat_name: capitalizeFirstLetter(category)})
        .then(async result => {
            // console.log('283 check category result', result)
            if (result.length === 0) {
                await dbKnex
                    .insert({cat_name: capitalizeFirstLetter(category), cat_desc, cat_pic})
                    .into('categories')
                    .returning('*')
                    .then(result => {
                        console.log('290 result', result, result[0].cat_id)
                        if (result[0].cat_id > 0) {
                            console.log('292 ', result[0].cat_id)
                            success = true;
                            message = 'successfully added';
                        }
                    })
                    .catch(err => {console.log('insert err', err)});
            } else {
                console.log("Cat exists :", result[0].id)
                message = 'cat exists';
            }
        })
        .catch(err => {console.log('check err', err)});
    return { success, message }
}

module.exports.addProduct = async data => {
    const { category, product, yeartype, rootstock, depth_min, depth_max, watering, soil, sun } = data;
    console.log('controller addProduct product', product)
    let success = false;
    let message;
    await dbKnex
        .select()
        .from('product')
        .where({product_name: capitalizeFirstLetter(product)})
        .then(async(result) => {
            // console.log('283 check category result', result)
            if (result.length === 0) {
                await dbKnex
                    .insert({product_name: capitalizeFirstLetter(product), category, yeartype, rootstock, depth_min, depth_max, watering, soil, sun})
                    .into('product')
                    .returning('*')
                    .then(result => {
                        console.log('325 result', result, result[0].id)
                        if (result[0].id > 0) {
                            console.log('327 ', result[0].id)
                            success = true;
                            message = 'successfully added';
                        }
                    })
                    .catch(err => {console.log('insert err', err)});
            } else {
                console.log("Product exists :", result[0].id)
                message = 'product exists';
            }
        })
        .catch(err => {console.log('check err', err)});
    return { success, message }
}

module.exports.addPlant = async data => {
    const { producer_id, product_id, name } = data
    let success = false;
    let message;
    await dbKnex
        .select()
        .from('sort')
        .where({ name, product_id, producer_id })
        .then(async result => {
            if (result.length === 0) {
                await dbKnex
                    .insert({
                        ...data
                    })
                    .into('sort')
                    .returning('*')
                    .then((result) => {
                        console.log('333 result', result)
                        console.log('334 result', result[0].id)
                        if (result[0].id > 0) {
                            console.log('336 ', result[0].id)
                            success = true;
                            message = 'successfully added';
                        }
                    })
                    .catch(err => {
                        console.log('insert err', err)
                    });
            } else {
                console.log("Plant exists :", result[0].id)
                message = 'Plant exists';
            }
        })
        .catch(err => {
            console.log('check err', err)
        });
    return { success, message }
}

module.exports.delPlant = async data => {
    console.log('329 data:', data)
    const { id } = data;
    console.log('331 id:', id)
    let success = false;
    let message;
    await dbKnex
        .delete()
        .from('sort')
        .where({ id })
        .then(async result => {
            console.log('337 controller result', result)
            message = 'plant deleted ok';
            success = true;
        })
        .catch(err => {
            console.log('check err', err)
            message = JSON.stringify(err);
        });
    return { success, message }
}
