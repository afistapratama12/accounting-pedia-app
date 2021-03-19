// require('dotenv').config()

const { MongoClient } = require('mongodb')

// variabel database bisa diakses di app.js

let database = null

// || 'mongodb://localhost:27017'

async function connect() {
    try {
        const url = "mongodb://localhost:27017" 

        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology : true })

        await client.connect()

        const dbase = client.db('accpedia-database')

        database = dbase

        return dbase

    } catch (err) {
        console.log(err)
    }    
}

function getDatabase() {
    return database
}

module.exports = {
    connect,
    getDatabase,
    database
}
