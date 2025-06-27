const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./dbconnect/mongodb')
const userRoutes = require('./routes/userRoute')
const productRoutes = require('./routes/productRoute')
const authRoutes = require('./routes/authRoute')
const cartRoutes = require('./routes/cartRoute')

const app = express()
app.use(express.json())

connectDB()

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
