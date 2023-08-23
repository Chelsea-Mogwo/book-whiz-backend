const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const bookRoutes = require('./routers/book')
const borrowedBookRoutes = require('./routers/borrowed_book')
const adminRoutes = require('./routers/admin')
const userRoutes = require('./routers/user')

const app = express()

app.use(express.json());
app.use(cors());
app.use(logger('dev'))


app.get("/", (req, res) => {
    res.json({
        title: "Books",
        description: "Find all of your library books."
    })
})

app.use('/books', bookRoutes)
app.use('/borrowed', borrowedBookRoutes)
app.use('/admin', adminRoutes)
app.use('/users', userRoutes)

module.exports = app
