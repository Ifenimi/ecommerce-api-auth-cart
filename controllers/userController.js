const User = require("../schemas/userSchema")
const bcrypt = require("bcryptjs")

// create user
const createUser = async (req, res) => {
    const { username, gmail, password } = req.body
    if (!username || !gmail || !password) {
        res.status(400).json({ message: "Please provide all fields" })
        return
    }
    try {
        const user = await User.findOne({ gmail })
        if (user) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        if (gmail === 'Barakat@gmail.com' || gmail === 'Emmanuel@gmail.com') {
            const newUser = new User({ ...req.body, password: hashedPassword, admin: true })
            await newUser.save()
            return res.status(201).json({ mess: 'Admin User created successfully' })
        }

        const newUser = new User({ ...req.body, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ mess: 'New User created successfully' })

    } catch (error) {
        res.status(500).json(error)
    }
}

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get a user
const getAUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get by query params
const getByqueryParams = async (req, res) => {
    const { name, gmail, year } = req.query
    const filter = {}

    if (name) filter.username = name
    if (gmail) filter.gmail = gmail
    if (year) filter["profile.year"] = year   // assuming you add year to profile if needed

    try {
        const users = await User.find(filter)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

// edit user
const editUser = async (req, res) => {
    const { id } = req.params
    const reqId = req.user._id
    if (id === reqId) {
        try {
            await User.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({ mess: 'User updated successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        return res.status(401).json({ message: "You are not authorized to edit this user" })
    }
}

// edit profile
const editProfile = async (req, res) => {
    const { id } = req.params
    const reqId = req.user._id
    const { country, Number, Street, Bio } = req.body
    if (id === reqId) {
        try {
            await User.findByIdAndUpdate(id, {
                $set: {
                    'profile.country': country,
                    'profile.Number': Number,
                    'profile.Street': Street,
                    'profile.Bio': Bio
                }
            }, { new: true })
            res.status(200).json({ mess: 'Profile updated successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        return res.status(401).json({ message: "You are not authorized to edit this profile" })
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
    const { _id, admin } = req.user
    if (id === _id || admin === true) {
        try {
            await User.findByIdAndDelete(id)
            res.status(200).json({ mess: 'User deleted successfully' })
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        return res.status(401).json({ message: "You are not authorized to delete this user" })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getAUser,
    getByqueryParams,
    editUser,
    deleteUser,
    editProfile
}
