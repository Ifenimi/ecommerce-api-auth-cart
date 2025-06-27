const express = require("express")
const {
    createUser,
    getAllUsers,
    getAUser,
    editUser,
    deleteUser,
    getByqueryParams,
    editProfile
} = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

const userRouter = express.Router()

userRouter
    // POST
    .post('/user/create', createUser)

    // GET
    .get('/users', authMiddleware, getAllUsers)
    .get('/user/:id', getAUser)
    .get('/usersByquery', getByqueryParams)

    // PUT
    .put('/user/update/:id', authMiddleware, editUser)
    .put('/profile/update/:id', authMiddleware, editProfile)

    // DELETE
    .delete('/user/delete/:id', authMiddleware, deleteUser)

module.exports = userRouter
