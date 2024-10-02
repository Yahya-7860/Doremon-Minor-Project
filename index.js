require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const { registerRouter } = require('./routes');
const app = express();

const PORT = process.env.PORT;
const DB_STRING = process.env.DB_STRING;

const dbConnection = async () => {
    try {
        await mongoose.connect(DB_STRING)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("An error occured while connecting databse", error)
    }
}
dbConnection();
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Server started running on port ${PORT}`)
    }
})

app.use(express.json())
app.use('/user', registerRouter)