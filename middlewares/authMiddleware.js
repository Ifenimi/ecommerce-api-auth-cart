const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Token is invalid" })
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({ message: "You are not authenticated" })
    }
}

module.exports = authMiddleware
