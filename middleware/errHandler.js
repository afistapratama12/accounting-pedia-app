function errorHandler (error, req, res, next) {
    // if(error.errors) {
    //     let errors = err.errors.map (e => {
    //         return e.message
    //     })
    // }

    console.log(error)

    switch (error.name) {
        case 'JsonWebTokenError':
            res.status(401).json({ messages : 'please login first'})

        case 'not found':
            res.status(404).json({ messages : 'Error not found'})
            break
        case 'error insert data':
            res.status(400).json({ messages : 'error insert format data'})
            break
        case 'error update':
            res.status(400).json({ messages : 'error update data'})
            break
        case 'not register':
            res.status(400).json({ messages : 'your username/ email and password not found'})
            break
        case 'login first':
            res.status(403).json({ messages : 'please login first'})
            break
        default:
            res.status(500).json({ messages : 'Error in internal server'})
            break    
    }
}

module.exports = errorHandler