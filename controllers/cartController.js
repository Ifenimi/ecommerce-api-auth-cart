const Cart = require("../schemas/cartSchema")

const addCart = async (req, res) => {
    const { items } = req.body
    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ message: "Please provide an array of items" })
    }
    try {
        const newCart = new Cart({
            userId: req.user._id,
            items
        })
        await newCart.save()
        res.status(201).json({ message: "Cart created successfully", cart: newCart })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { addCart }
