const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const activityRouter = require('./routes/activity-router')
const streamRouter = require('./routes/stream-router')
const userRouter = require('./routes/user-router')

const app = express()
const apiPort = process.env.PORT || 3000

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Api works')
})

app.use('/api', activityRouter)
app.use('/api', streamRouter)
app.use('/api', userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
