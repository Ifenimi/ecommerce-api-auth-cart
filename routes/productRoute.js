const express = require("express")
const { createProduct } = require("../controllers/productController")
const authMiddleware = require("../middlewares/authMiddleware")

const productRouter = express.Router()

productRouter
    .post('/product/create', authMiddleware, createProduct)

module.exports = productRouter
