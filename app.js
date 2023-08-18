const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.json({
        title: "Books",
        description: "Find all of your library books."
    })
})

module.exports = app