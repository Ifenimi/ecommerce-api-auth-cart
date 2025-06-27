const Product = require("../schemas/productSchema")

const createProduct = async (req, res) => {
    const { name, price, description } = req.body
    if (!name || !price || !description) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).json({ message: "Product created successfully", product: newProduct })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createProduct }
