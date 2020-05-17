require('dotenv').config()
const mongoose = require('mongoose')

const options = { useUnifiedTopology: true, useNewUrlParser: true }
const url = process.env.MONGO_CONNECTION_URL

mongoose
    .connect(url, options)
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
