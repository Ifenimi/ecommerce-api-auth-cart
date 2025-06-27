const express = require("express")
const { addCart } = require("../controllers/cartController")
const authMiddleware = require("../middlewares/authMiddleware")

const cartRouter = express.Router()

cartRouter.post('/cart/create', authMiddleware, addCart)

module.exports = cartRouter
