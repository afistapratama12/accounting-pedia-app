if(process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const { connect } = require('./config/mongodb')
const errorHandler = require('./middleware/errHandler')
const app = express()
const port = process.env.PORT || 3000 

const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))


// let database = null

// app.get('/', async (req, res) => {
//     const userCollection = database.collection('users')
//     const users = await userCollection.find().toArray()
//     console.log(users)
//     res.send('testing mongo db', users)
// })

// let database = null

app.use('/', router)
app.use(errorHandler)

connect().then(() => {
    console.log('connect to mongodb') 
    // database = db

    app.listen(port, () => {
        console.log('jalan di port', port)
    })
})

