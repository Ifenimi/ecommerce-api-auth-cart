const express = require("express")
const { loginUser, logoutUser } = require("../controllers/authController")

const authRouter = express.Router()

authRouter
    .post('/login', loginUser)
    .post('/logout', logoutUser)

module.exports = authRouter
