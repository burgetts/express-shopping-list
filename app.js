const express = require('express')
const listRoutes = require('./listRoutes')
const ExpressError = require('./error')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/items', listRoutes)

/* Error Handlers */
app.use((req,res,next) => {
    const e = new ExpressError("Page not found", 404) // could also use: throw new ExpressError("Page not found", 404)
    return next(e)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    
    return res.json({
        error: err,
        message: err.message
    })
})

module.exports = app;