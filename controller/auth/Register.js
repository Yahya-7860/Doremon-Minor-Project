const { userModel } = require("../../model");
const jwt = require('jsonwebtoken');


const handleUserRegister = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "username and password can't be empty." });
    }

    try {
        const addedUser = await userModel.create({ username: username, password: password });
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const payload = {
            userId: addedUser._id,
        }
        const token = jwt.sign(payload, JWT_SECRET_KEY)
        addedUser.token = token;
        await addedUser.save();
        res.status(200).json({ message: "User Registered", addedUser, token })

    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "user already exist" })
        }
        else {
            res.status(500).json({ error })
        }
    }
}

module.exports = handleUserRegister;