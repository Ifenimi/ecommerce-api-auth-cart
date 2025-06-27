const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schemas/userSchema");

const loginUser = async (req, res) => {
    const { gmail, password } = req.body;
    if (!gmail || !password) {
        return res.status(400).json({ message: "Please provide gmail and password" });
    }
    try {
        const user = await User.findOne({ gmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, admin: user.admin },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set token in cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }
        );

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json(error);
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { loginUser, logoutUser };
