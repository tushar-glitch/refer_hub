const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const authroute = require('./routes/user_routes')
const referralroute = require('./routes/referral_routes')
app.use(cors())
app.use(express.json())

const connection_url = 'mongodb://jumbo:tcxCKjlxOsj1vdNe@ac-vi9pq53-shard-00-00.ktnuczj.mongodb.net:27017,ac-vi9pq53-shard-00-01.ktnuczj.mongodb.net:27017,ac-vi9pq53-shard-00-02.ktnuczj.mongodb.net:27017/?ssl=true&replicaSet=atlas-8zajnt-shard-0&authSource=admin&retryWrites=true&w=majority'
// app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
app.use('/api/auth',authroute)
app.use('/api/referral',referralroute)

app.listen(3000)