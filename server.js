const express = require('express')
const app = express()
const mongodb = require('mongoose')
const {db} = require('./config/db')
const cors = require('cors')
const helmet = require('helmet')

app.use(cors())

app.use(helmet())

app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({extended: false, limit: '10mb'}))

mongodb.connect(db).then(() =>{
    console.log("Mongodb is connected");
}).catch((err) => console.log("Application Error", err))

const PORT = 5001

app.use('/user', require('./routes/User'));

app.use("/problem" , require("./routes/Problem"));

app.use("/message", require("./routes/Message"));

app.listen(PORT, console.log('Server is running on port ' + PORT))