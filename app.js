const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const bookRoutes = require('./routers/book')

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


module.exports = app
