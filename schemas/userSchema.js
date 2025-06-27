const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    profile: {
        country: { type: String, required: true },
        Number: { type: Number, required: true },
        Street: { type: String, required: true },
        Bio: { type: String, required: true }
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema)
module.exports = User
