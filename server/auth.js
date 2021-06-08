///Checkit!
const {Router} = require("express")
const router = Router()
const controller = require('../db/controller')

//Фейковая авторизация
router.get("/api/login", (req, res) => {
    res.json({ title: "Authorize", isLogin: true});
});
//logout делаем в Реакте его сессиями, сервер тут не нужен?
//Выход
router.get("/api/logout", (req, res) => {
    //Тут нужно стирать сессию из БД
    res.json({ isLogin: false});
});
//Авторизация
router.post("/api/auth", async (req, res) => {
        const {email, password} = req.body
        // console.log("req.body: ", req.body)
        const ifUser = await controller.getUser(email)
        console.log("User found:", ifUser.rows.length)
        if (ifUser.rows.length == 0) {
            const err = new Error("No such user")
            res.json({isLogin: false, message: err.message.toString()})
        } else {
            // console.log("User found!")
            const passCheck = await controller.checkPass(email, password)
            console.log("passCheck: ", passCheck)
            if (!passCheck) {
                const err = new Error (`Password incorrect`)
                res.json({isLogin: false, message: err.message.toString()})
            } else {
                res.json({isLogin: true})
                // req.session.isAuthenticated = true
                // req.session.user = ifUser.rows[0]
                res.json({user: ifUser.rows[0]})
                // req.session.save(err => {
                //     if (err) {
                //         throw err
                //     }
                //     res.redirect("/")
                // })
            }        }
    }
)
//Регистрация
router.post("/api/register", async (req, res) => {
    try {
        // console.log("post.req.body: ", req.body)
        const {username, password, email} = await req.body
        console.log("username, email:", username, email)
        const ifUser = await controller.getUser(email)
        if (ifUser.rowCount != 0) {
            const err = new Error('User email already exists')
            res.json ({regSuccess: false, message: err.message.toString()})
        } else {
            const newUser = await controller.addUser(username, password, email)
            // console.log("New user: ", newUser.rowCount)
            res.json ({regSuccess: true, newUser: newUser, message: "User added to DB"})
            // res.redirect("/components")
        }
    } catch (e){
        console.log (e)
    }
})
module.exports = router