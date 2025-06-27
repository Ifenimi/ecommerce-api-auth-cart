const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [
        {
            productId: String,
            quantity: Number
        }
    ]
}, { timestamps: true })

const Cart = mongoose.model("cart", cartSchema)

module.exports = Cart
